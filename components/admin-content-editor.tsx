"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortfolioContent } from "@/lib/site-data";

type AdminContentEditorProps = {
  initialContent: PortfolioContent;
};

export function AdminContentEditor({ initialContent }: AdminContentEditorProps) {
  const router = useRouter();
  const [jsonValue, setJsonValue] = useState(JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function saveContent() {
    setSaving(true);
    setError(null);
    setStatus(null);

    let parsed;
    try {
      parsed = JSON.parse(jsonValue);
    } catch {
      setSaving(false);
      setError("JSON is invalid. Please fix syntax before saving.");
      return;
    }

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Save failed.");
        setSaving(false);
        return;
      }

      setStatus("Content updated successfully.");
      setSaving(false);
      router.refresh();
    } catch {
      setSaving(false);
      setError("Network error. Save failed.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h2 className="text-lg font-semibold">Portfolio Content JSON Editor</h2>
          <p className="text-sm text-muted">
            Edit the full website content schema and save changes instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
          >
            View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-red-400 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      <textarea
        value={jsonValue}
        onChange={(event) => setJsonValue(event.target.value)}
        className="h-[70dvh] w-full rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-6 outline-none transition focus:border-accent/60 md:text-sm"
        spellCheck={false}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveContent}
          disabled={saving}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save Content"}
        </button>
        {status ? <p className="text-sm text-emerald-400">{status}</p> : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
}
