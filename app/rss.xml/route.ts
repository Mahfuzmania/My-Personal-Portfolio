import { NextResponse } from "next/server";
import { getPublicBlogPosts } from "@/lib/blog-service";
import { getSiteUrl } from "@/lib/seo";

export async function GET() {
  const posts = await getPublicBlogPosts();
  const base = getSiteUrl();
  const items = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt ?? post.updatedAt).toUTCString();
      const link = `${base.origin}/blog/${post.slug}`;
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${post.excerpt}]]></description>
        </item>
      `.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Md Mahfuzul Islam</title>
        <link>${base.origin}</link>
        <description>Data engineering, applied AI and technical writing.</description>
        <atom:link href="${base.origin}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`.trim();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=900",
    },
  });
}
