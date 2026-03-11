import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { getServerSession } from "@/lib/auth-session";
import { adminRoles, hasAdminPermission } from "@/lib/admin-permissions";
import { updateAdminUser } from "@/lib/admin-user-service";

type Params = {
  params: Promise<unknown>;
};

const updateUserPayloadSchema = z.object({
  role: z.enum(adminRoles).optional(),
  active: z.boolean().optional(),
  newPassword: z.string().min(8).max(256).optional(),
});

export async function PATCH(request: NextRequest, context: Params) {
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

  const { id } = (await context.params) as { id: string };
  try {
    const payload = updateUserPayloadSchema.parse(await request.json());

    if (id === session.sub && (payload.role || payload.active === false)) {
      return NextResponse.json(
        { error: "You cannot deactivate your own account or change your own role here." },
        { status: 400 },
      );
    }

    const user = await updateAdminUser(id, payload);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to update user.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
