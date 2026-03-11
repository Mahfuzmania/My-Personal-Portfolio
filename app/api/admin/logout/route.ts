import { NextResponse } from "next/server";
import { clearServerSession, getServerSession } from "@/lib/auth-session";
import { clearAdminCsrfCookie } from "@/lib/admin-csrf";

export async function POST() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ ok: true });
  }

  await clearServerSession();
  await clearAdminCsrfCookie();
  return NextResponse.json({ ok: true });
}
