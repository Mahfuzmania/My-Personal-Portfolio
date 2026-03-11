import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
  actions?: ReactNode;
};

export function PageHero({ title, description, kicker, actions }: PageHeroProps) {
  return (
    <section className="hero-panel relative overflow-hidden p-[clamp(1rem,0.8rem+0.9vw,1.45rem)] md:p-[clamp(1.2rem,1rem+0.95vw,1.7rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-35" />
      <div className="section-block relative max-w-4xl">
        {kicker ? (
          <div className="chip chip--accent max-w-full">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em]">{kicker}</p>
          </div>
        ) : null}
        <h1 className="section-title clamp-heading max-w-[23ch] leading-tight tracking-tight">{title}</h1>
        <p className="copy-text">{description}</p>
        <div className="accent-line" />
        {actions ? <div className="section-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
