import { DomainVisual } from "@/components/domain-visual";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getDomainVisualContent, type DomainVariant } from "@/lib/domain-visual-content";
import type { SiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

type DomainEvidenceFrameProps = {
  variant: DomainVariant;
  lang: SiteLang;
  title?: string;
  description?: string;
  rowsLimit?: number;
  className?: string;
};

export function DomainEvidenceFrame({
  variant,
  lang,
  title,
  description,
  rowsLimit,
  className = "card card-pad",
}: DomainEvidenceFrameProps) {
  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);
  const content = getDomainVisualContent(variant);
  const rows = content.rows.slice(0, rowsLimit ?? content.rows.length).map((row) => row[lang]);
  const metric = content.metric[lang];

  return (
    <article className={`${className} domain-evidence-frame domain-evidence-frame--${variant}`.trim()}>
      <div className="domain-evidence-frame__top grid gap-3.5 md:grid-cols-[minmax(340px,1.14fr)_minmax(0,0.86fr)] md:items-stretch">
        <div className="domain-evidence-frame__figure">
          <DomainVisual variant={variant} lang={lang} mode="media" />
        </div>
        <div className="domain-evidence-frame__content min-w-0">
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">{tr(title ?? content.title[lang])}</h3>
          {description ? <p className="mt-2 text-sm text-muted md:text-base">{tr(description)}</p> : null}
          <p className="domain-evidence-frame__metric mt-3 inline-flex rounded-xl border border-accent/24 bg-surface/70 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{tr(metric)}</p>
        </div>
      </div>
      <div className="domain-evidence-frame__proof mt-3 flex flex-wrap gap-2">
        {rows.map((row) => (
          <span key={`${variant}-${row}`} className="domain-evidence-frame__row rounded-xl border border-border bg-surface/70 px-3 py-2 text-sm text-muted">
            {tr(row)}
          </span>
        ))}
      </div>
    </article>
  );
}
