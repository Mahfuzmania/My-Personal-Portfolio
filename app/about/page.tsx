import Image from "next/image";
import { BrainIcon, DatabaseIcon, SparkIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { aboutSummary, profile, skillGroups, workingPhilosophy } =
    await getPortfolioContent();
  const profilePhoto = profile.photoPath || "/images/mahfuzul-islam.jpg";
  const currentContext = [
    "Data Engineer at Enact Business Solution, focused on healthcare data workflows.",
    "Co-Founder at AZM Labs startup, shaping product direction and technical roadmap.",
    "Software Engineer at AZM Labs startup, building practical AI and data tooling modules.",
  ];

  return (
    <div className="space-y-14">
      <Reveal>
        <PageHero
          kicker="About"
          title="Engineer combining data systems, machine learning, and simulation"
          description="Personal profile spanning data engineering, applied AI, and engineering systems implementation."
        />
      </Reveal>

      <section className="section-shell p-5 md:p-6">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {aboutSummary.map((paragraph, idx) => (
            <Reveal key={paragraph} delay={idx * 0.05}>
              <p className="card p-6 text-sm leading-7 text-muted md:text-base">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal>
            <article className="card p-4">
              <div className="relative overflow-hidden rounded-xl border border-border">
                <Image
                  src={profilePhoto}
                  alt="Md. Mahfuzul Islam profile"
                  width={700}
                  height={820}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-accent-soft/60 p-3">
                  <DatabaseIcon className="h-7 w-7" />
                  <p className="mt-2 text-xs text-muted">Data</p>
                </div>
                <div className="rounded-xl border border-border bg-accent-soft/60 p-3">
                  <BrainIcon className="h-7 w-7" />
                  <p className="mt-2 text-xs text-muted">ML / AI</p>
                </div>
                <div className="rounded-xl border border-border bg-accent-soft/60 p-3">
                  <SparkIcon className="h-7 w-7" />
                  <p className="mt-2 text-xs text-muted">Systems</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Current Context"
            title="Current professional context"
            description="My present roles across industry work and startup building."
            icon={<SparkIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="card p-7">
          <ul className="list-disc space-y-3 pl-5 text-sm text-muted">
            {currentContext.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Technical Strengths"
            title="Core capability areas"
            description="Primary tools and systems across data, modeling, and delivery."
            icon={<DatabaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <Reveal key={group.title} delay={idx * 0.05}>
              <article className="card p-6">
                <h3 className="mb-3 text-lg font-semibold">{group.title}</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
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
            eyebrow="Working Philosophy"
            title="How I approach technical problem-solving"
            description="Clear standards for building reliable and practical systems."
            icon={<SparkIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="card p-7">
          <ul className="grid list-disc gap-3 pl-5 text-sm text-muted md:grid-cols-2">
            {workingPhilosophy.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card p-7">
        <p className="text-sm uppercase tracking-[0.16em] text-accent">Academic Background</p>
        <h2 className="section-title mt-2 text-2xl font-semibold">
          B.Sc. in Electrical and Electronic Engineering, Islamic University of Technology
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Grounded in power systems, control, simulation, and biomedical signal processing, with
          a strong transition into modern data and AI systems engineering.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
            href={profile.cvPath}
            target="_blank"
            rel="noreferrer"
          >
            View CV
          </a>
          <a
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
            href={profile.assessmentPath}
            target="_blank"
            rel="noreferrer"
          >
            Technical Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
