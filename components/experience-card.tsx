type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  type: string;
  points: string[];
};

type ExperienceCardProps = {
  item: ExperienceItem;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="card relative card-pad">
      <span className="timeline-dot" aria-hidden />
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="chip chip--accent text-[0.68rem] font-semibold uppercase tracking-[0.14em]">{item.type}</span>
        <span className="meta-label">{item.period}</span>
      </div>
      <h3 className="mt-2.5 text-lg font-semibold tracking-tight">{item.role}</h3>
      <p className="mt-1 text-sm text-muted">{item.org}</p>
      <ul className="mt-3.5 space-y-2 text-sm text-muted">
        {item.points.map((point) => (
          <li key={`${item.role}-${point}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
            <span className="inline-flex items-start gap-2">
              <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{point}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
