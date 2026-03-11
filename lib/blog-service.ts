import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  blogPostSchema,
  createBlogPostSchema,
  updateBlogPostSchema,
} from "@/lib/blog-schema";
import { ensureUniqueSlug, slugify } from "@/lib/slug";

type BlogPostStatus = "draft" | "published";
type BlogLang = "en" | "bn";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "blog-posts.json");

type BlogSeo = {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  lang: BlogLang;
  tags: string[];
  coverImage?: string;
  seo?: BlogSeo | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PersistedBlogPost = {
  id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  lang: BlogLang;
  tags?: string[];
  coverImage?: string;
  seo?: BlogSeo | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type BlogStore = { posts: PersistedBlogPost[] };

async function ensureFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ posts: [] }, null, 2), "utf-8");
  }
}

function isPublished(post: BlogPost) {
  if (post.status !== "published") {
    return false;
  }

  if (!post.publishedAt) {
    return true;
  }

  return new Date(post.publishedAt).getTime() <= Date.now();
}

function normalizePost(raw: PersistedBlogPost): BlogPost {
  const parsed = blogPostSchema.parse({
    id: raw.id ?? randomUUID(),
    slug: raw.slug ?? slugify(raw.title ?? "post"),
    title: raw.title,
    excerpt: raw.excerpt,
    content: raw.content,
    status: raw.status,
    lang: raw.lang,
    tags: raw.tags ?? [],
    coverImage: raw.coverImage,
    seo: raw.seo ?? undefined,
    publishedAt: raw.publishedAt ?? null,
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  });

  return parsed;
}

async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(dataFile, "utf-8");
  const parsed = JSON.parse(raw) as BlogStore;
  const list = Array.isArray(parsed?.posts) ? parsed.posts : [];
  return list.map(normalizePost);
}

async function writeAll(posts: BlogPost[]) {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify({ posts }, null, 2), "utf-8");
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await readAll();
  return posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getPublicBlogPosts(lang?: BlogLang): Promise<BlogPost[]> {
  const all = await getAllBlogPosts();
  return all
    .filter((post) => isPublished(post))
    .filter((post) => (lang ? post.lang === lang : true))
    .sort((a, b) => new Date(b.publishedAt || b.updatedAt).getTime() - new Date(a.publishedAt || a.updatedAt).getTime());
}

export async function getBlogPostBySlug(slug: string, options?: { includeDraft?: boolean; lang?: BlogLang }) {
  const all = await getAllBlogPosts();
  const normalizedSlug = slug.toLowerCase();
  const post = all.find((item) => item.slug === normalizedSlug && (!options?.lang || item.lang === options.lang));
  if (!post) {
    return null;
  }

  if (options?.includeDraft) {
    return post;
  }

  return isPublished(post) ? post : null;
}

export async function getBlogPostById(id: string) {
  const all = await getAllBlogPosts();
  return all.find((post) => post.id === id) ?? null;
}

export async function createBlogPost(raw: unknown) {
  const validated = createBlogPostSchema.parse(raw);
  const existing = await getAllBlogPosts();

  const baseSlug = slugify(validated.slug ?? validated.title);
  const existingSlugs = existing.map((post) => post.slug);
  const postSlug = ensureUniqueSlug(baseSlug, existingSlugs);

  const now = new Date().toISOString();
  const next: BlogPost = blogPostSchema.parse({
    id: randomUUID(),
    slug: postSlug,
    title: validated.title,
    excerpt: validated.excerpt,
    content: validated.content,
    status: validated.status,
    lang: validated.lang,
    tags: validated.tags,
    coverImage: validated.coverImage,
    seo: validated.seo ?? undefined,
    publishedAt: validated.publishedAt ?? null,
    createdAt: now,
    updatedAt: now,
  });

  await writeAll([next, ...existing]);
  return next;
}

export async function updateBlogPost(id: string, raw: unknown) {
  const patch = updateBlogPostSchema.parse(raw);
  const existing = await getAllBlogPosts();
  const index = existing.findIndex((post) => post.id === id);
  if (index === -1) {
    return null;
  }

  const target = existing[index];
  const candidate = createBlogPostSchema.parse({
    title: patch.title ?? target.title,
    excerpt: patch.excerpt ?? target.excerpt,
    content: patch.content ?? target.content,
    status: patch.status ?? target.status,
    lang: patch.lang ?? target.lang,
    tags: patch.tags && patch.tags.length > 0 ? patch.tags : (target.tags ?? []),
    coverImage: patch.coverImage ?? target.coverImage,
    slug: patch.slug ?? target.slug,
    publishedAt: patch.publishedAt === undefined ? target.publishedAt : patch.publishedAt,
    seo: patch.seo === undefined ? target.seo : patch.seo,
  });

  const existingSlugs = existing.filter((item) => item.id !== id).map((item) => item.slug);
  const nextSlug = candidate.slug ?? target.slug;
  const safeSlug = patch.slug ? ensureUniqueSlug(slugify(nextSlug), existingSlugs) : target.slug;

  const next: BlogPost = {
    ...target,
    ...candidate,
    slug: candidate.slug ? safeSlug : target.slug,
    tags: candidate.tags,
    seo: candidate.seo ?? target.seo,
    updatedAt: new Date().toISOString(),
  };

  const final = blogPostSchema.parse(next);
  existing[index] = final;
  await writeAll(existing);
  return final;
}

export async function deleteBlogPost(id: string) {
  const existing = await getAllBlogPosts();
  const next = existing.filter((post) => post.id !== id);
  if (next.length === existing.length) {
    return false;
  }

  await writeAll(next);
  return true;
}
