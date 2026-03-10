import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
  actions?: ReactNode;
};

export function PageHero({ title, description, kicker, actions }: PageHeroProps) {
  return (
    <section className="hero-panel mb-14 p-7 md:p-10">
      {kicker ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {kicker}
        </p>
      ) : null}
      <h1 className="section-title max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="measure mt-4 max-w-3xl text-base text-muted md:text-lg">{description}</p>
      <div className="accent-line mt-6" />
      {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
    </section>
  );
}
