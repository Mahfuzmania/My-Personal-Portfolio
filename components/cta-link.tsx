import Link from "next/link";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
};

export function CtaLink({ href, children, secondary = false, external = false }: CtaLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-[0.01em] transition ${
        secondary
          ? "border border-border bg-surface text-foreground hover:border-accent/40 hover:text-accent"
          : "bg-[linear-gradient(92deg,#1a3e72_0%,#1f4f8c_52%,#2b6aa8_100%)] text-white shadow-[0_12px_24px_-16px_rgba(20,61,110,0.7)] hover:-translate-y-0.5 hover:opacity-95"
      }`}
    >
      {children}
    </Link>
  );
}
