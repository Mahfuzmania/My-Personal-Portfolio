import { BriefcaseIcon, SparkIcon } from "@/components/logo-pack";

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
  const isAzm = item.org === "AZM Labs";

  return (
    <article className="card p-6 md:p-7">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {isAzm ? <SparkIcon className="h-6 w-6" /> : <BriefcaseIcon className="h-6 w-6" />}
          {item.type}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{item.period}</span>
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
      <p className="mb-4 text-sm text-muted">{item.org}</p>
      <div className="accent-line mb-4" />
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
        {item.points.map((point) => (
          <li key={`${item.role}-${point}`}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
