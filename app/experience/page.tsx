import { BriefcaseIcon, GraduationIcon, SparkIcon, TrophyIcon } from "@/components/logo-pack";
import { ExperienceCard } from "@/components/experience-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const { achievementItems, education, experience, training } = await getPortfolioContent();
  const azmLabsExperience = experience.filter((item) => item.org === "AZM Labs");
  const nonAzmExperience = experience.filter((item) => item.org !== "AZM Labs");

  return (
    <div className="space-y-14">
      <Reveal>
        <PageHero
          kicker="Experience"
          title="Professional, leadership, and academic trajectory"
          description="Timeline across data engineering, software development, leadership, and research."
        />
      </Reveal>

      {azmLabsExperience.length ? (
        <section>
          <Reveal>
            <SectionHeading
              eyebrow="AZM Labs"
              title="Startup leadership and engineering work"
              description="Product direction and software development at AZM Labs startup."
              icon={<SparkIcon className="h-8 w-8" />}
            />
          </Reveal>
          <div className="section-shell p-5 md:p-6">
            <div className="grid gap-4">
              {azmLabsExperience.map((item, idx) => (
                <Reveal key={`${item.role}-${item.period}`} delay={idx * 0.05}>
                  <ExperienceCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Professional Experience"
            title="Industry and research roles"
            icon={<BriefcaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-4">
            {nonAzmExperience.map((item, idx) => (
              <Reveal key={`${item.role}-${item.period}`} delay={idx * 0.05}>
                <ExperienceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title="Academic foundation"
            icon={<GraduationIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="grid gap-4">
          {education.map((item, idx) => (
            <Reveal key={`${item.degree}-${item.period}`} delay={idx * 0.05}>
              <article className="card p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Education
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.degree}</h3>
                <p className="mb-4 text-sm text-muted">{item.institution}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                  {item.details.map((detail) => (
                    <li key={`${item.degree}-${detail}`}>{detail}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Training"
            title="Industrial and technical training"
            icon={<BriefcaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="grid gap-4">
          {training.map((item, idx) => (
            <Reveal key={`${item.organization}-${item.period}`} delay={idx * 0.05}>
              <article className="card p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Training
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mb-4 text-sm text-muted">{item.organization}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                  {item.details.map((detail) => (
                    <li key={`${item.organization}-${detail}`}>{detail}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="card p-7">
        <Reveal>
          <SectionHeading
            eyebrow="Achievements"
            title="Selected achievements and recognitions"
            icon={<TrophyIcon className="h-8 w-8" />}
          />
        </Reveal>
        <ul className="list-disc space-y-3 pl-5 text-sm text-muted">
          {achievementItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
