import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { getServerSession } from "@/lib/auth-session";
import { getContactSubmissionById } from "@/lib/contact-submission-service";
import { getAttachmentPath } from "@/lib/contact-storage";
import { hasAdminPermission } from "@/lib/admin-permissions";

type Params = {
  params: Promise<unknown>;
};

export async function GET(_: NextRequest, context: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "inbox.read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, attachmentId } = (await context.params) as { id: string; attachmentId: string };
  const submission = await getContactSubmissionById(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  const attachment = submission.attachments.find((item) => item.id === attachmentId);
  if (!attachment) {
    return NextResponse.json({ error: "Attachment not found." }, { status: 404 });
  }

  try {
    const payload = await fs.readFile(getAttachmentPath(attachment.storageName));
    const safeFilename = attachment.originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    return new NextResponse(payload, {
      headers: {
        "Content-Type": attachment.mimeType,
        "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(attachment.originalName)}`,
        "Cache-Control": "private, max-age=0, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Attachment unavailable." }, { status: 404 });
  }
}
