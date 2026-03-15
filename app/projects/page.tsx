import { DomainVisual } from "@/components/domain-visual";
import { PageHero } from "@/components/page-hero";
import { BadgeIcon, StrategyIcon, WorkflowIcon } from "@/components/logo-pack";
import { ProjectsBrowser } from "@/components/projects-browser";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { featuredProjects, projects } = await getPortfolioContent();
  const lang = await getSiteLang();
  const visibleFeaturedProjects = featuredProjects.filter((project) => project.publishState !== "draft" && project.visibility !== "private");
  const visibleProjects = projects.filter((project) => project.publishState !== "draft" && project.visibility !== "private");
  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);

  const t = {
    hero: {
      kicker: lang === "bn" ? "প্রজেক্টস" : "Projects",
      title:
        lang === "bn"
          ? "এআই, ডেটা ইঞ্জিনিয়ারিং এবং সিমুলেশন-কেন্দ্রিক ব্যক্তিগত প্রজেক্ট পোর্টফোলিও"
          : "Healthcare data, applied AI, platform engineering, and simulation projects",
      description:
        lang === "bn"
          ? "পাবলিক রিপোজিটরি এবং প্রাইভেট ইমপ্লিমেন্টেশন থেকে বাছাই করা কাজ।"
          : "Each project is positioned by domain and backed by specific evidence: pipeline figures, workflow architecture, evaluation outputs, or simulation charts.",
    },
    lens: {
      label: lang === "bn" ? "পোর্টফোলিও দৃষ্টিভঙ্গি" : "Portfolio Lens",
      title: lang === "bn" ? "হাইপ নয়, ইমপ্লিমেন্টেশন" : "Execution over buzzwords",
      description:
        lang === "bn"
          ? "প্রতিটি প্রজেক্টে সমস্যা, পদ্ধতি এবং পরিমাপযোগ্য ফলাফলে ফোকাস রাখা হয়েছে।"
          : "Every project card is structured around problem, build approach, outcome enabled, and capability demonstrated.",
    },
    types: {
      label: lang === "bn" ? "প্রজেক্ট টাইপস" : "Project Types",
      title: lang === "bn" ? "গবেষণা থেকে সফটওয়্যার" : "From research to deployable systems",
      description:
        lang === "bn"
          ? "এআই টুলস, হেলথকেয়ার ডেটা, সারভাইভাল অ্যানালাইসিস, সিগন্যাল প্রসেসিং এবং সিমুলেশন-চালিত ইঞ্জিনিয়ারিং রয়েছে।"
          : "Categories separate data engineering, applied AI, clinical ML, CMS platform work, and simulation/control systems for clearer technical positioning.",
    },
    featured: {
      eyebrow: lang === "bn" ? "ফিচার্ড" : "Featured",
      title: lang === "bn" ? "মূল প্রজেক্ট অ্যাঙ্কর" : "Flagship project anchors",
      description:
        lang === "bn"
          ? "সবচেয়ে শক্তিশালী ইমপ্লিমেন্টেশন গভীরতা যেসব প্রজেক্টে দেখা যায়।"
          : "Flagship projects showing production-style execution and evidence-first communication.",
    },
    all: {
      eyebrow: lang === "bn" ? "সব প্রজেক্ট" : "All Projects",
      title: lang === "bn" ? "ক্যাটাগরি অনুযায়ী ব্রাউজ করুন" : "Browse by domain and method",
      description:
        lang === "bn"
          ? "ডোমেইন ও মেথড অনুযায়ী প্রজেক্ট ফিল্টার করে দেখুন।"
          : "Filter by corrected category taxonomy to review methods, proof style, and execution scope.",
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
              <DomainVisual variant="data" lang={lang} />
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-accent">
                <BadgeIcon name="focus" />
                {t.lens.label}
              </p>
              <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">{t.lens.title}</h2>
              <p className="mt-3 text-sm text-muted">{tr(t.lens.description)}</p>
            </article>
          </Reveal>

          <Reveal>
            <article className="card h-full card-pad">
              <DomainVisual variant="platform" lang={lang} />
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-accent">
                <BadgeIcon name="workflow" />
                {t.types.label}
              </p>
              <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">{t.types.title}</h2>
              <p className="mt-3 text-sm text-muted">{tr(t.types.description)}</p>
            </article>
          </Reveal>
        </div>
      </section>

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

