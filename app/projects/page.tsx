import { PageHero } from "@/components/page-hero";
import { StrategyIcon, WorkflowIcon } from "@/components/logo-pack";
import { ProjectsBrowser } from "@/components/projects-browser";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { featuredProjects, projects } = await getPortfolioContent();
  const lang = await getSiteLang();
  const visibleFeaturedProjects = featuredProjects.filter((project) => project.publishState !== "draft" && project.visibility !== "private");
  const featuredKeys = new Set(visibleFeaturedProjects.map((project) => project.slug ?? project.title));
  const seenProjectKeys = new Set<string>();
  const visibleProjects = projects.filter((project) => {
    if (project.publishState === "draft" || project.visibility === "private") return false;
    const key = project.slug ?? project.title;
    if (featuredKeys.has(key)) return false;
    if (seenProjectKeys.has(key)) return false;
    seenProjectKeys.add(key);
    return true;
  });
  const t = {
    hero: {
      kicker: lang === "bn" ? "প্রজেক্টস" : "Projects",
      title:
        lang === "bn"
          ? "এআই, ডেটা ইঞ্জিনিয়ারিং এবং সিমুলেশন-কেন্দ্রিক ব্যক্তিগত প্রজেক্ট পোর্টফোলিও"
          : "Data engineering, applied AI, platform engineering, and simulation projects",
      description:
        lang === "bn"
          ? "পাবলিক রিপোজিটরি এবং প্রাইভেট ইমপ্লিমেন্টেশন থেকে বাছাই করা কাজ।"
          : "Selected implementations from public repositories and private production work.",
    },
    featured: {
      eyebrow: lang === "bn" ? "ফিচার্ড" : "Featured",
      title: lang === "bn" ? "নির্বাচিত প্রজেক্ট" : "Selected projects",
      description:
        lang === "bn"
          ? "মূল কাজগুলো দ্রুত দেখার জন্য সংক্ষিপ্তভাবে উপস্থাপন।"
          : "A concise view of the strongest implementations.",
    },
    all: {
      eyebrow: lang === "bn" ? "সব প্রজেক্ট" : "All Projects",
      title: lang === "bn" ? "ক্যাটাগরি অনুযায়ী ব্রাউজ করুন" : "Browse by domain and method",
      description:
        lang === "bn"
          ? "ডোমেইন ও মেথড অনুযায়ী প্রজেক্ট ফিল্টার করে দেখুন।"
          : "Use filters to quickly find relevant project categories.",
    },
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} description={t.featured.description} icon={<StrategyIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {visibleFeaturedProjects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 0.05}>
              <ProjectCard project={project} compact lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.all.eyebrow} title={t.all.title} description={t.all.description} icon={<WorkflowIcon className="h-8 w-8" />} />
        </Reveal>
        <ProjectsBrowser projects={visibleProjects} lang={lang} />
      </section>
    </div>
  );
}
