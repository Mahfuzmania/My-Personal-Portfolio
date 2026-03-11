import { cookies } from "next/headers";

export type SiteLang = "en" | "bn";

export async function getSiteLang(): Promise<SiteLang> {
  const store = await cookies();
  const cookieLang = store.get("portfolio-lang")?.value;
  return cookieLang === "bn" ? "bn" : "en";
}
