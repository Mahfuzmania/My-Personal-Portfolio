import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { createAdminCsrfToken, setAdminCsrfCookie } from "@/lib/admin-csrf";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await createAdminCsrfToken();
  await setAdminCsrfCookie(token);
  return NextResponse.json({ token });
}
