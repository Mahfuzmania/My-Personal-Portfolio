import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

type SessionPayload = JWTPayload & {
  sub: string;
  username: string;
  role?: string;
};

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  const secret =
    process.env.SESSION_SECRET ??
    "local-dev-only-change-this-session-secret-for-production";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: { userId: string; username: string; role: string }) {
  return new SignJWT({ username: payload.username, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, getSessionSecret(), {
      algorithms: ["HS256"],
    });
    return verified.payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  const session = await verifySessionToken(token);
  if (!session) {
    return null;
  }
  return {
    ...session,
    role: session.role ?? "owner",
  };
}

export async function setServerSession(token: string) {
  const store = await cookies();
  store.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearServerSession() {
  const store = await cookies();
  store.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
