import Image from "next/image";
import type { SiteLang } from "@/lib/lang";
import { UiIcon } from "@/components/ui-icon";
import { getDomainVisualContent, type DomainVariant } from "@/lib/domain-visual-content";

type DomainVisualProps = {
  variant: DomainVariant;
  lang?: SiteLang;
  mode?: "full" | "media";
};

export function DomainVisual({ variant, lang = "en", mode = "full" }: DomainVisualProps) {
  const item = getDomainVisualContent(variant);
  const media = (
    <div className={`domain-visual__media ${mode === "media" ? "domain-visual__media--clean" : ""}`}>
      <Image src={item.image} alt={item.imageAlt[lang]} fill className="domain-visual__image" sizes="(max-width: 768px) 100vw, 420px" />
      <div className={`domain-visual__veil ${mode === "media" ? "domain-visual__veil--media" : ""}`} />
      {mode === "full" ? (
        <div className="domain-visual__header">
          <span className="domain-visual__icon-frame">
            <UiIcon name={item.icon} className="text-[15px]" />
          </span>
          <p className="domain-visual__title">{item.title[lang]}</p>
        </div>
      ) : null}
    </div>
  );

  if (mode === "media") {
    return <div className="domain-media">{media}</div>;
  }

  return (
    <div className="domain-visual">
      {media}
      <div className="domain-visual__rows">
        {item.rows.map((row) => (
          <div key={`${variant}-${row.en}`} className="domain-visual__row">
            <span className="domain-visual__dot" />
            <span>{row[lang]}</span>
          </div>
        ))}
      </div>
      <p className="domain-visual__metric">{item.metric[lang]}</p>
    </div>
  );
}
