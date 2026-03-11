"use client";

import { useState } from "react";
import { UiIcon } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";

type LanguageToggleProps = {
  initialLang: SiteLang;
  withLabel?: boolean;
};

export function LanguageToggle({ initialLang, withLabel = false }: LanguageToggleProps) {
  const [lang, setLang] = useState<SiteLang>(initialLang);

  const toggleLang = () => {
    const next: SiteLang = lang === "en" ? "bn" : "en";
    setLang(next);
    document.documentElement.setAttribute("lang", next);
    document.documentElement.setAttribute("data-lang", next);
    document.cookie = `portfolio-lang=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  const ariaLabel = lang === "en" ? "Switch language to Bengali" : "Switch language to English";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-accent/45 hover:text-foreground ${
        withLabel ? "h-9 gap-2 px-3.5 text-sm font-medium" : "h-9 w-9"
      }`}
    >
      <UiIcon name="language" className="text-[17px]" />
      {withLabel ? <span>{lang === "en" ? "বাংলা" : "English"}</span> : null}
    </button>
  );
}
