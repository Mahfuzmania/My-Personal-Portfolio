import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { listContactSubmissions, updateContactSubmissionStatus } from "@/lib/contact-submission-service";
import { contactSubmissionStatusSchema } from "@/lib/contact-submission-schema";
import { hasAdminPermission } from "@/lib/admin-permissions";

type SearchParams = { status?: "new" | "reviewed" | "replied" | "archived"; q?: string };

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "inbox.read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as SearchParams["status"] | null;
  const q = searchParams.get("q") ?? undefined;

  if (status) {
    const parsed = contactSubmissionStatusSchema.safeParse(status);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
    }
  }

  const submissions = await listContactSubmissions({ status: status ?? undefined, q });
  return NextResponse.json({ submissions });
}

export async function PATCH(request: Request) {
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

  try {
    const body = await request.json();
    const { id, status } = body as { id: string; status?: SearchParams["status"] };
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
    }
    const submission = await updateContactSubmissionStatus(id, status);
    if (!submission) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }
    return NextResponse.json({ submission });
  } catch {
    return NextResponse.json({ error: "Unable to update submission." }, { status: 400 });
  }
}
