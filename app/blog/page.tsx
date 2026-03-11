import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "@/lib/auth-session";
import { getAllBlogPosts, getPublicBlogPosts } from "@/lib/blog-service";
import { BlogPostCard } from "@/components/blog-post-card";
import { CtaLink } from "@/components/cta-link";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { UiIcon } from "@/components/ui-icon";
import { getSiteLang } from "@/lib/lang";
import { buildAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog | Md Mahfuzul Islam",
  description: "Technical notes on healthcare data engineering, applied AI, and production-oriented software systems.",
  openGraph: {
    title: "Blog | Md Mahfuzul Islam",
    description: "Technical notes on healthcare data engineering, applied AI, and production-oriented software systems.",
    url: buildAbsoluteUrl("/blog"),
    type: "website",
  },
  alternates: {
    canonical: buildAbsoluteUrl("/blog"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Md Mahfuzul Islam",
    description: "Technical notes on healthcare data engineering, applied AI, and production-oriented software systems.",
  },
};

type BlogPageProps = {
  searchParams?: { preview?: string };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const lang = await getSiteLang();
  const wantsPreview = searchParams?.preview === "1";
  const session = await getServerSession();
  const posts = wantsPreview && session ? await getAllBlogPosts() : await getPublicBlogPosts(lang);
  const visiblePosts = posts.filter((post) => post.lang === lang);
  const publishedCount = visiblePosts.filter((post) => post.status === "published").length;

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="section-block p-[clamp(1rem,0.8rem+0.8vw,1.4rem)] md:p-[clamp(1.2rem,0.95rem+0.9vw,1.65rem)]">
          <div className="flex flex-wrap gap-2">
            <p className="chip chip--accent text-xs font-semibold uppercase tracking-[0.16em]">Technical Notes</p>
            {wantsPreview ? <span className="chip">Preview Mode</span> : null}
          </div>

          <h1 className="section-title clamp-heading max-w-[16ch] font-semibold">Engineering Notes from Real Projects</h1>
          <p className="measure max-w-3xl text-base text-muted md:text-lg">
            Field notes from real implementation work in data engineering, applied AI, and software delivery.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="card p-3.5">
              <p className="meta-label">Visible Posts</p>
              <p className="mt-1 text-xl font-semibold">{visiblePosts.length}</p>
            </article>
            <article className="card p-3.5">
              <p className="meta-label">Published</p>
              <p className="mt-1 text-xl font-semibold">{publishedCount}</p>
            </article>
            <article className="card p-3.5">
              <p className="meta-label">Language</p>
              <p className="mt-1 text-xl font-semibold">{lang.toUpperCase()}</p>
            </article>
          </div>

          {wantsPreview ? (
            <p className="text-xs text-muted">Preview mode is active. Draft and scheduled posts are included.</p>
          ) : (
            <p className="text-xs text-muted">
              Need drafts? Add <code className="rounded bg-surface px-2 py-0.5">&amp;preview=1</code> after admin login.
            </p>
          )}

          <div className="section-actions">
            <CtaLink href="/contact">{lang === "bn" ? "à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦— à¦•à¦°à§à¦¨" : "Start a Conversation"}</CtaLink>
            <CtaLink href="/projects" secondary>
              {lang === "bn" ? "à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¦à§‡à¦–à§à¦¨" : "View Projects"}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-2">
          {visiblePosts.length === 0 ? (
            <article className="card col-span-full card-pad-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/35 bg-accent-soft text-accent">
                <UiIcon name="book" className="text-[18px]" />
              </div>
              <h2 className="section-title mt-4 text-2xl font-semibold tracking-tight">
                {lang === "bn" ? "à¦•à§‹à¦¨à§‹ à¦ªà§à¦°à¦•à¦¾à¦¶à¦¿à¦¤ à¦ªà§‹à¦¸à§à¦Ÿ à¦¨à§‡à¦‡" : "No published posts yet"}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {lang === "bn"
                  ? "à¦ªà§à¦°à¦¥à¦® à¦ªà§‹à¦¸à§à¦Ÿ à¦ªà§à¦°à¦•à¦¾à¦¶à§‡à¦° à¦ªà¦° à¦à¦–à¦¾à¦¨à§‡ à¦¤à¦¾à¦²à¦¿à¦•à¦¾ à¦¦à§‡à¦–à¦¾ à¦¯à¦¾à¦¬à§‡à¥¤"
                  : "Published articles will appear here once the first post goes live."}
              </p>
              <div className="section-actions mt-4">
                <CtaLink href="/projects" secondary>
                  {lang === "bn" ? "à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¦à§‡à¦–à§à¦¨" : "Browse Projects"}
                </CtaLink>
                <Link href="/admin/blog" className="chip hover:border-accent/45 hover:text-foreground">
                  {lang === "bn" ? "à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨ à¦¬à§à¦²à¦— à¦®à§à¦¯à¦¾à¦¨à§‡à¦œà¦¾à¦°" : "Open Admin Blog Manager"}
                </Link>
              </div>
            </article>
          ) : null}

          {visiblePosts.map((post) => (
            <BlogPostCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              tags={post.tags}
              status={post.status}
              accent={
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-2.5 py-1 text-xs text-accent">
                  {post.lang.toUpperCase()}
                </span>
              }
            />
          ))}
        </div>
      </section>

      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Md Mahfuzul Islam Blog",
          url: buildAbsoluteUrl("/blog"),
          description: "Notes on healthcare data engineering, applied AI, and delivery-focused systems work.",
        }}
      />
    </div>
  );
}

