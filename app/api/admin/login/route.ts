import { NextResponse } from "next/server";
import { z } from "zod";
import { assertLoginAllowed, registerLoginFailure, registerLoginSuccess } from "@/lib/auth-rate-limit";
import { createSessionToken, setServerSession } from "@/lib/auth-session";
import { createAdminCsrfToken, setAdminCsrfCookie } from "@/lib/admin-csrf";
import { verifyAdminCredentials } from "@/lib/admin-user-service";

const loginSchema = z.object({
  username: z.string().min(3).max(64),
  password: z.string().min(8).max(256),
});

function requestKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return "local";
}

export async function POST(request: Request) {
  const ipKey = requestKey(request);

  try {
    assertLoginAllowed(ipKey);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login temporarily blocked." },
      { status: 429 },
    );
  }

  let payload: z.infer<typeof loginSchema>;
  try {
    payload = loginSchema.parse(await request.json());
  } catch {
    registerLoginFailure(ipKey);
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const account = await verifyAdminCredentials(payload.username, payload.password);
  if (!account) {
    registerLoginFailure(ipKey);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  registerLoginSuccess(ipKey);
  const token = await createSessionToken({
    userId: account.id,
    username: account.username,
    role: account.role,
  });
  await setServerSession(token);
  const csrfToken = await createAdminCsrfToken();
  await setAdminCsrfCookie(csrfToken);

  return NextResponse.json({ ok: true });
}
