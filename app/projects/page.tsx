import { PageHero } from "@/components/page-hero";
import { CircuitIcon, SparkIcon } from "@/components/logo-pack";
import { ProjectsBrowser } from "@/components/projects-browser";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { featuredProjects, projects } = await getPortfolioContent();

  return (
    <div className="space-y-14">
      <Reveal>
        <PageHero
          kicker="Projects"
          title="Projects across AI systems, data engineering, and simulation"
          description="A personal project portfolio combining public repositories with selected private technical work."
        />
      </Reveal>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title="Major project anchors"
            description="Flagship projects representing my strongest implementation depth."
            icon={<SparkIcon className="h-8 w-8" />}
          />
        </Reveal>
        <div className="section-shell p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.title} delay={idx * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="All Projects"
            title="Browse by technical category"
            description="Filter to explore each technical area."
            icon={<CircuitIcon className="h-8 w-8" />}
          />
        </Reveal>
        <ProjectsBrowser projects={projects} />
      </section>
    </div>
  );
}
