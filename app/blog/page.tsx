import type { Metadata } from "next";
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
  description: "Technical notes on data engineering, applied AI, secure platforms, and production-oriented software systems.",
  openGraph: {
    title: "Blog | Md Mahfuzul Islam",
    description: "Technical notes on data engineering, applied AI, secure platforms, and production-oriented software systems.",
    url: buildAbsoluteUrl("/blog"),
    type: "website",
  },
  alternates: {
    canonical: buildAbsoluteUrl("/blog"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Md Mahfuzul Islam",
    description: "Technical notes on data engineering, applied AI, secure platforms, and production-oriented software systems.",
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

  const t = {
    hero: {
      kicker: lang === "bn" ? "টেকনিক্যাল নোটস" : "Technical Notes",
      preview: lang === "bn" ? "প্রিভিউ মোড" : "Preview Mode",
      title: lang === "bn" ? "বাস্তব প্রজেক্ট থেকে ইঞ্জিনিয়ারিং নোটস" : "Engineering Notes from Real Projects",
      description:
        lang === "bn"
          ? "ডেটা ইঞ্জিনিয়ারিং, অ্যাপ্লাইড এআই এবং সফটওয়্যার ডেলিভারির বাস্তব কাজ থেকে নেওয়া নোট।"
          : "Field notes from real implementation work in data engineering, applied AI, and software delivery.",
      topics:
        lang === "bn"
          ? ["ডেটা ইঞ্জিনিয়ারিং", "অ্যাপ্লাইড এআই", "ব্যাকএন্ড ও প্ল্যাটফর্ম"]
          : ["Data Engineering", "Applied AI", "Backend & Platform"],
    },
    stats: {
      visible: lang === "bn" ? "দৃশ্যমান পোস্ট" : "Visible Posts",
      published: lang === "bn" ? "প্রকাশিত" : "Published",
      language: lang === "bn" ? "ভাষা" : "Language",
    },
    previewActive: lang === "bn" ? "প্রিভিউ মোড চালু আছে। ড্রাফট এবং শিডিউলড পোস্ট দেখানো হচ্ছে।" : "Preview mode is active. Draft and scheduled posts are included.",
    ctaPrimary: lang === "bn" ? "যোগাযোগ করুন" : "Start a Conversation",
    ctaSecondary: lang === "bn" ? "প্রজেক্ট দেখুন" : "View Projects",
    emptyTitle: lang === "bn" ? "প্রকাশনা স্পেস প্রস্তুত" : "Publication space is ready",
    emptyText:
      lang === "bn"
        ? "ডেটা ইঞ্জিনিয়ারিং, অ্যাপ্লাইড এআই এবং প্ল্যাটফর্ম ডেলিভারি নিয়ে যাচাইকৃত টেকনিক্যাল নোট শীঘ্রই প্রকাশ করা হবে।"
        : "Curated technical writing on data systems, applied AI workflows, and secure platform delivery is being prepared.",
    emptySubtext:
      lang === "bn"
        ? "প্রথম প্রকাশনার আগে প্রজেক্ট কেস স্টাডি দেখতে পারেন।"
        : "Until the first post is published, project case studies remain available.",
    upcomingTopics:
      lang === "bn"
        ? ["মাল্টি-সোর্স ডেটা কোয়ালিটি চেকপয়েন্ট", "RAG মূল্যায়ন ডিজাইন", "নিরাপদ CMS পাবলিশিং ওয়ার্কফ্লো"]
        : ["Multi-source Data Quality Checkpoints", "RAG Evaluation Design", "Secure CMS Publishing Workflow"],
    browseProjects: lang === "bn" ? "প্রজেক্ট ব্রাউজ করুন" : "Browse Projects",
  };

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="section-block p-[clamp(1rem,0.8rem+0.8vw,1.4rem)] md:p-[clamp(1.2rem,0.95rem+0.9vw,1.65rem)]">
          <div className="flex flex-wrap gap-2">
            <p className="chip chip--accent text-xs font-semibold uppercase tracking-[0.16em]">{t.hero.kicker}</p>
            {wantsPreview && session ? <span className="chip">{t.hero.preview}</span> : null}
          </div>

          <h1 className="section-title clamp-heading max-w-[18ch] font-medium">{t.hero.title}</h1>
          <p className="measure max-w-3xl text-base text-muted md:text-lg">{t.hero.description}</p>

          <div className="flex flex-wrap gap-2">
            {t.hero.topics.map((topic) => (
              <span key={topic} className="chip">
                <UiIcon name="spark" className="text-[13px]" />
                {topic}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="card p-3.5">
              <p className="meta-label flex items-center gap-1.5">
                <UiIcon name="book" className="text-[14px]" />
                {t.stats.visible}
              </p>
              <p className="mt-1 text-xl font-semibold">{visiblePosts.length}</p>
            </article>
            <article className="card p-3.5">
              <p className="meta-label flex items-center gap-1.5">
                <UiIcon name="document" className="text-[14px]" />
                {t.stats.published}
              </p>
              <p className="mt-1 text-xl font-semibold">{publishedCount}</p>
            </article>
            <article className="card p-3.5">
              <p className="meta-label flex items-center gap-1.5">
                <UiIcon name="language" className="text-[14px]" />
                {t.stats.language}
              </p>
              <p className="mt-1 text-xl font-semibold">{lang === "bn" ? "বাংলা" : "English"}</p>
            </article>
          </div>

          {wantsPreview && session ? <p className="text-xs text-muted">{t.previewActive}</p> : null}

          <div className="section-actions">
            <CtaLink href="/contact">{t.ctaPrimary}</CtaLink>
            <CtaLink href="/projects" secondary>
              {t.ctaSecondary}
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
              <h2 className="section-title mt-4 text-2xl font-semibold tracking-tight">{t.emptyTitle}</h2>
              <p className="mt-2 text-sm text-muted">{t.emptyText}</p>
              <p className="mt-1 text-sm text-muted">{t.emptySubtext}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.upcomingTopics.map((topic) => (
                  <span key={topic} className="chip chip--accent">
                    <UiIcon name="spark" className="text-[12px]" />
                    {topic}
                  </span>
                ))}
              </div>
              <div className="section-actions mt-4">
                <CtaLink href="/projects" secondary>
                  {t.browseProjects}
                </CtaLink>
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
              lang={lang}
              accent={
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-2.5 py-1 text-xs text-accent">
                  {post.lang === "bn" ? "বাংলা" : "EN"}
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
          description: "Notes on data engineering, applied AI, and delivery-focused systems work.",
        }}
      />
    </div>
  );
}
