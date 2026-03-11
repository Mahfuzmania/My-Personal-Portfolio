"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { UiIcon } from "@/components/ui-icon";

type ContactQuickMessageFormProps = {
  toEmail: string;
  lang: "en" | "bn";
};

const MAX_FILES = 3;
const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE_BYTES = 12 * 1024 * 1024;
const ACCEPTED_FILES =
  "image/png,image/jpeg,image/jpg,image/webp,image/gif,application/pdf";
const ACCEPTED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const ACCEPTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"]);

export function ContactQuickMessageForm({ toEmail, lang }: ContactQuickMessageFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const labels = useMemo(
    () => ({
      name: lang === "bn" ? "নাম" : "Name",
      email: "Email",
      subject: lang === "bn" ? "বিষয়" : "Subject",
      message: lang === "bn" ? "বার্তা" : "Message",
      namePlaceholder: lang === "bn" ? "আপনার নাম" : "Your name",
      subjectPlaceholder: lang === "bn" ? "প্রজেক্ট বিষয়" : "Subject or topic",
      emailPlaceholder: "name@email.com",
      messagePlaceholder:
        lang === "bn"
          ? "আপনার প্রজেক্টের স্কোপ, টাইমলাইন এবং সহযোগিতার প্রসঙ্গ সংক্ষেপে লিখুন।"
          : "Share your project scope, timeline, and collaboration context.",
      send: lang === "bn" ? "মেসেজ পাঠান" : "Send Message",
      sending: lang === "bn" ? "পাঠানো হচ্ছে..." : "Sending...",
      done: lang === "bn" ? "মেসেজ সফলভাবে পাঠানো হয়েছে।" : "Message sent successfully.",
      uploadHint: lang === "bn" ? "সর্বোচ্চ ৩টি ফাইল" : "Up to 3 attachments",
      fileLabel: lang === "bn" ? "ফাইল অ্যাটাচ করুন (ঐচ্ছিক)" : "Attach files (optional)",
    }),
    [lang],
  );

  function isAttachmentAcceptable(file: File) {
    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    if (!ACCEPTED_TYPES.has(file.type)) {
      return false;
    }
    if (!ACCEPTED_EXTENSIONS.has(extension)) {
      return false;
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) {
      return false;
    }
    return true;
  }

  function getValidationMessage(next: File[]) {
    if (next.length > MAX_FILES) {
      return lang === "bn" ? "আপনি একসাথে সর্বোচ্চ ৩টি ফাইল দিতে পারবেন।" : "You can upload a maximum of 3 files.";
    }

    const badFiles = next.filter((file) => !isAttachmentAcceptable(file));
    if (badFiles.length > 0) {
      return `${labels.uploadHint}.`;
    }

    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_TOTAL_FILE_SIZE_BYTES) {
      return lang === "bn" ? "মোট ফাইলের আকার সর্বোচ্চ ১২MB এর বেশি হতে পারবে না।" : "Total upload size must be 12MB or less.";
    }

    return null;
  }

  function formatBytes(value: number) {
    if (value <= 0) {
      return "0 B";
    }
    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(value) / Math.log(1024));
    return `${(value / 1024 ** index).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
  }

  function onFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const next = Array.from(event.target.files ?? []);
    const message = getValidationMessage(next);
    if (message) {
      setError(message);
      setFiles([]);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    setFiles(next);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setError(null);

    const preflightMessage = getValidationMessage(files);
    if (preflightMessage) {
      setError(preflightMessage);
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("subject", subject.trim());
    formData.append("message", message.trim());
    formData.append("website", "");
    formData.append("recipient", toEmail);

    for (const file of files) {
      formData.append("attachments", file);
    }

    const response = await fetch("/api/contact/submit", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setError(result?.error ?? (lang === "bn" ? "মেসেজ পাঠাতে ব্যর্থ হয়েছে।" : "Unable to send your message."));
      setSubmitting(false);
      return;
    }

    setStatus(labels.done);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFiles([]);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm text-muted">{labels.name}</span>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/60"
          placeholder={labels.namePlaceholder}
          required
          disabled={submitting}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-muted">{labels.email}</span>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/60"
          placeholder={labels.emailPlaceholder}
          required
          disabled={submitting}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-muted">{labels.subject}</span>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/60"
          placeholder={labels.subjectPlaceholder}
          required
          disabled={submitting}
          maxLength={160}
          minLength={3}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-muted">{labels.message}</span>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/60"
          placeholder={labels.messagePlaceholder}
          maxLength={5000}
          minLength={30}
          required
          disabled={submitting}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.12em] text-muted">{labels.uploadHint}</span>
        <span className="mb-1 block text-sm text-muted">{labels.fileLabel}</span>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED_FILES}
          multiple
          onChange={onFilesChange}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none"
          disabled={submitting}
        />
      </label>

      {files.length ? (
        <div className="rounded-xl border border-border bg-surface/80 p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted">Selected files</p>
          <ul className="space-y-1 text-sm text-muted">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center justify-between gap-3">
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-muted">{formatBytes(file.size)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <input type="text" name="website" autoComplete="off" readOnly value="" hidden />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="inline-flex items-center gap-2">
          <UiIcon name="contact" className="text-base" />
          {submitting ? labels.sending : labels.send}
        </span>
      </button>

      {status ? <p className="text-sm text-emerald-400">{status}</p> : null}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </form>
  );
}
