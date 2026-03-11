import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, icon }: SectionHeadingProps) {
  return (
    <div className="section-block max-w-[56rem]">
      {eyebrow ? (
        <div className="chip chip--accent max-w-full">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="truncate text-xs font-semibold uppercase tracking-[0.16em]">{eyebrow}</p>
        </div>
      ) : null}
      <div className="flex items-start gap-2.5">
        {icon ? <span className="mt-0.5 shrink-0 opacity-95">{icon}</span> : null}
        <h2 className="section-title clamp-heading max-w-[24ch] leading-tight tracking-tight">{title}</h2>
      </div>
      {description ? <p className="copy-text max-w-[62ch]">{description}</p> : null}
    </div>
  );
}
