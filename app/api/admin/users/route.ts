import { NextResponse } from "next/server";
import { z } from "zod";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { getServerSession } from "@/lib/auth-session";
import { adminRoles, hasAdminPermission } from "@/lib/admin-permissions";
import { createAdminUser, listAdminUsers } from "@/lib/admin-user-service";

const createUserPayloadSchema = z.object({
  username: z.string().min(3).max(128),
  password: z.string().min(8).max(256),
  role: z.enum(adminRoles),
});

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "users.manage")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await listAdminUsers();
  return NextResponse.json({ users, roleOptions: adminRoles, currentUserId: session.sub });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "users.manage")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const csrfValid = await hasValidAdminCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  try {
    const payload = createUserPayloadSchema.parse(await request.json());
    const user = await createAdminUser(payload);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to create user.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
