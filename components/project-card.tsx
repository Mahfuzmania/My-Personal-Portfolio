import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { getProjectCategoryIcon } from "@/components/project-icons";
import { UiIcon } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";
import type { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  lang?: SiteLang;
};

export function ProjectCard({ project, compact = false, lang = "en" }: ProjectCardProps) {
  const visibleStack = compact ? project.stack.slice(0, 4) : project.stack.slice(0, 6);
  const visibleTags = compact ? project.tags.slice(0, 3) : project.tags.slice(0, 5);
  const compactInsight = compact ? project.impact ?? project.contributions?.[0] ?? project.detail?.split(".")[0] : null;
  const conciseDetail = project.detail
    ? `${project.detail
        .split(".")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 1)
        .join(". ")}.`
    : null;
  const categoryIcon = getProjectCategoryIcon(project.category);

  const t = {
    public: lang === "bn" ? "à¦ªà¦¾à¦¬à¦²à¦¿à¦• à¦°à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿà¦°à¦¿" : "Public Repository",
    private: lang === "bn" ? "à¦ªà§à¦°à¦¾à¦‡à¦­à§‡à¦Ÿ à¦¬à¦¿à¦²à§à¦¡" : "Private Build",
    stack: lang === "bn" ? "à¦¸à§à¦Ÿà§à¦¯à¦¾à¦•" : "Stack",
    featured: lang === "bn" ? "à¦«à¦¿à¦šà¦¾à¦°à§à¦¡" : "Featured",
    privateTag: lang === "bn" ? "à¦ªà§à¦°à¦¾à¦‡à¦­à§‡à¦Ÿ" : "Private",
    repo: lang === "bn" ? "à¦°à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿà¦°à¦¿ à¦¦à§‡à¦–à§à¦¨" : "View Repository",
    hidden: lang === "bn" ? "à¦ªà§à¦°à¦¾à¦‡à¦­à§‡à¦Ÿ à¦‡à¦®à¦ªà§à¦²à¦¿à¦®à§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨à§‡à¦° à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦ªà§à¦°à¦•à¦¾à¦¶ à¦•à¦°à¦¾ à¦¹à§Ÿà¦¨à¦¿à¥¤" : "Private implementation details are not published.",
  };

  return (
    <article className="card group flex h-full flex-col card-pad transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_20px_32px_-26px_rgba(16,52,94,0.45)]">
      {project.imagePath ? (
        <div className={`relative overflow-hidden rounded-2xl border border-border bg-surface/60 ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          <Image src={project.imagePath} alt={`${project.title} visual`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="chip">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-accent/30 bg-accent-soft/70 text-accent">
            <UiIcon name={categoryIcon} className="text-[12px]" />
          </span>
          {project.category}
        </p>
        <span className="chip">{project.privateRepo ? t.private : t.public}</span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {project.featured ? <span className="chip chip--accent">{t.featured}</span> : null}
        {project.privateRepo ? <span className="chip">{t.privateTag}</span> : null}
        <span className="chip">
          {t.stack}: {project.stack.length}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted">{project.summary}</p>

      {compactInsight ? <p className="mt-2.5 rounded-xl border border-border bg-surface/70 px-3 py-2.5 text-sm leading-6 text-muted">{compactInsight}</p> : null}
      {!compact && conciseDetail ? <p className="mt-2.5 text-sm leading-6 text-muted">{conciseDetail}</p> : null}

      {!compact && project.contributions?.length ? (
        <ul className="mt-3.5 space-y-2 text-sm text-muted">
          {project.contributions.slice(0, 2).map((point) => (
            <li key={`${project.title}-${point}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
              <span className="inline-flex items-start gap-2">
                <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{point}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {!compact && project.impact ? <p className="mt-3.5 border-l-2 border-accent/50 pl-3 text-sm text-muted">{project.impact}</p> : null}

      <div className="mt-3.5 flex flex-wrap gap-2">
        {visibleStack.map((tool) => (
          <span key={`${project.title}-${tool}`} className="chip">
            <BrandIcon label={tool} className="text-[13px]" />
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <span key={`${project.title}-${tag}`} className="chip chip--accent">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3">
        {project.repoUrl ? (
          <Link href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80">
            {t.repo}
            <UiIcon name="arrow-up-right" className="text-[14px]" />
          </Link>
        ) : (
          <p className="text-xs font-medium tracking-[0.12em] text-muted">{t.hidden}</p>
        )}
      </div>
    </article>
  );
}
