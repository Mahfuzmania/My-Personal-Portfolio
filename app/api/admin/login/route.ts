import { NextResponse } from "next/server";
import { z } from "zod";
import { assertLoginAllowed, registerLoginFailure, registerLoginSuccess } from "@/lib/auth-rate-limit";
import { createSessionToken, setServerSession } from "@/lib/auth-session";
import { verifyPassword } from "@/lib/auth-password";

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

  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  if (!adminHash || payload.username !== adminUsername) {
    registerLoginFailure(ipKey);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const validPassword = await verifyPassword(payload.password, adminHash);
  if (!validPassword) {
    registerLoginFailure(ipKey);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  registerLoginSuccess(ipKey);
  const token = await createSessionToken({
    userId: "local-admin",
    username: adminUsername,
  });
  await setServerSession(token);

  return NextResponse.json({ ok: true });
}
