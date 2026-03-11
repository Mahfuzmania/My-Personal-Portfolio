"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortfolioContent } from "@/lib/site-data";

type AdminContentEditorProps = {
  initialContent: PortfolioContent;
};

export function AdminContentEditor({ initialContent }: AdminContentEditorProps) {
  const router = useRouter();
  const [jsonValue, setJsonValue] = useState(JSON.stringify(initialContent, null, 2));
  const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const hasUnsaved = useMemo(() => jsonValue !== savedSnapshot, [jsonValue, savedSnapshot]);

  function formatJson() {
    setError(null);
    setStatus(null);

    try {
      const parsed = JSON.parse(jsonValue);
      setJsonValue(JSON.stringify(parsed, null, 2));
    } catch {
      setError("JSON is invalid. Please fix syntax before formatting.");
    }
  }

  function resetChanges() {
    setJsonValue(savedSnapshot);
    setError(null);
    setStatus("Unsaved changes reverted.");
  }

  async function reloadFromServer() {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/content", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to load latest content.");
        setLoading(false);
        return;
      }

      const nextJson = JSON.stringify(data.content, null, 2);
      setJsonValue(nextJson);
      setSavedSnapshot(nextJson);
      setStatus("Latest saved content loaded.");
      setLoading(false);
      router.refresh();
    } catch {
      setLoading(false);
      setError("Network error. Unable to reload content.");
    }
  }

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
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Save failed.");
        setSaving(false);
        return;
      }

      const normalized = JSON.stringify(parsed, null, 2);
      setJsonValue(normalized);
      setSavedSnapshot(normalized);
      setStatus("Content updated successfully.");
      setSaving(false);
      router.refresh();
    } catch {
      setSaving(false);
      setError("Network error. Save failed.");
    }
  }

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/csrf")
      .then((response) => response.json())
      .then((payload: { token?: string }) => {
        if (!ignore && payload?.token) {
          setCsrfToken(payload.token);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

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
          <p className="text-sm text-muted">Edit all website content (including `uiContent`) and save changes instantly.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">
            View Site
          </Link>
          <button
            type="button"
            onClick={reloadFromServer}
            disabled={loading || saving}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent disabled:opacity-60"
          >
            {loading ? "Reloading..." : "Reload Saved"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-red-400 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm ${hasUnsaved ? "text-amber-300" : "text-emerald-400"}`}>{hasUnsaved ? "Unsaved changes detected." : "All changes saved."}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={formatJson}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
          >
            Format JSON
          </button>
          <button
            type="button"
            onClick={resetChanges}
            disabled={!hasUnsaved || saving}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent disabled:opacity-60"
          >
            Reset Changes
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
