import Link from "next/link";
import { GithubIcon, LinkedInIcon, MailIcon } from "@/components/logo-pack";
import type { Profile } from "@/lib/site-data";

type FooterProps = {
  profile: Profile;
};

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>(c) {new Date().getFullYear()} Md. Mahfuzul Islam | AZM Labs Startup</p>
        <div className="flex items-center gap-4">
          <Link
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition hover:text-accent"
          >
            <MailIcon className="h-7 w-7" />
            Email
          </Link>
          <Link
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-accent"
          >
            <GithubIcon className="h-7 w-7" />
            GitHub
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-accent"
          >
            <LinkedInIcon className="h-7 w-7" />
            LinkedIn
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
