import { AdminContentEditor } from "@/components/admin-content-editor";
import { AdminAccessManager } from "@/components/admin-access-manager";
import { getPortfolioContent } from "@/lib/content-service";
import { requireAdminSession } from "@/lib/admin-auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminSession();
  const content = await getPortfolioContent();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin Panel</p>
        <h1 className="section-title mt-2 text-4xl font-semibold">Portfolio Content Control Center</h1>
        <p className="mt-2 text-sm text-muted">Manage homepage content, research notes, blog posts, and incoming inquiries.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/admin/blog" className="rounded-2xl border border-border bg-surface/85 p-4 transition hover:border-accent/45">
          <p className="text-sm font-semibold">Blog CMS</p>
          <p className="mt-1 text-xs text-muted">Create, edit, schedule, and publish posts.</p>
        </Link>
        <Link href="/admin/contact-submissions" className="rounded-2xl border border-border bg-surface/85 p-4 transition hover:border-accent/45">
          <p className="text-sm font-semibold">Contact Inbox</p>
          <p className="mt-1 text-xs text-muted">Review, filter, and update inquiry status.</p>
        </Link>
        <Link href="/" className="rounded-2xl border border-border bg-surface/85 p-4 transition hover:border-accent/45">
          <p className="text-sm font-semibold">Back to Site</p>
          <p className="mt-1 text-xs text-muted">Open portfolio homepage and public content.</p>
        </Link>
      </div>
      <AdminAccessManager />
      <AdminContentEditor initialContent={content} />
    </div>
  );
}
