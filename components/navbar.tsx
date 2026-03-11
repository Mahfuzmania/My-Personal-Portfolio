"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { UiIcon, type UiIconName } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";
import { navItems, type Profile } from "@/lib/site-data";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

type NavbarProps = {
  profile: Profile;
  lang: SiteLang;
  roleLine: string;
};

const navIconMap: Record<string, UiIconName> = {
  "/": "home",
  "/about": "user",
  "/projects": "layers",
  "/research": "research",
  "/experience": "briefcase",
  "/resume": "resume",
  "/blog": "book",
  "/contact": "contact",
};

const navLabels: Record<SiteLang, Record<string, string>> = {
  en: {
    "/": "Home",
    "/about": "Profile",
    "/projects": "Projects",
    "/research": "Research",
    "/experience": "Experience",
    "/resume": "CV / Resume",
    "/blog": "Blog",
    "/contact": "Contact",
  },
  bn: {
    "/": "হোম",
    "/about": "প্রোফাইল",
    "/projects": "প্রজেক্টস",
    "/research": "রিসার্চ",
    "/experience": "অভিজ্ঞতা",
    "/resume": "সিভি / রেজিউমে",
    "/blog": "ব্লগ",
    "/contact": "যোগাযোগ",
  },
};

export function Navbar({ profile, lang, roleLine }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const displayName = lang === "bn" ? "মোঃ মাহফুজুল ইসলাম" : profile.name;
  const portfolioLabel = lang === "bn" ? "মাই পোর্টফোলিও" : "My Portfolio";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/55 bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="layout-container layout-container--header py-2 md:py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <Link href="/" className="group min-w-0" onClick={() => setMobileOpen(false)}>
            <p className="truncate text-[0.95rem] font-semibold tracking-tight text-foreground md:text-[1rem]">{displayName}</p>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-accent">{portfolioLabel}</p>
            <p className="max-w-[42ch] truncate text-[0.82rem] text-muted transition group-hover:text-foreground/84">{roleLine}</p>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle withLabel lang={lang} />
            </div>
            <div className="md:hidden">
              <ThemeToggle lang={lang} />
            </div>

            <div className="hidden md:block">
              <LanguageToggle initialLang={lang} withLabel />
            </div>
            <div className="md:hidden">
              <LanguageToggle initialLang={lang} />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-primary-nav"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-accent/40 hover:text-foreground md:hidden"
            >
              <UiIcon name={mobileOpen ? "close" : "menu"} className="text-[16px]" />
            </button>
          </div>
        </div>

        <nav aria-label="Primary" className="no-scrollbar mt-2 hidden w-full overflow-x-auto md:block">
          <div className="inline-flex min-w-full items-center justify-center gap-1.5 rounded-2xl p-0">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const label = navLabels[lang][item.href] ?? item.label;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-[0.74rem] py-[0.32rem] text-[0.84rem] font-semibold tracking-[0.01em] transition ${
                    active
                      ? "border-accent/50 bg-accent-soft text-foreground shadow-[0_10px_18px_-15px_rgba(20,61,110,0.75)]"
                      : "border-transparent text-foreground/86 hover:border-accent/30 hover:bg-surface/92 hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        <nav id="mobile-primary-nav" aria-label="Mobile primary" className={`${mobileOpen ? "mt-3 block" : "hidden"} md:hidden`}>
          <div className="grid gap-2 rounded-2xl border border-border bg-surface/94 p-2.5">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const iconName = navIconMap[item.href] ?? "layers";
              const label = navLabels[lang][item.href] ?? item.label;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "border-accent/50 bg-accent-soft text-foreground"
                      : "border-border text-muted hover:border-accent/35 hover:text-foreground"
                  }`}
                >
                  <UiIcon name={iconName} className="text-[14px] text-accent" />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
