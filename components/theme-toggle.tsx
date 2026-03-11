"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { UiIcon } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  withLabel?: boolean;
  lang?: SiteLang;
};

const storageKey = "portfolio-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribeThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
        callback();
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => observer.disconnect();
}

export function ThemeToggle({ withLabel = false, lang = "en" }: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme>(subscribeThemeChange, readTheme, () => "dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Render once on client before reading user-applied theme to avoid SSR hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const current = readTheme();
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(storageKey, next);
  };

  const effectiveTheme = mounted ? theme : "dark";
  const switchingToLight = effectiveTheme === "dark";

  const label =
    lang === "bn"
      ? switchingToLight
        ? "লাইট মোড"
        : "ডার্ক মোড"
      : switchingToLight
        ? "Light mode"
        : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-accent/45 hover:text-foreground ${
        withLabel ? "h-9 gap-2 px-3.5 text-sm font-medium" : "h-9 w-9"
      }`}
    >
      {switchingToLight ? <UiIcon name="sun" className="text-[17px]" /> : <UiIcon name="moon" className="text-[17px]" />}
      {withLabel ? <span>{label}</span> : null}
    </button>
  );
}
