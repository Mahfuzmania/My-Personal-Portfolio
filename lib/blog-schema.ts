import { z } from "zod";

export const blogLocaleSchema = z.enum(["en", "bn"]);
export const blogStatusSchema = z.enum(["draft", "published"]);

const tagSchema = z
  .string()
  .trim()
  .min(1, "Tag cannot be empty.")
  .max(64, "Tag is too long.")
  .transform((value) => value.toLowerCase());

const blogSeoSchema = z.object({
  title: z.string().min(2).max(140).optional(),
  description: z.string().min(8).max(280).optional(),
  image: z
    .string()
    .trim()
    .max(500)
    .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), {
      message: "Image should be a valid URL or start with /",
    })
    .optional(),
  canonicalUrl: z
    .string()
    .trim()
    .max(300)
    .refine((value) => value.startsWith("https://") || value.startsWith("http://"), {
      message: "Canonical URL must be absolute",
    })
    .optional(),
});

export const createBlogPostSchema = z.object({
  title: z.string().min(2).max(180),
  excerpt: z.string().min(20).max(240),
  content: z.string().min(120),
  status: blogStatusSchema,
  lang: blogLocaleSchema,
  tags: z.array(tagSchema).default([]).transform((tags) => [...new Set(tags)]),
  coverImage: z.string().max(300).optional(),
  slug: z.string().trim().min(2).max(120).optional(),
  publishedAt: z.string().datetime({ offset: true }).nullable().optional(),
  seo: blogSeoSchema.optional(),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(2).max(180).optional(),
  excerpt: z.string().min(20).max(240).optional(),
  content: z.string().min(120).optional(),
  status: blogStatusSchema.optional(),
  lang: blogLocaleSchema.optional(),
  tags: z.array(tagSchema).default([]).transform((tags) => [...new Set(tags)]).optional(),
  coverImage: z.string().max(300).optional().nullable(),
  slug: z.string().trim().min(2).max(120).optional(),
  publishedAt: z.string().datetime({ offset: true }).nullable().optional(),
  seo: blogSeoSchema.optional().nullable(),
}).partial();

export const blogPostSchema = z.object({
  id: z.string().uuid().or(z.string().cuid()),
  slug: z.string().trim().min(2).max(120),
  title: z.string().min(2).max(180),
  excerpt: z.string().min(20).max(240),
  content: z.string().min(120),
  status: blogStatusSchema,
  lang: blogLocaleSchema,
  tags: z.array(z.string().min(1)),
  coverImage: z.string().max(300).optional(),
  publishedAt: z.string().datetime({ offset: true }).nullable(),
  seo: blogSeoSchema.optional().nullable(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});
