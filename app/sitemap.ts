import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getPublicBlogPosts } from "@/lib/blog-service";

const staticRoutes = ["/", "/about", "/projects", "/research", "/experience", "/resume", "/contact", "/blog"];
const routeMeta: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/blog": { changeFrequency: "weekly", priority: 0.9 },
  "/projects": { changeFrequency: "monthly", priority: 0.86 },
  "/about": { changeFrequency: "monthly", priority: 0.82 },
  "/research": { changeFrequency: "monthly", priority: 0.8 },
  "/experience": { changeFrequency: "monthly", priority: 0.8 },
  "/resume": { changeFrequency: "monthly", priority: 0.78 },
  "/contact": { changeFrequency: "monthly", priority: 0.75 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const blogPosts = await getPublicBlogPosts();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base.origin}${route}`,
    lastModified: now,
    changeFrequency: routeMeta[route]?.changeFrequency ?? "monthly",
    priority: routeMeta[route]?.priority ?? 0.72,
  }));

  for (const post of blogPosts) {
    entries.push({
      url: `${base.origin}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.72,
    });
  }

  return entries;
}
