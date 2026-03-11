import { NextResponse } from "next/server";
import { assertRateLimit, getRequestKey } from "@/lib/request-rate-limit";
import { hashInput, sanitizeMultilineInput, sanitizeTextInput } from "@/lib/security";
import { createContactSubmission } from "@/lib/contact-submission-service";
import { removeUploadedFile, saveUploadedFile } from "@/lib/contact-storage";

const MAX_UPLOADS = 3;
const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE_BYTES = 12 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"]);

const SIGNATURES: Array<{ mime: string; signature: number[]; offset: number; minLength: number }> = [
  { mime: "image/png", signature: [0x89, 0x50, 0x4e, 0x47], offset: 0, minLength: 4 },
  { mime: "image/jpeg", signature: [0xff, 0xd8, 0xff], offset: 0, minLength: 3 },
  { mime: "image/jpg", signature: [0xff, 0xd8, 0xff], offset: 0, minLength: 3 },
  { mime: "image/gif", signature: [0x47, 0x49, 0x46, 0x38], offset: 0, minLength: 4 },
  { mime: "application/pdf", signature: [0x25, 0x50, 0x44, 0x46], offset: 0, minLength: 4 },
  { mime: "image/webp", signature: [0x52, 0x49, 0x46, 0x46, 0x57, 0x45, 0x42, 0x50], offset: 0, minLength: 12 },
];

function getAttachmentBytes(file: File) {
  return file.arrayBuffer().then((payload) => new Uint8Array(payload.slice(0, 16)));
}

function extensionFromName(name: string) {
  const value = name.split(".").pop()?.trim().toLowerCase() ?? "";
  return value ? `.${value}` : "";
}

function doesSignatureMatch(file: File, bytes: Uint8Array) {
  const expected = SIGNATURES.find((entry) => entry.mime === file.type);
  if (!expected) {
    return false;
  }
  if (bytes.length < expected.minLength) {
    return false;
  }
  if (file.type === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }
  return expected.signature.every((item, index) => bytes[index + expected.offset] === item);
}

async function isFileAllowed(file: File) {
  if (!ALLOWED_MIME.has(file.type)) {
    return false;
  }

  const extension = extensionFromName(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return false;
  }

  if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) {
    return false;
  }

  const bytes = await getAttachmentBytes(file);
  return doesSignatureMatch(file, bytes);
}

export async function POST(request: Request) {
  const key = getRequestKey(request);
  try {
    assertRateLimit(key, { maxRequests: 5, windowMs: 5 * 60 * 1000, blockMs: 10 * 60 * 1000 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Rate limit exceeded." },
      { status: 429 },
    );
  }

  const form = await request.formData();

  const honeypot = sanitizeTextInput(form.get("website")?.toString() ?? "");
  if (honeypot.length > 0) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const name = sanitizeTextInput(form.get("name")?.toString() ?? "", 120);
  const email = sanitizeTextInput(form.get("email")?.toString() ?? "", 255);
  const subject = sanitizeTextInput(form.get("subject")?.toString() ?? "", 160);
  const company = sanitizeTextInput(form.get("company")?.toString() ?? "", 140);
  const message = sanitizeMultilineInput(form.get("message")?.toString() ?? "", 5000);
  const attachmentsRaw = form.getAll("attachments");

  if (typeof name !== "string" || name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (typeof message !== "string" || message.length < 30) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }

  const files = attachmentsRaw.filter((item): item is File => item instanceof File).filter((item) => item.size > 0);
  if (files.length > MAX_UPLOADS) {
    return NextResponse.json({ error: `Maximum ${MAX_UPLOADS} attachments allowed.` }, { status: 400 });
  }

  const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalFileSize > MAX_TOTAL_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Total attachments size is too large." }, { status: 400 });
  }

  for (const file of files) {
    if (!(await isFileAllowed(file))) {
      return NextResponse.json({ error: "Unsupported attachment type or size." }, { status: 400 });
    }
  }

  const savedAttachments = [];
  for (const file of files) {
    try {
      const saved = await saveUploadedFile(file);
      savedAttachments.push(saved);
    } catch {
      for (const attachment of savedAttachments) {
        try {
          await removeUploadedFile(attachment.storageName);
        } catch {
          // cleanup best effort
        }
      }
      return NextResponse.json({ error: "Failed to save attachments." }, { status: 500 });
    }
  }

  const userAgent = request.headers.get("user-agent") ?? "unknown";
  try {
    const submission = await createContactSubmission({
      name,
      email,
      subject: subject || undefined,
      company: company || undefined,
      message,
      ipHash: hashInput(key),
      userAgentHash: hashInput(userAgent),
      attachments: savedAttachments,
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (error) {
    for (const attachment of savedAttachments) {
      try {
        await removeUploadedFile(attachment.storageName);
      } catch {
        // Best effort cleanup; do not mask primary failure details.
      }
    }

    return NextResponse.json(
      {
        error: "Failed to save submission.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }

  
}
