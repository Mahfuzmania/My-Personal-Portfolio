import { Metadata } from "next";
import { AdminBlogManager } from "@/components/admin-blog-manager";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllBlogPosts } from "@/lib/blog-service";

export const metadata: Metadata = {
  title: "Admin | Blog CMS",
};

export default async function AdminBlogPage() {
  await requireAdminSession();
  const posts = await getAllBlogPosts();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1 className="section-title mt-2 text-4xl font-semibold">Blog CMS</h1>
      </header>
      <AdminBlogManager initialPosts={posts} />
    </div>
  );
}
