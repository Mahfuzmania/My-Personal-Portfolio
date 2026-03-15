"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  EducationItem,
  ExperienceItem,
  FocusItem,
  LocalizedCard,
  PortfolioContent,
  Project,
  ProjectCategory,
  ProjectFigureType,
  SkillGroup,
  TrainingItem,
  WorkstreamVisual,
} from "@/lib/site-data";

type AdminContentEditorProps = { initialContent: PortfolioContent };

type EditorSection =
  | "profile"
  | "hero"
  | "about"
  | "roles"
  | "professionalFocus"
  | "projects"
  | "research"
  | "experience"
  | "resume"
  | "contact"
  | "narrative";

const sectionConfig: Array<{ key: EditorSection; label: string; description: string }> = [
  { key: "profile", label: "Profile", description: "Identity, links, and media paths." },
  { key: "hero", label: "Hero", description: "Homepage hero, scope, and workstreams." },
  { key: "about", label: "About", description: "Biography and About narrative." },
  { key: "roles", label: "Roles", description: "Current role/context cards." },
  { key: "professionalFocus", label: "Professional Focus", description: "Enact and AZM Labs focus entries." },
  { key: "projects", label: "Projects", description: "Featured and full project catalog." },
  { key: "research", label: "Research", description: "Interests, explorations, and themes." },
  { key: "experience", label: "Experience", description: "Professional timeline entries." },
  { key: "resume", label: "Resume", description: "Focus cards, education, training, and skills." },
  { key: "contact", label: "Contact", description: "Collaboration topics for contact page." },
  { key: "narrative", label: "Narrative", description: "Highlights, philosophy, and achievements." },
];

const inputClass = "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-accent/60";
const panelClass = "rounded-2xl border border-border bg-surface/70 p-4";
const projectCategories: ProjectCategory[] = [
  "Data Engineering",
  "Applied AI Systems",
  "Clinical ML / Predictive Analytics",
  "Simulation / Energy Systems",
  "Control Systems / Simulation",
  "Platform Engineering / CMS Systems",
  "Signal / Image Processing",
  "Embedded / Systems Work",
];

const projectFigureTypes: ProjectFigureType[] = [
  "healthcare-data-flow",
  "rag-retrieval-workflow",
  "cms-publishing-workflow",
  "simulation-tradeoff-chart",
  "control-response-curve",
  "clinical-ml-pipeline",
  "signal-processing-pipeline",
  "embedded-system-diagram",
];

function cloneContent(value: PortfolioContent): PortfolioContent {
  return JSON.parse(JSON.stringify(value)) as PortfolioContent;
}

function parseSnapshot(snapshot: string): PortfolioContent {
  return JSON.parse(snapshot) as PortfolioContent;
}

function updateItem<T>(items: T[], index: number, updater: (item: T) => T): T[] {
  return items.map((item, idx) => (idx === index ? updater(item) : item));
}

function removeItem<T>(items: T[], index: number): T[] {
  return items.filter((_, idx) => idx !== index);
}

function sanitizeOptional(value: string | undefined): string | undefined {
  const normalized = (value ?? "").trim();
  return normalized.length ? normalized : undefined;
}

function sanitizeList(values: string[] | undefined): string[] | undefined {
  const cleaned = (values ?? []).map((value) => value.trim()).filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

function sanitizeProject(project: Project): Project {
  return {
    ...project,
    title: project.title.trim(),
    slug: sanitizeOptional(project.slug),
    summary: project.summary.trim(),
    shortSummary: sanitizeOptional(project.shortSummary),
    detail: sanitizeOptional(project.detail),
    challenge: sanitizeOptional(project.challenge),
    solution: sanitizeOptional(project.solution),
    outcomes: sanitizeList(project.outcomes),
    provenCapability: sanitizeOptional(project.provenCapability),
    imagePath: sanitizeOptional(project.imagePath),
    figureImage: sanitizeOptional(project.figureImage),
    metrics: sanitizeList(project.metrics),
    proofAssets: sanitizeList(project.proofAssets),
    links: sanitizeList(project.links),
    stack: project.stack.map((item) => item.trim()).filter(Boolean),
    tags: project.tags.map((item) => item.trim()).filter(Boolean),
    impact: sanitizeOptional(project.impact),
    contributions: sanitizeList(project.contributions),
    repoUrl: sanitizeOptional(project.repoUrl),
  };
}

function sanitizeContent(content: PortfolioContent): PortfolioContent {
  const payload = cloneContent(content);
  payload.featuredProjects = payload.featuredProjects.map(sanitizeProject);
  payload.projects = payload.projects.map(sanitizeProject);
  return payload;
}

function createEmptyWorkstream(): WorkstreamVisual {
  return { title: { en: "", bn: "" }, detail: { en: "", bn: "" }, variant: "data" };
}

function createEmptyLocalizedCard(): LocalizedCard {
  return { title: { en: "", bn: "" }, detail: { en: "", bn: "" } };
}

function createEmptyProject(): Project {
  return {
    title: "",
    slug: "",
    summary: "",
    shortSummary: "",
    detail: "",
    challenge: "",
    solution: "",
    outcomes: [],
    provenCapability: "",
    imagePath: "",
    figureType: "healthcare-data-flow",
    figureImage: "",
    metrics: [],
    proofAssets: [],
    links: [],
    stack: [],
    category: "Data Engineering",
    tags: [],
    impact: "",
    contributions: [],
    featured: false,
    publishState: "published",
    visibility: "public",
    repoUrl: "",
    privateRepo: false,
  };
}

function createEmptyExperience(): ExperienceItem {
  return { period: "", role: "", org: "", type: "", points: [] };
}

function createEmptyEducation(): EducationItem {
  return { period: "", degree: "", institution: "", details: [] };
}

function createEmptyTraining(): TrainingItem {
  return { period: "", title: "", organization: "", details: [] };
}

function createEmptySkillGroup(): SkillGroup {
  return { title: "", items: [] };
}

function createEmptyFocusItem(): FocusItem {
  return { title: "", detail: "" };
}

type StringListEditorProps = {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  addLabel?: string;
  placeholder?: string;
};

function StringListEditor({ label, values, onChange, addLabel = "Add Item", placeholder = "Enter text" }: StringListEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{label}</p>
        <button type="button" onClick={() => onChange([...values, ""])} className="rounded-full border border-border px-3 py-1 text-xs hover:border-accent/50 hover:text-accent">
          {addLabel}
        </button>
      </div>
      {values.length === 0 ? <p className="text-xs text-muted">No items yet.</p> : null}
      {values.map((value, idx) => (
        <div key={`${label}-${idx}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <input value={value} onChange={(event) => onChange(updateItem(values, idx, () => event.target.value))} placeholder={placeholder} className={inputClass} />
          <button type="button" onClick={() => onChange(removeItem(values, idx))} className="mt-1 rounded-xl border border-red-400/40 px-3 py-2 text-xs text-red-300 hover:border-red-400 hover:text-red-200">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

type LocalizedStringListEditorProps = {
  title: string;
  value: { en: string[]; bn: string[] };
  onChange: (next: { en: string[]; bn: string[] }) => void;
};

function LocalizedStringListEditor({ title, value, onChange }: LocalizedStringListEditorProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface/55 p-3">
      <p className="text-sm font-semibold">{title}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <StringListEditor label="English" values={value.en} onChange={(next) => onChange({ ...value, en: next })} addLabel="Add EN" placeholder="English line" />
        <StringListEditor label="Bangla" values={value.bn} onChange={(next) => onChange({ ...value, bn: next })} addLabel="Add BN" placeholder="Bangla line" />
      </div>
    </div>
  );
}

type LocalizedCardListEditorProps = {
  title: string;
  description: string;
  items: LocalizedCard[];
  addLabel: string;
  onChange: (next: LocalizedCard[]) => void;
};

function LocalizedCardListEditor({ title, description, items, addLabel, onChange }: LocalizedCardListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted">{description}</p>
        </div>
        <button type="button" onClick={() => onChange([...items, createEmptyLocalizedCard()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">
          {addLabel}
        </button>
      </div>
      {items.length === 0 ? <p className="text-xs text-muted">No cards yet.</p> : null}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <article key={`${title}-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">Title (EN)<input value={item.title.en} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: { ...current.title, en: event.target.value } })))} className={inputClass} /></label>
              <label className="text-sm">Title (BN)<input value={item.title.bn} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: { ...current.title, bn: event.target.value } })))} className={inputClass} /></label>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Detail (EN)<textarea value={item.detail.en} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, detail: { ...current.detail, en: event.target.value } })))} rows={3} className={inputClass} /></label>
              <label className="text-sm">Detail (BN)<textarea value={item.detail.bn} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, detail: { ...current.detail, bn: event.target.value } })))} rows={3} className={inputClass} /></label>
            </div>
            <div className="mt-3 flex justify-end">
              <button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Card</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

type WorkstreamListEditorProps = {
  items: WorkstreamVisual[];
  onChange: (next: WorkstreamVisual[]) => void;
};

function WorkstreamListEditor({ items, onChange }: WorkstreamListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">Workstreams</p>
          <p className="text-xs text-muted">Add/remove and edit each Home workstream card.</p>
        </div>
        <button type="button" onClick={() => onChange([...items, createEmptyWorkstream()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Workstream</button>
      </div>
      {items.map((item, idx) => (
        <article key={`workstream-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <div className="grid gap-3 md:grid-cols-3">
            <label className="text-sm">Variant
              <select value={item.variant} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, variant: event.target.value as WorkstreamVisual["variant"] })))} className={inputClass}>
                <option value="data">Data</option>
                <option value="ai">AI</option>
                <option value="simulation">Simulation</option>
                <option value="platform">Platform</option>
              </select>
            </label>
            <label className="text-sm">Title (EN)<input value={item.title.en} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: { ...current.title, en: event.target.value } })))} className={inputClass} /></label>
            <label className="text-sm">Title (BN)<input value={item.title.bn} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: { ...current.title, bn: event.target.value } })))} className={inputClass} /></label>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="text-sm">Detail (EN)<textarea rows={3} value={item.detail.en} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, detail: { ...current.detail, en: event.target.value } })))} className={inputClass} /></label>
            <label className="text-sm">Detail (BN)<textarea rows={3} value={item.detail.bn} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, detail: { ...current.detail, bn: event.target.value } })))} className={inputClass} /></label>
          </div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Workstream</button></div>
        </article>
      ))}
    </div>
  );
}

type ProjectListEditorProps = {
  title: string;
  description: string;
  projects: Project[];
  onChange: (next: Project[]) => void;
};

function ProjectListEditor({ title, description, projects, onChange }: ProjectListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted">{description}</p>
        </div>
        <button type="button" onClick={() => onChange([...projects, createEmptyProject()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Project</button>
      </div>
      <div className="space-y-3">
        {projects.map((project, idx) => (
          <article key={`${title}-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm">Title<input value={project.title} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, title: event.target.value })))} className={inputClass} /></label>
              <label className="text-sm">Slug<input value={project.slug ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, slug: event.target.value || undefined })))} className={inputClass} /></label>
              <label className="text-sm">Category
                <select value={project.category} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, category: event.target.value as ProjectCategory })))} className={inputClass}>
                  {projectCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Summary<textarea rows={3} value={project.summary} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, summary: event.target.value })))} className={inputClass} /></label>
              <label className="text-sm">Short Summary<textarea rows={3} value={project.shortSummary ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, shortSummary: event.target.value || undefined })))} className={inputClass} /></label>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Challenge / Problem<textarea rows={4} value={project.challenge ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, challenge: event.target.value || undefined })))} className={inputClass} /></label>
              <label className="text-sm">Solution / What Was Built<textarea rows={4} value={project.solution ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, solution: event.target.value || undefined })))} className={inputClass} /></label>
            </div>
            <label className="mt-3 block text-sm">Detail (Legacy / Extended Narrative)<textarea rows={4} value={project.detail ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, detail: event.target.value || undefined })))} className={inputClass} /></label>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="grid gap-3">
                <label className="text-sm">Image Path<input value={project.imagePath ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, imagePath: event.target.value || undefined })))} className={inputClass} /></label>
                <label className="text-sm">Figure Image (filename or /path)<input value={project.figureImage ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, figureImage: event.target.value || undefined })))} className={inputClass} /></label>
                <label className="text-sm">Figure Type
                  <select value={project.figureType ?? "healthcare-data-flow"} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, figureType: event.target.value as ProjectFigureType })))} className={inputClass}>
                    {projectFigureTypes.map((figureType) => <option key={figureType} value={figureType}>{figureType}</option>)}
                  </select>
                </label>
                <label className="text-sm">Impact<textarea rows={2} value={project.impact ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, impact: event.target.value || undefined })))} className={inputClass} /></label>
              </div>
              <div className="grid gap-3">
                <label className="text-sm">Capability Proven<textarea rows={2} value={project.provenCapability ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, provenCapability: event.target.value || undefined })))} className={inputClass} /></label>
                <label className="text-sm">Repo URL<input value={project.repoUrl ?? ""} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, repoUrl: event.target.value || undefined })))} className={inputClass} /></label>
                <label className="text-sm">Publish State
                  <select value={project.publishState ?? "published"} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, publishState: event.target.value as Project["publishState"] })))} className={inputClass}>
                    <option value="published">published</option>
                    <option value="draft">draft</option>
                  </select>
                </label>
                <label className="text-sm">Visibility
                  <select value={project.visibility ?? "public"} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, visibility: event.target.value as Project["visibility"] })))} className={inputClass}>
                    <option value="public">public</option>
                    <option value="private">private</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <StringListEditor label="Stack" values={project.stack} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, stack: next })))} addLabel="Add Stack" placeholder="e.g. Next.js" />
              <StringListEditor label="Tags" values={project.tags} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, tags: next })))} addLabel="Add Tag" placeholder="e.g. Data Quality" />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <StringListEditor label="Outcomes" values={project.outcomes ?? []} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, outcomes: next.length ? next : undefined })))} addLabel="Add Outcome" placeholder="Outcome line" />
              <StringListEditor label="Metrics" values={project.metrics ?? []} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, metrics: next.length ? next : undefined })))} addLabel="Add Metric" placeholder="e.g. 70k+ patient rows processed" />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <StringListEditor label="Proof Assets" values={project.proofAssets ?? []} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, proofAssets: next.length ? next : undefined })))} addLabel="Add Proof Asset" placeholder="e.g. Validation report snapshot" />
              <StringListEditor label="Links" values={project.links ?? []} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, links: next.length ? next : undefined })))} addLabel="Add Link" placeholder="https://..." />
            </div>
            <div className="mt-3">
              <StringListEditor label="Contributions" values={project.contributions ?? []} onChange={(next) => onChange(updateItem(projects, idx, (item) => ({ ...item, contributions: next.length ? next : undefined })))} addLabel="Add Contribution" placeholder="Contribution line" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 text-xs text-muted"><input type="checkbox" checked={Boolean(project.featured)} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, featured: event.target.checked })))} />Featured</label>
              <label className="inline-flex items-center gap-2 text-xs text-muted"><input type="checkbox" checked={Boolean(project.privateRepo)} onChange={(event) => onChange(updateItem(projects, idx, (item) => ({ ...item, privateRepo: event.target.checked })))} />Private Repo</label>
              <button type="button" onClick={() => onChange(removeItem(projects, idx))} className="ml-auto rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Project</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

type ExperienceListEditorProps = { title: string; description: string; items: ExperienceItem[]; onChange: (next: ExperienceItem[]) => void };

function ExperienceListEditor({ title, description, items, onChange }: ExperienceListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted">{description}</p></div>
        <button type="button" onClick={() => onChange([...items, createEmptyExperience()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Experience</button>
      </div>
      {items.map((item, idx) => (
        <article key={`exp-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">Period<input value={item.period} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, period: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm">Role<input value={item.role} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, role: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm">Organization<input value={item.org} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, org: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm">Type<input value={item.type} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, type: event.target.value })))} className={inputClass} /></label>
          </div>
          <div className="mt-3"><StringListEditor label="Points" values={item.points} onChange={(next) => onChange(updateItem(items, idx, (current) => ({ ...current, points: next })))} addLabel="Add Point" placeholder="Responsibility or impact" /></div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Experience</button></div>
        </article>
      ))}
    </div>
  );
}

type EducationListEditorProps = { title: string; items: EducationItem[]; onChange: (next: EducationItem[]) => void };

function EducationListEditor({ title, items, onChange }: EducationListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        <button type="button" onClick={() => onChange([...items, createEmptyEducation()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Education</button>
      </div>
      {items.map((item, idx) => (
        <article key={`edu-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">Period<input value={item.period} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, period: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm">Degree<input value={item.degree} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, degree: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm md:col-span-2">Institution<input value={item.institution} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, institution: event.target.value })))} className={inputClass} /></label>
          </div>
          <div className="mt-3"><StringListEditor label="Details" values={item.details} onChange={(next) => onChange(updateItem(items, idx, (current) => ({ ...current, details: next })))} addLabel="Add Detail" placeholder="Education detail" /></div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Education</button></div>
        </article>
      ))}
    </div>
  );
}

type TrainingListEditorProps = { items: TrainingItem[]; onChange: (next: TrainingItem[]) => void };

function TrainingListEditor({ items, onChange }: TrainingListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-semibold">Training</p>
        <button type="button" onClick={() => onChange([...items, createEmptyTraining()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Training</button>
      </div>
      {items.map((item, idx) => (
        <article key={`training-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">Period<input value={item.period} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, period: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm">Title<input value={item.title} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: event.target.value })))} className={inputClass} /></label>
            <label className="text-sm md:col-span-2">Organization<input value={item.organization} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, organization: event.target.value })))} className={inputClass} /></label>
          </div>
          <div className="mt-3"><StringListEditor label="Details" values={item.details} onChange={(next) => onChange(updateItem(items, idx, (current) => ({ ...current, details: next })))} addLabel="Add Detail" placeholder="Training detail" /></div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Training</button></div>
        </article>
      ))}
    </div>
  );
}

type FocusListEditorProps = { items: FocusItem[]; onChange: (next: FocusItem[]) => void };

function FocusListEditor({ items, onChange }: FocusListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-sm font-semibold">Technical Focus</p><p className="text-xs text-muted">Editable cards shown on Home and Resume sections.</p></div>
        <button type="button" onClick={() => onChange([...items, createEmptyFocusItem()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Focus Card</button>
      </div>
      {items.map((item, idx) => (
        <article key={`focus-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <label className="text-sm">Title<input value={item.title} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: event.target.value })))} className={inputClass} /></label>
          <label className="mt-3 block text-sm">Detail<textarea rows={3} value={item.detail} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, detail: event.target.value })))} className={inputClass} /></label>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Focus Card</button></div>
        </article>
      ))}
    </div>
  );
}

type SkillGroupListEditorProps = { items: SkillGroup[]; onChange: (next: SkillGroup[]) => void };

function SkillGroupListEditor({ items, onChange }: SkillGroupListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-semibold">Skill Groups</p>
        <button type="button" onClick={() => onChange([...items, createEmptySkillGroup()])} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent">Add Skill Group</button>
      </div>
      {items.map((group, idx) => (
        <article key={`skill-group-${idx}`} className="rounded-xl border border-border bg-surface/55 p-3">
          <label className="text-sm">Group Title<input value={group.title} onChange={(event) => onChange(updateItem(items, idx, (current) => ({ ...current, title: event.target.value })))} className={inputClass} /></label>
          <div className="mt-3"><StringListEditor label="Skills" values={group.items} onChange={(next) => onChange(updateItem(items, idx, (current) => ({ ...current, items: next })))} addLabel="Add Skill" placeholder="Skill" /></div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={() => onChange(removeItem(items, idx))} className="rounded-xl border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200">Remove Skill Group</button></div>
        </article>
      ))}
    </div>
  );
}

export function AdminContentEditor({ initialContent }: AdminContentEditorProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<PortfolioContent>(() => cloneContent(initialContent));
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialContent));
  const [activeSection, setActiveSection] = useState<EditorSection>("profile");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const hasUnsaved = useMemo(() => JSON.stringify(draft) !== savedSnapshot, [draft, savedSnapshot]);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/csrf").then((response) => response.json()).then((payload: { token?: string }) => {
      if (!ignore && payload?.token) setCsrfToken(payload.token);
    });
    return () => {
      ignore = true;
    };
  }, []);

  function resetChanges() {
    const content = parseSnapshot(savedSnapshot);
    setDraft(content);
    setError(null);
    setStatus("Unsaved changes reverted.");
  }

  async function reloadFromServer() {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/content", { method: "GET", cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to load latest content.");
        setLoading(false);
        return;
      }
      const content = cloneContent(data.content as PortfolioContent);
      setDraft(content);
      setSavedSnapshot(JSON.stringify(content));
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
    try {
      const payload = sanitizeContent(draft);
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.details ?? data.error ?? "Save failed.");
        setSaving(false);
        return;
      }
      setDraft(payload);
      setSavedSnapshot(JSON.stringify(payload));
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
          <h2 className="text-lg font-semibold">Portfolio Content Manager</h2>
          <p className="text-sm text-muted">Form-based editor with add/remove controls for all major repeatable sections.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">View Site</Link>
          <button type="button" onClick={reloadFromServer} disabled={loading || saving} className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent disabled:opacity-60">{loading ? "Reloading..." : "Reload Saved"}</button>
          <button type="button" onClick={logout} className="rounded-full border border-border px-4 py-2 text-sm hover:border-red-400 hover:text-red-400">Logout</button>
        </div>
      </div>

      <div className="card card-pad">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`text-sm ${hasUnsaved ? "text-amber-300" : "text-emerald-400"}`}>{hasUnsaved ? "Unsaved changes detected." : "All changes saved."}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={resetChanges} disabled={!hasUnsaved || saving} className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent disabled:opacity-60">Reset Changes</button>
            <button type="button" onClick={saveContent} disabled={saving} className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70">{saving ? "Saving..." : "Save Content"}</button>
          </div>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {sectionConfig.map((section) => (
            <button key={section.key} type="button" onClick={() => setActiveSection(section.key)} className={`rounded-xl border px-3 py-2 text-left transition ${section.key === activeSection ? "border-accent/60 bg-accent-soft/40" : "border-border bg-surface/70 hover:border-accent/35"}`}>
              <p className="text-sm font-semibold">{section.label}</p>
              <p className="mt-1 text-xs text-muted">{section.description}</p>
            </button>
          ))}
        </div>

        {status ? <p className="mt-4 text-sm text-emerald-400">{status}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      </div>

      <div className="card card-pad space-y-4">
        {activeSection === "profile" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Profile</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Name<input value={draft.profile.name} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, name: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Location<input value={draft.profile.location} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, location: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Primary Email<input value={draft.profile.email} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, email: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Secondary Email<input value={draft.profile.secondaryEmail} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, secondaryEmail: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">GitHub URL<input value={draft.profile.github} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, github: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">LinkedIn URL<input value={draft.profile.linkedin} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, linkedin: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Facebook URL<input value={draft.profile.facebook} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, facebook: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Photo Path<input value={draft.profile.photoPath} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, photoPath: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">Resume Path<input value={draft.profile.resumePath} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, resumePath: event.target.value } }))} className={inputClass} /></label>
              <label className="text-sm">CV Path<input value={draft.profile.cvPath} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, cvPath: event.target.value } }))} className={inputClass} /></label>
            </div>
          </section>
        ) : null}

        {activeSection === "hero" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Hero</h3>
            <label className="mt-3 block text-sm">Identity Line<textarea value={draft.profile.identityLine} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, identityLine: event.target.value } }))} rows={3} className={inputClass} /></label>
            <label className="mt-3 block text-sm">Short Intro<textarea value={draft.profile.shortIntro} onChange={(event) => setDraft((c) => ({ ...c, profile: { ...c.profile, shortIntro: event.target.value } }))} rows={3} className={inputClass} /></label>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Navbar role line (EN)<input value={draft.uiContent.navbarRoleLine.en} onChange={(event) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, navbarRoleLine: { ...c.uiContent.navbarRoleLine, en: event.target.value } } }))} className={inputClass} /></label>
              <label className="text-sm">Navbar role line (BN)<input value={draft.uiContent.navbarRoleLine.bn} onChange={(event) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, navbarRoleLine: { ...c.uiContent.navbarRoleLine, bn: event.target.value } } }))} className={inputClass} /></label>
            </div>
            <div className="mt-4 space-y-3">
              <LocalizedStringListEditor title="Home Profile Narrative" value={draft.uiContent.home.profileNarrative} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, home: { ...c.uiContent.home, profileNarrative: next } } }))} />
              <LocalizedStringListEditor title="Home Scope" value={draft.uiContent.home.scope} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, home: { ...c.uiContent.home, scope: next } } }))} />
              <WorkstreamListEditor items={draft.uiContent.home.workstreams} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, home: { ...c.uiContent.home, workstreams: next } } }))} />
            </div>
          </section>
        ) : null}

        {activeSection === "about" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">About</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">Biography (EN)<textarea value={draft.uiContent.about.biography.en} onChange={(event) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, about: { ...c.uiContent.about, biography: { ...c.uiContent.about.biography, en: event.target.value } } } }))} rows={6} className={inputClass} /></label>
              <label className="text-sm">Biography (BN)<textarea value={draft.uiContent.about.biography.bn} onChange={(event) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, about: { ...c.uiContent.about, biography: { ...c.uiContent.about.biography, bn: event.target.value } } } }))} rows={6} className={inputClass} /></label>
            </div>
            <div className="mt-4"><StringListEditor label="About Summary" values={draft.aboutSummary} onChange={(next) => setDraft((c) => ({ ...c, aboutSummary: next }))} addLabel="Add Summary Line" placeholder="About summary line" /></div>
          </section>
        ) : null}

        {activeSection === "roles" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Roles</h3>
            <LocalizedCardListEditor title="Context Cards" description="Cards shown in About current roles section." items={draft.uiContent.about.contextCards} addLabel="Add Role Card" onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, about: { ...c.uiContent.about, contextCards: next } } }))} />
          </section>
        ) : null}

        {activeSection === "professionalFocus" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Professional Focus</h3>
            <LocalizedCardListEditor title="Professional Focus Cards" description="Create clean focus cards for Enact and AZM Labs." items={draft.uiContent.about.professionalFocus} addLabel="Add Focus Card" onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, about: { ...c.uiContent.about, professionalFocus: next } } }))} />
          </section>
        ) : null}

        {activeSection === "projects" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Projects</h3>
            <p className="text-sm text-muted">Use live URLs and keep `privateRepo` enabled for private repositories.</p>
            <div className="mt-4 space-y-5">
              <ProjectListEditor title="Featured Projects" description="Projects highlighted on Home page." projects={draft.featuredProjects} onChange={(next) => setDraft((c) => ({ ...c, featuredProjects: next }))} />
              <ProjectListEditor title="All Projects" description="Master projects list used by Projects page." projects={draft.projects} onChange={(next) => setDraft((c) => ({ ...c, projects: next }))} />
            </div>
          </section>
        ) : null}

        {activeSection === "research" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Research</h3>
            <div className="mt-3 space-y-3">
              <LocalizedStringListEditor title="Technical Interests" value={draft.uiContent.research.technicalInterests} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, research: { ...c.uiContent.research, technicalInterests: next } } }))} />
              <LocalizedStringListEditor title="Explorations" value={draft.uiContent.research.explorations} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, research: { ...c.uiContent.research, explorations: next } } }))} />
              <StringListEditor label="Research Themes" values={draft.researchThemes} onChange={(next) => setDraft((c) => ({ ...c, researchThemes: next }))} addLabel="Add Theme" placeholder="Research theme" />
            </div>
          </section>
        ) : null}

        {activeSection === "experience" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Experience</h3>
            <ExperienceListEditor title="Experience Timeline" description="Add/remove each timeline entry and bullet points." items={draft.experience} onChange={(next) => setDraft((c) => ({ ...c, experience: next }))} />
          </section>
        ) : null}

        {activeSection === "resume" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Resume</h3>
            <div className="mt-3 space-y-4">
              <FocusListEditor items={draft.technicalFocus} onChange={(next) => setDraft((c) => ({ ...c, technicalFocus: next }))} />
              <EducationListEditor title="Education" items={draft.education} onChange={(next) => setDraft((c) => ({ ...c, education: next }))} />
              <TrainingListEditor items={draft.training} onChange={(next) => setDraft((c) => ({ ...c, training: next }))} />
              <LocalizedStringListEditor title="Resume Summary Points" value={draft.uiContent.resume.summaryPoints} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, resume: { ...c.uiContent.resume, summaryPoints: next } } }))} />
              <SkillGroupListEditor items={draft.skillGroups} onChange={(next) => setDraft((c) => ({ ...c, skillGroups: next }))} />
            </div>
          </section>
        ) : null}

        {activeSection === "contact" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="mt-3 space-y-3">
              <LocalizedStringListEditor title="Collaboration Topics" value={draft.uiContent.contact.collaborationTopics} onChange={(next) => setDraft((c) => ({ ...c, uiContent: { ...c.uiContent, contact: { ...c.uiContent.contact, collaborationTopics: next } } }))} />
            </div>
          </section>
        ) : null}

        {activeSection === "narrative" ? (
          <section className={panelClass}>
            <h3 className="text-lg font-semibold">Narrative</h3>
            <div className="mt-3 space-y-3">
              <StringListEditor label="Highlights" values={draft.highlights} onChange={(next) => setDraft((c) => ({ ...c, highlights: next }))} addLabel="Add Highlight" placeholder="Highlight line" />
              <StringListEditor label="Working Philosophy" values={draft.workingPhilosophy} onChange={(next) => setDraft((c) => ({ ...c, workingPhilosophy: next }))} addLabel="Add Principle" placeholder="Principle" />
              <StringListEditor label="Achievement Items" values={draft.achievementItems} onChange={(next) => setDraft((c) => ({ ...c, achievementItems: next }))} addLabel="Add Achievement" placeholder="Achievement" />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
