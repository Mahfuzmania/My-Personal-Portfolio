import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { contactSubmissionSchema, createContactSubmissionSchema } from "@/lib/contact-submission-schema";
import { removeUploadedFile, type SavedAttachment } from "@/lib/contact-storage";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  company?: string | null;
  message: string;
  status: "new" | "reviewed" | "replied" | "archived";
  ipHash: string;
  userAgentHash: string;
  attachments: SavedAttachment[];
  createdAt: string;
  updatedAt: string;
};

type PersistedContactSubmission = Partial<ContactSubmission> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  attachments?: SavedAttachment[];
  status?: ContactSubmission["status"];
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "contact-submissions.json");

type ContactStore = { submissions: PersistedContactSubmission[] };

async function ensureFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ submissions: [] }, null, 2), "utf-8");
  }
}

function normalizeSubmission(raw: PersistedContactSubmission): ContactSubmission {
  return contactSubmissionSchema.parse({
    id: raw.id ?? randomUUID(),
    name: raw.name ?? "",
    email: raw.email ?? "",
    subject: raw.subject ?? null,
    company: raw.company ?? null,
    message: raw.message ?? "",
    status: raw.status ?? "new",
    ipHash: raw.ipHash ?? "",
    userAgentHash: raw.userAgentHash ?? "",
    attachments: raw.attachments ?? [],
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  });
}

async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(dataFile, "utf-8");
  const parsed = JSON.parse(raw) as ContactStore;
  const items = Array.isArray(parsed?.submissions) ? parsed.submissions : [];
  return items.map(normalizeSubmission);
}

async function writeAll(submissions: ContactSubmission[]) {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify({ submissions }, null, 2), "utf-8");
}

function findMatches(submission: ContactSubmission, q?: string) {
  if (!q) {
    return true;
  }
  const lowered = q.toLowerCase();
  return (
    submission.name.toLowerCase().includes(lowered) ||
    submission.email.toLowerCase().includes(lowered) ||
    (submission.subject ?? "").toLowerCase().includes(lowered) ||
    (submission.message ?? "").toLowerCase().includes(lowered)
  );
}

export async function listContactSubmissions(options: { status?: ContactSubmission["status"]; q?: string } = {}) {
  const all = await readAll();
  const filtered = all.filter((item) => (options.status ? item.status === options.status : true) && findMatches(item, options.q));
  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getContactSubmissionById(id: string) {
  const all = await readAll();
  return all.find((item) => item.id === id) ?? null;
}

export async function createContactSubmission(input: {
  name: string;
  email: string;
  subject?: string;
  company?: string;
  message: string;
  ipHash: string;
  userAgentHash: string;
  attachments?: SavedAttachment[];
}) {
  const payload = createContactSubmissionSchema.parse(input);
  const now = new Date().toISOString();
  const next: ContactSubmission = {
    id: randomUUID(),
    name: payload.name,
    email: payload.email,
    subject: payload.subject ?? null,
    company: payload.company ?? null,
    message: payload.message,
    status: "new",
    ipHash: payload.ipHash,
    userAgentHash: payload.userAgentHash,
    attachments: input.attachments ?? [],
    createdAt: now,
    updatedAt: now,
  };
  const validated = contactSubmissionSchema.parse(next);
  const existing = await readAll();
  await writeAll([validated, ...existing]);
  return validated;
}

export async function updateContactSubmissionStatus(id: string, status: ContactSubmission["status"]) {
  const existing = await readAll();
  const index = existing.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  existing[index] = {
    ...existing[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  const next = normalizeSubmission(existing[index]);
  existing[index] = next;
  await writeAll(existing);
  return next;
}

export async function deleteContactSubmission(id: string) {
  const existing = await readAll();
  const target = existing.find((item) => item.id === id) ?? null;
  if (!target) {
    return false;
  }

  const next = existing.filter((item) => item.id !== id);
  await writeAll(next);

  for (const attachment of target.attachments) {
    await removeUploadedFile(attachment.storageName);
  }
  return true;
}
