import { NextResponse } from "next/server";
import { clearServerSession, getServerSession } from "@/lib/auth-session";

export async function POST() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ ok: true });
  }

  await clearServerSession();
  return NextResponse.json({ ok: true });
}
