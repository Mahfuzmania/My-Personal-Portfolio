import { NextResponse } from "next/server";
import { getPortfolioContent, savePortfolioContent } from "@/lib/content-service";
import { getServerSession } from "@/lib/auth-session";
import { portfolioContentSchema } from "@/lib/portfolio-schema";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { hasAdminPermission } from "@/lib/admin-permissions";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "content.read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const content = await getPortfolioContent();
  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "content.write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const csrfValid = await hasValidAdminCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  try {
    const incoming = await request.json();
    const validated = portfolioContentSchema.parse(incoming);
    await savePortfolioContent(validated);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid content payload.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
