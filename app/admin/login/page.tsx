import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getServerSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70dvh] w-full items-center justify-center">
      <AdminLoginForm />
    </div>
  );
}
