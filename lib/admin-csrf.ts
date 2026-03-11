import { createHash, randomUUID, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_CSRF_COOKIE_NAME = "admin_csrf";

function secureTokenHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function createAdminCsrfToken() {
  return randomUUID();
}

export async function setAdminCsrfCookie(token: string) {
  const store = await cookies();
  store.set({
    name: ADMIN_CSRF_COOKIE_NAME,
    value: secureTokenHash(token),
    httpOnly: false,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });
}

export async function clearAdminCsrfCookie() {
  const store = await cookies();
  store.set({
    name: ADMIN_CSRF_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function hasValidAdminCsrfToken(request: Request) {
  const store = await cookies();
  const cookieValue = store.get(ADMIN_CSRF_COOKIE_NAME)?.value;
  const headerValue = request.headers.get("x-csrf-token");

  if (!cookieValue || !headerValue) {
    return false;
  }

  const requestToken = secureTokenHash(headerValue);
  const expected = Buffer.from(cookieValue);
  const candidate = Buffer.from(requestToken);
  if (expected.length !== candidate.length) {
    return false;
  }

  return timingSafeEqual(expected, candidate);
}

export async function getAdminCsrfToken() {
  const store = await cookies();
  return store.get(ADMIN_CSRF_COOKIE_NAME)?.value;
}
