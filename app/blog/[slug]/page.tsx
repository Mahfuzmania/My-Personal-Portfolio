import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth-session";
import { getBlogPostBySlug } from "@/lib/blog-service";
import { buildAbsoluteUrl } from "@/lib/seo";
import { SeoJsonLd } from "@/components/seo-jsonld";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: { preview?: string };
};

export async function generateMetadata({ params, searchParams }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const wantsPreview = searchParams?.preview === "1";
  const session = await getServerSession();
  const post = await getBlogPostBySlug(slug, { includeDraft: Boolean(wantsPreview && session) });
  if (!post) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const absoluteUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      images: post.seo?.image ? [post.seo.image] : undefined,
      type: "article",
      locale: post.lang,
    },
    alternates: {
      canonical: absoluteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.seo?.image ? [post.seo.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { slug } = await params;
  const wantsPreview = searchParams?.preview === "1";
  const session = await getServerSession();
  const post = await getBlogPostBySlug(slug, { includeDraft: Boolean(wantsPreview && session) });
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-7 md:space-y-10">
      <article className="card p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-accent">{post.lang}</span>
          <span className="text-sm text-muted">{new Date(post.publishedAt ?? post.updatedAt).toLocaleDateString()}</span>
        </div>
        <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
        <p className="mt-4 copy-text">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </article>

      <article className="card p-6 md:p-8">
        <div className="space-y-3 break-words leading-relaxed text-muted md:text-[1.02rem]">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={`${post.slug}-para-${index}`} className="whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: "Md Mahfuzul Islam",
          },
          datePublished: post.publishedAt ?? post.updatedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": buildAbsoluteUrl(`/blog/${post.slug}`),
          },
          url: buildAbsoluteUrl(`/blog/${post.slug}`),
        }}
      />
    </div>
  );
}
