import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

type BlogPostCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  tags: string[];
  status: "draft" | "published";
  showMeta?: boolean;
  accent?: ReactNode;
  lang?: SiteLang;
};

const formatDate = (value: string | null, lang: SiteLang) => {
  if (!value) {
    return lang === "bn" ? "তারিখ নির্ধারিত নয়" : "Not scheduled";
  }

  return new Date(value).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function BlogPostCard({ slug, title, excerpt, publishedAt, tags, status, showMeta = true, accent, lang = "en" }: BlogPostCardProps) {
  const statusLabel =
    lang === "bn"
      ? status === "published"
        ? "প্রকাশিত"
        : "ড্রাফট"
      : status;

  return (
    <article className="card group flex h-full flex-col card-pad transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`chip text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
            status === "published" ? "chip--accent" : ""
          }`}
        >
          {statusLabel}
        </span>
        {showMeta ? <p className="meta-label">{formatDate(publishedAt, lang)}</p> : null}
      </div>
      {accent ? <div className="mt-3">{accent}</div> : null}
      <Link href={`/blog/${slug}`} className="mt-4 block">
        <h3 className="section-title text-[1.5rem] font-semibold tracking-tight transition group-hover:text-accent md:text-[1.65rem]">{repairMojibakeText(title)}</h3>
      </Link>
      <p className="mt-3 text-sm leading-6 text-muted">{repairMojibakeText(excerpt)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.slice(0, 5).map((tag) => (
          <span key={`${slug}-${tag}`} className="chip">
            {repairMojibakeText(tag)}
          </span>
        ))}
      </div>
    </article>
  );
}
