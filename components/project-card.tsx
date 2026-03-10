import Link from "next/link";
import { createElement } from "react";
import { getProjectCategoryIcon, getToolIcon } from "@/components/project-icons";
import type { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const visibleStack = compact ? project.stack.slice(0, 4) : project.stack;
  const visibleTags = compact ? project.tags.slice(0, 4) : project.tags;
  const compactDetail =
    compact && project.detail
      ? `${project.detail.slice(0, 140)}${project.detail.length > 140 ? "..." : ""}`
      : null;

  return (
    <article className="card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_20px_32px_-26px_rgba(16,52,94,0.45)] md:p-7">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        {createElement(getProjectCategoryIcon(project.category), {
          className: "h-3.5 w-3.5 text-accent",
          "aria-hidden": true,
        })}
        <span>{project.category}</span>
        {project.featured ? (
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-accent">
            Featured
          </span>
        ) : null}
        {project.privateRepo ? (
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] tracking-[0.16em]">
            Private
          </span>
        ) : null}
      </div>

      <h3 className="mb-3 text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mb-4 text-sm leading-6 text-muted">{project.summary}</p>
      {compactDetail ? <p className="mb-4 text-sm leading-6 text-muted">{compactDetail}</p> : null}

      {project.detail && !compact ? (
        <p className="mb-4 text-sm leading-6 text-muted">{project.detail}</p>
      ) : null}
      <div className="accent-line mb-4" />

      <div className="mb-4 flex flex-wrap gap-2">
        {visibleStack.map((tool) => {
          const ToolIcon = getToolIcon(tool);
          return (
            <span
              key={`${project.title}-${tool}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {createElement(ToolIcon, { className: "h-3.5 w-3.5 text-accent", "aria-hidden": true })}
              {tool}
            </span>
          );
        })}
      </div>

      {project.contributions?.length && !compact ? (
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {project.contributions.slice(0, 3).map((point) => (
            <li key={`${project.title}-${point}`}>{point}</li>
          ))}
        </ul>
      ) : null}

      {project.impact && !compact ? (
        <p className="mb-4 border-l-2 border-accent/50 pl-3 text-sm text-muted">
          {project.impact}
        </p>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <span
            key={`${project.title}-${tag}`}
            className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-foreground/90"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-2">
        {project.repoUrl ? (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
          >
            View Repository
            <span aria-hidden>{"->"}</span>
          </Link>
        ) : (
          <p className="text-xs font-medium tracking-[0.15em] text-muted">
            Private implementation details are not published.
          </p>
        )}
      </div>
    </article>
  );
}
