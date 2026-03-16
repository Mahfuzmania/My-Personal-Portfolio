import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, GithubIcon, GoogleScholarIcon, LinkedInIcon, ResearchGateIcon } from "@/components/logo-pack";
import { UiIcon } from "@/components/ui-icon";
import type { SiteLang } from "@/lib/lang";
import type { Profile } from "@/lib/site-data";

type FooterProps = {
  profile: Profile;
  lang?: SiteLang;
};

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="layout-container layout-container--header site-footer__inner">
        <div className="site-footer__brand">
          <Image
            src="/images/azm-labs-logo.png"
            alt="AZM Labs logo"
            width={44}
            height={44}
            className="site-footer__logo"
          />
          <div>
            <p className="site-footer__copyright">{`(c) ${new Date().getFullYear()} ${profile.name}. All rights reserved.`}</p>
            <p className="site-footer__credit">Developed by AZM Labs.</p>
          </div>
        </div>

        <div className="site-footer__actions">
          <div className="site-footer__links">
            <Link href="/contact" className="site-footer__link site-footer__link--plain">
            Contact
            </Link>
            <Link href="/sitemap.xml" className="site-footer__link site-footer__link--plain">
            Sitemap
            </Link>
            <Link href={profile.github} target="_blank" rel="noreferrer" className="site-footer__link">
              <GithubIcon className="h-6 w-6" />
            GitHub
            </Link>
            <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="site-footer__link">
              <LinkedInIcon className="h-6 w-6" />
            LinkedIn
            </Link>
            <Link href={profile.facebook} target="_blank" rel="noreferrer" className="site-footer__link">
              <FacebookIcon className="h-6 w-6" />
            Facebook
            </Link>
            {profile.googleScholar ? (
              <Link href={profile.googleScholar} target="_blank" rel="noreferrer" className="site-footer__link">
                <GoogleScholarIcon className="h-6 w-6" />
              Google Scholar
              </Link>
            ) : null}
            {profile.researchGate ? (
              <Link href={profile.researchGate} target="_blank" rel="noreferrer" className="site-footer__link">
                <ResearchGateIcon className="h-6 w-6" />
              ResearchGate
              </Link>
            ) : null}
          </div>

          <Link
            href="/admin"
            className="site-footer__admin"
          >
            <UiIcon name="settings" className="text-[13px]" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
