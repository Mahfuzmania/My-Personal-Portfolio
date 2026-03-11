import { CtaLink } from "@/components/cta-link";
import { DomainVisual } from "@/components/domain-visual";
import { BrandIcon } from "@/components/brand-icon";
import { BriefcaseIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { VisualList } from "@/components/visual-list";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const { profile, skillGroups, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const summaryPoints = uiContent.resume.summaryPoints[lang];
  const resumeVisuals = ["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/placeholders/project-ml.svg"];

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero
          kicker={lang === "bn" ? "সিভি / রেজিউমে" : "CV / Resume"}
          title={lang === "bn" ? "প্রোফাইল সামারি ও ডাউনলোডযোগ্য ডকুমেন্ট" : "Professional summary and downloadable documents"}
          description={lang === "bn" ? "দক্ষতা, অভিজ্ঞতা এবং টেকনিক্যাল ফোকাস।" : "Skills, experience, and execution focus in one place."}
          actions={
            <>
              <CtaLink href={profile.resumePath} external>
                {lang === "bn" ? "রেজিউমে ডাউনলোড" : "Download Resume"}
              </CtaLink>
              <CtaLink href={profile.cvPath} secondary external>
                {lang === "bn" ? "সিভি ডাউনলোড" : "Download CV"}
              </CtaLink>
            </>
          }
        />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <article className="card card-pad">
            <div className="mb-4 flex items-center gap-3">
              <BriefcaseIcon className="h-8 w-8" />
              <h2 className="section-title text-2xl font-semibold">{lang === "bn" ? "প্রোফাইল সামারি" : "Professional Summary"}</h2>
            </div>
            <div className="mt-4">
              <VisualList items={summaryPoints} imagePool={resumeVisuals} icon="briefcase" columns="one" />
            </div>
          </article>

          <article className="card h-fit card-pad">
            <DomainVisual variant="data" lang={lang} />
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="card h-full card-pad">
              <div className="mb-3 flex items-center gap-2">
                <DatabaseIcon className="h-7 w-7" />
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    <BrandIcon label={item} className="text-[13px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

