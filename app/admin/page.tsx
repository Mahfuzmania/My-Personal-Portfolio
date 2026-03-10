import { AdminContentEditor } from "@/components/admin-content-editor";
import { getPortfolioContent } from "@/lib/content-service";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminSession();
  const content = await getPortfolioContent();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin Panel</p>
        <h1 className="section-title mt-2 text-4xl font-semibold">Portfolio Content Control Center</h1>
      </header>
      <AdminContentEditor initialContent={content} />
    </div>
  );
}
