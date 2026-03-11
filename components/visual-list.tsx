import Image from "next/image";
import { UiIcon, type UiIconName } from "@/components/ui-icon";

type VisualListProps = {
  items: string[];
  imagePool: string[];
  icon?: UiIconName;
  columns?: "one" | "two";
  contextual?: boolean;
};

function inferIcon(item: string, fallback: UiIconName): UiIconName {
  const value = item.toLowerCase();

  if (value.includes("award") || value.includes("champion") || value.includes("scholarship") || value.includes("achievement")) return "award";
  if (value.includes("data") || value.includes("etl") || value.includes("healthcare") || value.includes("clinical")) return "data";
  if (value.includes("ai") || value.includes("llm") || value.includes("rag")) return "ai";
  if (value.includes("research") || value.includes("model") || value.includes("analysis") || value.includes("ml") || value.includes("survival")) return "analytics";
  if (value.includes("simulation") || value.includes("control") || value.includes("power") || value.includes("engineering")) return "simulation";
  if (value.includes("signal") || value.includes("image")) return "signal";
  if (value.includes("system") || value.includes("software")) return "layers";
  if (value.includes("integration") || value.includes("pipeline") || value.includes("workflow")) return "link";
  if (value.includes("documentation") || value.includes("publication")) return "book";

  return fallback;
}

export function VisualList({ items, imagePool, icon = "spark", columns = "two", contextual = true }: VisualListProps) {
  const gridClass = columns === "one" ? "grid gap-2" : "grid gap-2 md:grid-cols-2";

  return (
    <div className={gridClass}>
      {items.map((item, idx) => {
        const imageSrc = imagePool[idx % imagePool.length] ?? "/images/pipeline-depth.svg";
        const iconName = contextual ? inferIcon(item, icon) : icon;
        return (
          <article key={`${item}-${idx}`} className="group relative overflow-hidden rounded-xl border border-border bg-surface/72 p-2.5">
            <Image src={imageSrc} alt="" fill sizes="(max-width: 768px) 100vw, 420px" className="pointer-events-none object-cover opacity-[0.18] transition duration-300 group-hover:opacity-[0.26]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/94 via-background/88 to-background/72" />
            <div className="relative flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-accent-soft text-accent">
                <UiIcon name={iconName} className="text-[13px]" />
              </span>
              <p className="text-sm leading-[1.55] text-foreground/92">{item}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
