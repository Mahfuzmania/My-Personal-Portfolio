import { CtaLink } from "@/components/cta-link";
import { BriefcaseIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getPortfolioContent } from "@/lib/content-service";

const summaryPoints = [
  "Data Engineer experienced in healthcare data workflows for large, multi-source datasets.",
  "EEE graduate with applied work in machine learning, simulation, and signal/data-driven systems.",
  "Co-Founder and Software Engineer at AZM Labs startup.",
];

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const { profile, skillGroups } = await getPortfolioContent();

  return (
    <div className="space-y-14">
      <Reveal>
        <PageHero
          kicker="CV / Resume"
          title="Profile summary and downloadable documents"
          description="Skills, experience, and technical direction."
          actions={
            <>
              <CtaLink href={profile.resumePath} external>
                Download Resume
              </CtaLink>
              <CtaLink href={profile.cvPath} secondary external>
                Download CV
              </CtaLink>
            </>
          }
        />
      </Reveal>

      <section className="card p-7">
        <div className="mb-4 flex items-center gap-3">
          <BriefcaseIcon className="h-8 w-8" />
          <h2 className="section-title text-2xl font-semibold">Profile Summary</h2>
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted">
          {summaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="card p-6">
            <div className="mb-3 flex items-center gap-2">
              <DatabaseIcon className="h-7 w-7" />
              <h3 className="text-lg font-semibold">{group.title}</h3>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
