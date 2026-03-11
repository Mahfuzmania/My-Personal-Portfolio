import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getPublicBlogPosts } from "@/lib/blog-service";

const staticRoutes = ["/", "/about", "/projects", "/research", "/experience", "/resume", "/contact", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const blogPosts = await getPublicBlogPosts();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base.origin}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.74,
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
