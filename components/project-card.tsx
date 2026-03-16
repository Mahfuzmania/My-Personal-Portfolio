import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { getProjectCategoryIcon } from "@/components/project-icons";
import { UiIcon } from "@/components/ui-icon";
import { normalizeBnUiText } from "@/lib/bn-localize";
import type { SiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";
import { getProjectFigureLabel, resolveProjectFigureImage, resolveProjectLinks } from "@/lib/project-visuals";
import type { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  lang?: SiteLang;
};

function hasGithubHost(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().includes("github.com");
  } catch {
    return false;
  }
}

function isLiveLink(url: string) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes("vercel.app") || host.includes(".org") || host.includes(".com");
  } catch {
    return false;
  }
}

export function ProjectCard({ project, compact = false, lang = "en" }: ProjectCardProps) {
  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);
  const visibleStack = compact ? project.stack.slice(0, 3) : project.stack.slice(0, 6);
  const visibleTags = compact ? project.tags.slice(0, 2) : project.tags.slice(0, 4);
  const categoryIcon = getProjectCategoryIcon(project.category);
  const figureLabel = getProjectFigureLabel(project.figureType, lang);
  const figureImage = resolveProjectFigureImage(project);
  const projectLinks = resolveProjectLinks(project).slice(0, compact ? 1 : 2);
  const conciseDetail = project.solution ?? project.detail;
  const metrics = project.metrics?.slice(0, compact ? 2 : 3) ?? [];
  const outcomes = project.outcomes?.slice(0, compact ? 1 : 2) ?? [];
  const summary = project.shortSummary ?? project.summary;

  const t = {
    public: lang === "bn" ? "Public Proof" : "Public Proof",
    private: lang === "bn" ? "Private Implementation" : "Private Implementation",
    stack: lang === "bn" ? "Stack" : "Stack",
    featured: lang === "bn" ? "Featured" : "Featured",
    privateTag: lang === "bn" ? "Private Repo" : "Private Repo",
    repo: lang === "bn" ? "Repository" : "Repository",
    live: lang === "bn" ? "Live Site" : "Live Site",
    resource: lang === "bn" ? "Resource" : "Resource",
    problem: lang === "bn" ? "Problem" : "Problem",
    built: lang === "bn" ? "What Was Built" : "What Was Built",
    outcomes: lang === "bn" ? "Outcomes" : "Outcomes",
    capability: lang === "bn" ? "Capability Proven" : "Capability Proven",
    metrics: lang === "bn" ? "Evidence Metrics" : "Evidence Metrics",
    hidden:
      lang === "bn"
        ? "Private repository source is not public; architecture and outcomes are documented."
        : "Private repository source is not public; architecture and outcomes are documented.",
  };

  function resolveLinkLabel(url: string) {
    if (hasGithubHost(url)) return t.repo;
    if (isLiveLink(url)) return t.live;
    return t.resource;
  }

  return (
    <article className="card group flex flex-col card-pad transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_20px_32px_-26px_rgba(16,52,94,0.45)]">
      {figureImage ? (
        <div className={`relative overflow-hidden rounded-2xl border border-border bg-surface/60 ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          <Image src={figureImage} alt={`${project.title} evidence visual`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="chip">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-accent/30 bg-accent-soft/70 text-accent">
            <UiIcon name={categoryIcon} className="text-[12px]" />
          </span>
          {tr(project.category)}
        </p>
        <span className="chip">{project.privateRepo ? t.private : t.public}</span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {project.featured ? <span className="chip chip--accent">{t.featured}</span> : null}
        {project.privateRepo ? <span className="chip">{t.privateTag}</span> : null}
        {!compact && figureLabel ? <span className="chip">{figureLabel}</span> : null}
        {!compact ? (
          <span className="chip">
            {t.stack}: {project.stack.length}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight">{tr(project.title)}</h3>
      <p className={`mt-1.5 text-sm leading-6 text-muted ${compact ? "line-clamp-3" : ""}`}>{tr(summary)}</p>

      {!compact && project.challenge ? (
        <div className="mt-3 rounded-xl border border-border bg-surface/70 px-3 py-2.5">
          <p className="meta-label">{t.problem}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{tr(project.challenge)}</p>
        </div>
      ) : null}

      {!compact && conciseDetail ? (
        <div className="mt-3 rounded-xl border border-border bg-surface/70 px-3 py-2.5">
          <p className="meta-label">{t.built}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{tr(conciseDetail)}</p>
        </div>
      ) : null}

      {!compact && outcomes.length ? (
        <div className="mt-3">
          <p className="meta-label mb-2">{t.outcomes}</p>
          <ul className="space-y-2 text-sm text-muted">
            {outcomes.map((point) => (
              <li key={`${project.title}-outcome-${point}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
                <span className="inline-flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{tr(point)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!compact && project.provenCapability ? (
        <p className="mt-3 border-l-2 border-accent/50 pl-3 text-sm text-muted">
          <span className="font-semibold text-foreground">{t.capability}: </span>
          {tr(project.provenCapability)}
        </p>
      ) : null}

      {!compact && metrics.length ? (
        <div className="mt-3">
          <p className="meta-label mb-2">{t.metrics}</p>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <span key={`${project.title}-metric-${metric}`} className="chip chip--accent">
                {tr(metric)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {!compact && !outcomes.length && project.impact ? <p className="mt-3 border-l-2 border-accent/50 pl-3 text-sm text-muted">{tr(project.impact)}</p> : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {visibleStack.map((tool) => (
          <span key={`${project.title}-${tool}`} className="chip">
            <BrandIcon label={tool} className="text-[13px]" />
            {tr(tool)}
          </span>
        ))}
      </div>

      {!compact ? (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span key={`${project.title}-${tag}`} className="chip chip--accent">
              {tr(tag)}
            </span>
          ))}
        </div>
      ) : null}

      <div className={`${compact ? "mt-3 flex flex-wrap gap-3 pt-2" : "mt-auto flex flex-wrap gap-3 pt-3"}`}>
        {projectLinks.length ? (
          projectLinks.map((link) => (
            <Link key={`${project.title}-${link}`} href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80">
              {resolveLinkLabel(link)}
              <UiIcon name="arrow-up-right" className="text-[14px]" />
            </Link>
          ))
        ) : (
          <p className="text-xs font-medium tracking-[0.12em] text-muted">{t.hidden}</p>
        )}
      </div>
    </article>
  );
}
