import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-session";

export async function requireAdminSession() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
