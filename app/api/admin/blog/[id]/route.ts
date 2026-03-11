import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/blog-service";
import { hasValidAdminCsrfToken } from "@/lib/admin-csrf";
import { hasAdminPermission } from "@/lib/admin-permissions";

type Params = {
  params: Promise<unknown>;
};

export async function GET(_: NextRequest, context: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminPermission(session.role, "blog.read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const resolved = (await context.params) as { id: string };
  const { id } = resolved;
  const post = await getBlogPostById(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, context: Params) {
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
    const resolved = (await context.params) as { id: string };
    const { id } = resolved;
    const payload = await request.json();
    const post = await updateBlogPost(id, payload);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to update post.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, context: Params) {
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

  const resolved = (await context.params) as { id: string };
  const { id } = resolved;
  const deleted = await deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
