import Link from "next/link";
import type { ReactNode } from "react";
import { UiIcon } from "@/components/ui-icon";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
};

export function CtaLink({ href, children, secondary = false, external = false }: CtaLinkProps) {
  const icon = external ? "arrow-up-right" : "arrow-right";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-[0.01em] transition duration-200 ${
        secondary
          ? "border border-border/90 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_96%,transparent),color-mix(in_srgb,var(--surface)_84%,transparent))] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:border-accent/44 hover:text-accent"
          : "border border-accent/45 bg-[linear-gradient(102deg,#1a3d70_0%,#1f4f8d_52%,#2866a4_100%)] text-white shadow-[0_14px_26px_-18px_rgba(20,61,110,0.78),inset_0_1px_0_rgba(255,255,255,0.22)] hover:-translate-y-0.5 hover:shadow-[0_20px_32px_-20px_rgba(20,61,110,0.9),inset_0_1px_0_rgba(255,255,255,0.26)]"
      }`}
    >
      <span>{children}</span>
      <UiIcon name={icon} className={`ml-2 text-[15px] transition-transform duration-200 ${secondary ? "opacity-80" : "opacity-95 group-hover:translate-x-0.5"}`} />
    </Link>
  );
}
