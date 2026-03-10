import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { ExperienceCard } from "@/components/experience-card";
import {
  BrainIcon,
  BriefcaseIcon,
  CircuitIcon,
  DatabaseIcon,
  SparkIcon,
  TrophyIcon,
} from "@/components/logo-pack";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { experience, featuredProjects, highlights, profile, technicalFocus } =
    await getPortfolioContent();
  const currentPositions = experience
    .filter((item) => item.period.toLowerCase().includes("present"))
    .slice(0, 3);

  const profilePhoto = profile.photoPath || "/images/mahfuzul-islam.jpg";
  const focusIcons = [DatabaseIcon, BrainIcon, CircuitIcon, SparkIcon];
  const workStyle = [
    {
      title: "Frame the Technical Problem",
      detail: "Define constraints, data quality risks, and expected outcomes before implementation.",
    },
    {
      title: "Build Reproducible Systems",
      detail: "Implement structured pipelines and modular components that are maintainable and testable.",
    },
    {
      title: "Validate and Iterate",
      detail: "Use measurable checks, simulation/model feedback, and clear documentation to refine delivery.",
    },
  ];

  return (
    <div className="space-y-16">
      <Reveal>
        <section className="hero-panel grid gap-8 p-7 md:grid-cols-[1.15fr_0.85fr] md:p-10">
          <div className="hero-ribbon col-span-full px-4 py-2 text-center text-xs font-semibold tracking-[0.08em]">
            Personal Technical Portfolio  |  Data Engineering  |  Applied ML
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Md. Mahfuzul Islam
            </p>
            <h1 className="section-title max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              {profile.identityLine}
            </h1>
            <p className="measure mt-4 max-w-2xl text-base text-muted md:text-lg">{profile.shortIntro}</p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded-full border border-border bg-surface px-3 py-1">
                Data Engineer, Enact Business Solution
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1">
                Co-Founder, AZM Labs Startup
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1">
                Software Engineer, AZM Labs Startup
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <CtaLink href="/projects">View Projects</CtaLink>
              <CtaLink href={profile.resumePath} secondary external>
                Download Resume
              </CtaLink>
              <CtaLink href={profile.github} secondary external>
                GitHub
              </CtaLink>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <article className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Featured</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{featuredProjects.length}</p>
              </article>
              <article className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Focus Areas</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{technicalFocus.length}</p>
              </article>
              <article className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Current Roles</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {experience.filter((item) => item.period.includes("Present")).length}
                </p>
              </article>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-[0_20px_40px_-28px_rgba(16,52,94,0.55)]">
              <Image
                src={profilePhoto}
                alt="Portrait of Md. Mahfuzul Islam"
                width={640}
                height={760}
                className="h-auto w-full rounded-xl object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/20" />
              <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-surface/95 px-3 py-2 text-xs shadow-sm">
                <p className="font-semibold text-foreground">Dhaka, Bangladesh</p>
                <p className="text-muted">Open to global collaboration</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected work across AI, data engineering, and simulation"
            description="Personally built projects from public repositories and production-focused private work."
            icon={<CircuitIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.slice(0, 4).map((project, idx) => (
              <Reveal key={project.title} delay={idx * 0.05}>
                <ProjectCard project={project} compact />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <CtaLink href="/projects" secondary>
            View All Projects
          </CtaLink>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Technical Focus"
            title="Core technical focus"
            description="Data infrastructure, applied machine learning, and engineering software."
            icon={<DatabaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {technicalFocus.map((focus, idx) => {
              const FocusIcon = focusIcons[idx];
              return (
                <Reveal key={focus.title} delay={idx * 0.05}>
                  <article className="card p-6">
                    <div className="mb-3 flex items-center gap-3">
                      {FocusIcon ? <FocusIcon className="h-8 w-8" /> : null}
                      <h3 className="text-xl font-semibold tracking-tight">{focus.title}</h3>
                    </div>
                    <p className="text-sm text-muted">{focus.detail}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <CtaLink href="/research" secondary>
            Explore Research Work
          </CtaLink>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="How I Work"
            title="Personal engineering workflow"
            description="A practical execution approach from problem definition to validated delivery."
            icon={<SparkIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {workStyle.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.05}>
              <article className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Experience Snapshot"
            title="Current positions"
            icon={<BriefcaseIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-4">
            {currentPositions.map((item, idx) => (
              <Reveal key={`${item.role}-${item.period}`} delay={idx * 0.05}>
                <ExperienceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <CtaLink href="/experience" secondary>
            View Full Experience
          </CtaLink>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading eyebrow="Highlights" title="Selected outcomes" icon={<TrophyIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="card p-7">
          <ul className="grid gap-3 md:grid-cols-2">
            {highlights.slice(0, 4).map((item) => (
              <li key={item} className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
          <div className="accent-line mt-7" />
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink href="/contact">Let&apos;s Collaborate</CtaLink>
            <CtaLink href="/about" secondary>
              Read About Me
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
}
