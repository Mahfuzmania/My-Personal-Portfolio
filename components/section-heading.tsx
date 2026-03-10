import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <h2 className="section-title text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="measure mt-3 text-base text-muted">{description}</p>
      ) : null}
    </div>
  );
}
