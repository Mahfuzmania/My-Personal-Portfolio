import { NextResponse } from "next/server";
import { z } from "zod";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { getServerSession } from "@/lib/auth-session";
import { changeCurrentAdminPassword } from "@/lib/admin-user-service";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(256),
    newPassword: z.string().min(8).max(256),
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: "New password must be different from current password.",
    path: ["newPassword"],
  });

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csrfValid = await hasValidAdminCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  try {
    const payload = changePasswordSchema.parse(await request.json());
    await changeCurrentAdminPassword(session.sub, payload.currentPassword, payload.newPassword);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to change password.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
