"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { ContactSubmission } from "@/lib/contact-submission-service";

type AdminInboxProps = {
  initialSubmissions: ContactSubmission[];
};

const statusOptions = ["new", "reviewed", "replied", "archived"] as const;

const itemClass = "rounded-xl border border-border bg-surface/75 px-3 py-2.5";

function toLocale(value: string) {
  return new Date(value).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export function AdminInbox({ initialSubmissions }: AdminInboxProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatusMessage] = useState<string | null>(null);

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

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (query.trim()) params.set("q", query.trim());
      const response = await fetch(`/api/admin/contact-submissions?${params.toString()}`);
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as { submissions: ContactSubmission[] };
      setSubmissions(data.submissions ?? []);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, statusFilter]);

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function onStatusFilter(event: ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(event.target.value);
  }

  async function changeStatus(id: string, statusValue: ContactSubmission["status"]) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (csrfToken) headers["x-csrf-token"] = csrfToken;
    const response = await fetch(`/api/admin/contact-submissions/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: statusValue }),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatusMessage(data.error ?? "Unable to update status.");
      return;
    }

    if (data?.submission) {
      setSubmissions((current) => current.map((item) => (item.id === id ? data.submission : item)));
    } else {
      setSubmissions((current) => current.filter((item) => item.id !== id));
    }
    setStatusMessage("Status updated.");
  }

  return (
    <div className="space-y-4">
      <section className="card p-4 md:p-5">
        <h2 className="mb-3 text-xl font-semibold">Contact Inbox</h2>
        <p className="mb-4 text-sm text-muted">
          New submissions arrive here with file metadata and status workflow for review.
        </p>
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Search</span>
            <input value={query} onChange={onQueryChange} placeholder="name, email, subject..." className="w-full rounded-xl border border-border bg-surface px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Status</span>
            <select value={statusFilter} onChange={onStatusFilter} className="w-full rounded-xl border border-border bg-surface px-3 py-2">
              <option value="all">All</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {status ? <p className="text-sm text-muted">{status}</p> : null}

      <section className="space-y-3">
        {submissions.length === 0 ? (
          <article className="card p-4">
            <p className="text-sm text-muted">No submissions found.</p>
          </article>
        ) : null}

        {submissions.map((item) => (
          <article key={item.id} className="card p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted">{item.email}</p>
                <p className="text-sm text-muted">{item.subject || "No subject"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-xs text-muted uppercase tracking-[0.14em]">{item.status}</span>
                <span className="text-xs text-muted">{toLocale(item.createdAt)}</span>
              </div>
            </div>

            <p className="rounded-xl border border-border bg-surface/80 p-3 text-sm text-muted">{item.message}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.attachments.length ? (
                <div className="w-full">
                  <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {item.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={`/api/admin/contact-submissions/${item.id}/attachments/${attachment.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50"
                      >
                        {attachment.originalName}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-2">
                {statusOptions.map((nextStatus) => (
                  <button
                    key={nextStatus}
                    type="button"
                    onClick={() => changeStatus(item.id, nextStatus)}
                    className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${
                      item.status === nextStatus ? "border-accent/70 text-accent" : "border-border"
                    }`}
                  >
                    {nextStatus}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
