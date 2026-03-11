import { NextResponse } from "next/server";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { getServerSession } from "@/lib/auth-session";
import { createBlogPost, getAllBlogPosts } from "@/lib/blog-service";
import { hasAdminPermission } from "@/lib/admin-permissions";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "blog.read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const posts = await getAllBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "blog.write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const csrfValid = await hasValidAdminCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  try {
    const payload = await request.json();
    const post = await createBlogPost(payload);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to create post.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
