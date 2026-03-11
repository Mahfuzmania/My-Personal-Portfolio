import Link from "next/link";
import type { ReactNode } from "react";

type BlogPostCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  tags: string[];
  status: "draft" | "published";
  showMeta?: boolean;
  accent?: ReactNode;
};

const fmt = (value: string | null) => {
  if (!value) {
    return "Not scheduled";
  }
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function BlogPostCard({ slug, title, excerpt, publishedAt, tags, status, showMeta = true, accent }: BlogPostCardProps) {
  return (
    <article className="card group flex h-full flex-col card-pad transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`chip text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
            status === "published" ? "chip--accent" : ""
          }`}
        >
          {status}
        </span>
        {showMeta ? <p className="meta-label">{fmt(publishedAt)}</p> : null}
      </div>
      {accent ? <div className="mt-3">{accent}</div> : null}
      <Link href={`/blog/${slug}`} className="mt-4 block">
        <h3 className="section-title text-[1.5rem] font-semibold tracking-tight transition group-hover:text-accent md:text-[1.65rem]">{title}</h3>
      </Link>
      <p className="mt-3 text-sm leading-6 text-muted">{excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.slice(0, 5).map((tag) => (
          <span key={`${slug}-${tag}`} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
