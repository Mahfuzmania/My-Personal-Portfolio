import { NextResponse } from "next/server";
import { getPortfolioContent, savePortfolioContent } from "@/lib/content-service";
import { getServerSession } from "@/lib/auth-session";
import { portfolioContentSchema } from "@/lib/portfolio-schema";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getPortfolioContent();
  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
