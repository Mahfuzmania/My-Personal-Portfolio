"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems, type Profile } from "@/lib/site-data";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

type NavbarProps = {
  profile: Profile;
};

export function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/85 glass">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
        <Link href="/" className="group w-fit">
          <p className="text-sm font-semibold tracking-tight">{profile.name}</p>
          <p className="text-xs text-muted transition group-hover:text-accent">
            Data Engineer at Enact | AZM Labs Startup
          </p>
        </Link>

        <nav
          aria-label="Primary"
          className="nav-scroll flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-surface/95 p-1.5 shadow-[0_12px_30px_-24px_rgba(17,53,98,0.35)] md:w-auto"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition sm:text-sm ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
