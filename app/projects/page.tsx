import { DomainVisual } from "@/components/domain-visual";
import { PageHero } from "@/components/page-hero";
import { BadgeIcon, StrategyIcon, WorkflowIcon } from "@/components/logo-pack";
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

  const t = {
    hero: {
      kicker: lang === "bn" ? "প্রজেক্টস" : "Projects",
      title:
        lang === "bn"
          ? "এআই, ডেটা ইঞ্জিনিয়ারিং এবং সিমুলেশন-কেন্দ্রিক ব্যক্তিগত প্রজেক্ট পোর্টফোলিও"
          : "AI, data engineering, and simulation projects with real implementation depth",
      description:
        lang === "bn"
          ? "পাবলিক রিপোজিটরি এবং প্রাইভেট ইমপ্লিমেন্টেশন থেকে বাছাই করা কাজ।"
          : "A curated mix of public projects and private delivery work with practical engineering outcomes.",
    },
    lens: {
      label: lang === "bn" ? "পোর্টফোলিও দৃষ্টিভঙ্গি" : "Portfolio Lens",
      title: lang === "bn" ? "হাইপ নয়, ইমপ্লিমেন্টেশন" : "Execution over buzzwords",
      description:
        lang === "bn"
          ? "প্রতিটি প্রজেক্টে সমস্যা, পদ্ধতি এবং পরিমাপযোগ্য ফলাফলে ফোকাস রাখা হয়েছে।"
          : "Each project is framed around a real technical problem, a concrete method, and measurable results.",
    },
    types: {
      label: lang === "bn" ? "প্রজেক্ট টাইপস" : "Project Types",
      title: lang === "bn" ? "গবেষণা থেকে সফটওয়্যার" : "From research to deployable systems",
      description:
        lang === "bn"
          ? "AI tools, healthcare data, survival analysis, signal processing এবং simulation-driven engineering রয়েছে।"
          : "Covers AI tooling, healthcare data systems, survival analysis, signal processing, and simulation-led engineering delivery.",
    },
    featured: {
      eyebrow: lang === "bn" ? "ফিচার্ড" : "Featured",
      title: lang === "bn" ? "মূল প্রজেক্ট অ্যাঙ্কর" : "Flagship project anchors",
      description:
        lang === "bn"
          ? "সবচেয়ে শক্তিশালী ইমপ্লিমেন্টেশন গভীরতা যেসব প্রজেক্টে দেখা যায়।"
          : "Projects that best represent delivery quality, technical depth, and implementation rigor.",
    },
    all: {
      eyebrow: lang === "bn" ? "সব প্রজেক্ট" : "All Projects",
      title: lang === "bn" ? "ক্যাটাগরি অনুযায়ী ব্রাউজ করুন" : "Browse by domain and method",
      description:
        lang === "bn"
          ? "ডোমেইন ও মেথড অনুযায়ী প্রজেক্ট ফিল্টার করে দেখুন।"
          : "Filter by category to review projects by domain, methods, and implementation style.",
    },
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-start">
          <Reveal>
            <article className="card h-full card-pad">
              <DomainVisual variant="ai" lang={lang} />
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-accent">
                <BadgeIcon name="focus" />
                {t.lens.label}
              </p>
              <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">{t.lens.title}</h2>
              <p className="mt-3 text-sm text-muted">{t.lens.description}</p>
            </article>
          </Reveal>

          <Reveal>
            <article className="card h-full card-pad">
              <DomainVisual variant="simulation" lang={lang} />
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-accent">
                <BadgeIcon name="workflow" />
                {t.types.label}
              </p>
              <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">{t.types.title}</h2>
              <p className="mt-3 text-sm text-muted">{t.types.description}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} description={t.featured.description} icon={<StrategyIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project, idx) => (
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
        <ProjectsBrowser projects={projects} lang={lang} />
      </section>
    </div>
  );
}

