import { BrainIcon, CircuitIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";

const technicalInterests = [
  "Applied AI for domain-specific technical workflows",
  "Healthcare analytics with high-integrity datasets",
  "Survival and risk modeling for clinical insights",
  "Electrical drive control and system optimization",
];

const explorations = [
  "Bilingual technical assistant design for EE education (RAG + citation workflow)",
  "Controller tuning comparison strategies (series PI, IMC, manual)",
  "Signal and anomaly processing workflows for engineering datasets",
  "Practical bridges between modeling notebooks and deployable systems",
];

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const { researchThemes } = await getPortfolioContent();

  return (
    <div className="space-y-14">
      <Reveal>
        <PageHero
          kicker="Research / Technical Work"
          title="Implementation-focused research across data, AI, and engineering systems"
          description="Personal technical explorations connecting research thinking with implementable systems."
        />
      </Reveal>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Technical Interests"
            title="Current areas of concentration"
            icon={<BrainIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="card p-7">
          <ul className="grid list-disc gap-3 pl-5 text-sm text-muted md:grid-cols-2">
            {technicalInterests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Applied Research Themes"
            title="Research themes"
            description="Themes connecting analytical methods with deployable systems."
            icon={<DatabaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {researchThemes.map((theme, idx) => (
              <Reveal key={theme} delay={idx * 0.05}>
                <article className="card p-6">
                  <p className="text-sm text-muted">{theme}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Selected Technical Explorations"
            title="Selected explorations"
            icon={<CircuitIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="card p-7">
            <ul className="list-disc space-y-3 pl-5 text-sm text-muted">
              {explorations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
