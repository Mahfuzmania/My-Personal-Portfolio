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
    <article className={className}>
      <div className="grid gap-4 md:grid-cols-[minmax(260px,0.95fr)_minmax(0,1.05fr)] md:items-start">
        <DomainVisual variant={variant} lang={lang} mode="media" />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">{tr(title ?? content.title[lang])}</h3>
          {description ? <p className="mt-2 text-sm text-muted md:text-base">{tr(description)}</p> : null}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {rows.map((row) => (
              <span key={`${variant}-${row}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2 text-sm text-muted">
                {tr(row)}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-xl border border-accent/24 bg-surface/70 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{tr(metric)}</p>
        </div>
      </div>
    </article>
  );
}
