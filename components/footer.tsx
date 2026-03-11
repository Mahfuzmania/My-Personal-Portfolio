import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, GithubIcon, LinkedInIcon } from "@/components/logo-pack";
import { UiIcon } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";
import type { Profile } from "@/lib/site-data";

type FooterProps = {
  profile: Profile;
  lang?: SiteLang;
};

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-border/80">
      <div className="layout-container flex flex-col gap-5 py-7 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/azm-labs-logo.png"
            alt="AZM Labs logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg border border-border bg-surface p-1"
          />
          <div>
            <p>{`(c) ${new Date().getFullYear()} ${profile.name}. All rights reserved.`}</p>
            <p className="text-xs text-muted/90">Developed by AZM Labs.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          <Link href="/contact" className="inline-flex items-center gap-2 transition hover:text-accent">
            Contact
          </Link>
          <Link href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent">
            <GithubIcon className="h-6 w-6" />
            GitHub
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent">
            <LinkedInIcon className="h-6 w-6" />
            LinkedIn
          </Link>
          <Link href={profile.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent">
            <FacebookIcon className="h-6 w-6" />
            Facebook
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-accent/45 hover:text-accent"
          >
            <UiIcon name="settings" className="text-[13px]" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
