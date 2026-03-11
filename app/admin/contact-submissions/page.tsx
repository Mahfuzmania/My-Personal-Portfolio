import { Metadata } from "next";
import { AdminInbox } from "@/components/admin-inbox";
import { requireAdminSession } from "@/lib/admin-auth";
import { listContactSubmissions } from "@/lib/contact-submission-service";

export const metadata: Metadata = {
  title: "Admin | Contact Inbox",
};

export default async function AdminContactPage() {
  await requireAdminSession();
  const submissions = await listContactSubmissions();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1 className="section-title mt-2 text-4xl font-semibold">Contact Inbox</h1>
      </header>
      <AdminInbox initialSubmissions={submissions} />
    </div>
  );
}
