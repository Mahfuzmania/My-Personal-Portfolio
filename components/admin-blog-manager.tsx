"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { BlogPostCard } from "@/components/blog-post-card";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  lang: "en" | "bn";
  tags: string[];
  coverImage?: string;
  publishedAt: string | null;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    canonicalUrl?: string;
  } | null;
  updatedAt: string;
};

type AdminBlogManagerProps = {
  initialPosts: BlogPost[];
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  lang: "en" | "bn";
  status: "draft" | "published";
  slug: string;
  tags: string;
  coverImage: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
};

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/60";

function emptyForm(): FormState {
  return {
    title: "",
    excerpt: "",
    content: "",
    lang: "en",
    status: "draft",
    slug: "",
    tags: "",
    coverImage: "",
    publishedAt: "",
    seoTitle: "",
    seoDescription: "",
  };
}

function toDatetime(value?: string | null) {
  if (!value) {
    return "";
  }
  return new Date(value).toISOString().slice(0, 16);
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export function AdminBlogManager({ initialPosts }: AdminBlogManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [formState, setFormState] = useState<FormState>(emptyForm());
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/csrf")
      .then((response) => response.json())
      .then((data: { token?: string }) => {
        if (!ignore && data?.token) {
          setCsrfToken(data.token);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const previewablePosts = useMemo(
    () => posts.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [posts],
  );

  function edit(post: BlogPost) {
    setEditingPostId(post.id);
    setFormState({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      lang: post.lang,
      status: post.status,
      slug: post.slug,
      tags: post.tags.join(", "),
      coverImage: post.coverImage ?? "",
      publishedAt: toDatetime(post.publishedAt),
      seoTitle: post.seo?.title ?? "",
      seoDescription: post.seo?.description ?? "",
    });
  }

  function cancelEdit() {
    setEditingPostId(null);
    setFormState(emptyForm());
  }

  function updateField<K extends keyof FormState>(name: K, value: FormState[K]) {
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && !editingPostId) {
      setFormState((prev) => ({ ...prev, slug: prev.slug }));
    }
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const tags = formState.tags
      .split(",")
      .map((value) => stripHtml(value.trim().toLowerCase()))
      .filter(Boolean);

    const body = {
      title: formState.title,
      excerpt: formState.excerpt,
      content: formState.content,
      lang: formState.lang,
      status: formState.status,
      slug: formState.slug || undefined,
      tags,
      coverImage: formState.coverImage || undefined,
      publishedAt: formState.publishedAt ? new Date(formState.publishedAt).toISOString() : null,
      seo: {
        title: formState.seoTitle || undefined,
        description: formState.seoDescription || undefined,
      },
    };

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (csrfToken) {
      headers["x-csrf-token"] = csrfToken;
    }

    try {
      const response = editingPostId
        ? await fetch(`/api/admin/blog/${editingPostId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(body),
          })
        : await fetch("/api/admin/blog", {
            method: "POST",
            headers,
            body: JSON.stringify(body),
          });

      const data = await response.json();
      if (!response.ok) {
        setStatus(data.error ?? "Failed to save.");
        setLoading(false);
        return;
      }

      const refreshed = await fetch("/api/admin/blog");
      if (refreshed.ok) {
        const latest = await refreshed.json();
        setPosts(latest.posts ?? []);
      }

      setStatus(editingPostId ? "Post updated." : "Post published to draft.");
      cancelEdit();
      setLoading(false);
    } catch {
      setStatus("Network error.");
      setLoading(false);
    }
  }

  async function removePost(id: string) {
    const ok = confirm("Delete this post?");
    if (!ok) {
      return;
    }

    setLoading(true);
    setStatus(null);
    const headers: Record<string, string> = {};
    if (csrfToken) {
      headers["x-csrf-token"] = csrfToken;
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE", headers });
      const data = await response.json();
      if (!response.ok) {
        setStatus(data.error ?? "Delete failed.");
        setLoading(false);
        return;
      }

      setPosts((prev) => prev.filter((item) => item.id !== id));
      setStatus("Post deleted.");
      setLoading(false);
    } catch {
      setStatus("Network error.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="card p-4 md:p-6">
        <h2 className="mb-4 text-xl font-semibold">{editingPostId ? "Edit Blog Post" : "Create Blog Post"}</h2>
        <form className="grid gap-3" onSubmit={submitHandler}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Title</span>
              <input
                className={inputClass}
                value={formState.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Slug</span>
              <input className={inputClass} value={formState.slug} onChange={(event) => updateField("slug", event.target.value)} />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Excerpt</span>
            <input
              className={inputClass}
              value={formState.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Cover image path (optional)</span>
            <input className={inputClass} value={formState.coverImage} onChange={(event) => updateField("coverImage", event.target.value)} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Tags (comma separated)</span>
            <input className={inputClass} value={formState.tags} onChange={(event) => updateField("tags", event.target.value)} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Content</span>
            <textarea
              rows={10}
              className={`${inputClass} min-h-44`}
              value={formState.content}
              onChange={(event) => updateField("content", event.target.value)}
              required
            />
          </label>

          <div className="grid gap-3 md:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Language</span>
              <select className={inputClass} value={formState.lang} onChange={(event) => updateField("lang", event.target.value as FormState["lang"])}>
                <option value="en">English</option>
                <option value="bn">Bangla</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Status</span>
              <select className={inputClass} value={formState.status} onChange={(event) => updateField("status", event.target.value as FormState["status"])}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Published At (optional)</span>
              <input
                type="datetime-local"
                className={inputClass}
                value={formState.publishedAt}
                onChange={(event) => updateField("publishedAt", event.target.value)}
              />
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
              >
                {loading ? "Saving..." : editingPostId ? "Save Changes" : "Create Post"}
              </button>
              {editingPostId ? (
                <button type="button" onClick={cancelEdit} className="rounded-full border border-border px-4 py-2.5 text-sm">
                  Cancel
                </button>
              ) : null}
            </div>
          </div>

          <details className="rounded-xl border border-border bg-surface/70 p-3">
            <summary className="cursor-pointer text-sm text-muted">SEO metadata</summary>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Meta title</span>
                <input
                  className={inputClass}
                  value={formState.seoTitle}
                  onChange={(event) => updateField("seoTitle", event.target.value)}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-1 block text-sm text-muted">Meta description</span>
                <input className={inputClass} value={formState.seoDescription} onChange={(event) => updateField("seoDescription", event.target.value)} />
              </label>
            </div>
          </details>
        </form>
        {status ? <p className="mt-3 text-sm text-muted">{status}</p> : null}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-xl font-semibold">All Posts</h2>
          <span className="text-xs text-muted">Use preview parameter on public page for drafts and scheduling checks.</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {previewablePosts.length === 0 ? (
            <article className="card p-5">
              <p className="text-sm text-muted">No posts yet. Create your first post.</p>
            </article>
          ) : null}
          {previewablePosts.map((post) => (
            <article key={post.id} className="card p-0">
              <BlogPostCard
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                tags={post.tags}
                status={post.status}
              />
              <div className="border-t border-border/80 p-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
                    onClick={() => edit(post)}
                  >
                    Edit
                  </button>
                  <a
                    href={`/blog/${post.slug}${post.status === "draft" ? "?preview=1" : ""}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:border-accent/50 hover:text-accent"
                  >
                    Open Public View
                  </a>
                  <button
                    type="button"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:border-red-400 hover:text-red-400"
                    onClick={() => removePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
