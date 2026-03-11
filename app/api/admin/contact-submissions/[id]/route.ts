import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { getContactSubmissionById, updateContactSubmissionStatus } from "@/lib/contact-submission-service";
import { updateContactSubmissionStatusSchema } from "@/lib/contact-submission-schema";
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

  const { id } = (await context.params) as { id: string };
  const submission = await getContactSubmissionById(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  return NextResponse.json({ submission });
}

export async function PATCH(request: NextRequest, context: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "inbox.write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const csrfValid = await hasValidAdminCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  const { id } = (await context.params) as { id: string };
  try {
    const payload = updateContactSubmissionStatusSchema.parse(await request.json());
    const submission = await updateContactSubmissionStatus(id, payload.status);
    if (!submission) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }
    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to update submission.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
