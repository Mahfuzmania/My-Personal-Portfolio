import Image from "next/image";
import {
  BadgeIcon,
  BrainIcon,
  CollaborationIcon,
  DatabaseIcon,
  StrategyIcon,
  SystemsIcon,
  TrophyIcon,
  WorkflowIcon,
} from "@/components/logo-pack";
import { CtaLink } from "@/components/cta-link";
import { DomainVisual } from "@/components/domain-visual";
import { ExperienceCard } from "@/components/experience-card";
import { PortraitStage } from "@/components/portrait-stage";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { experience, featuredProjects, highlights, profile, technicalFocus, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const visibleFeaturedProjects = featuredProjects.filter((project) => project.publishState !== "draft" && project.visibility !== "private");
  const displayName = lang === "bn" ? "মোঃ মাহফুজুল ইসলাম" : "Md Mahfuzul Islam";

  const t = {
    viewProjects: lang === "bn" ? "প্রজেক্টস দেখুন" : "View Projects",
    downloadResume: lang === "bn" ? "রেজিউমে ডাউনলোড" : "Download Resume",
    profile: {
      eyebrow: lang === "bn" ? "প্রোফাইল" : "Profile",
      title: lang === "bn" ? "পেশাগত পরিচিতি" : "What I build and operate",
      description:
        lang === "bn"
          ? "বর্তমান ভূমিকা, কাজের পরিধি এবং টেকনিক্যাল দিকনির্দেশের সংক্ষিপ্ত চিত্র।"
          : "A focused view of current execution across data systems, applied AI, secure CMS operations, and engineering analysis.",
    },
    workstreams: {
      eyebrow: lang === "bn" ? "ওয়ার্কস্ট্রিমস" : "Workstreams",
      title: lang === "bn" ? "মূল কাজের ক্ষেত্র" : "Primary and supporting domains",
      description:
        lang === "bn"
          ? "চলমান কাজের প্রধান টেকনিক্যাল ট্র্যাক।"
          : "Data engineering and applied AI are primary; platform security and simulation work provide technical depth.",
    },
    featured: {
      eyebrow: lang === "bn" ? "ফিচার্ড প্রজেক্টস" : "Featured Projects",
      title: lang === "bn" ? "নির্বাচিত কাজের তালিকা" : "Execution proof across domains",
      description:
        lang === "bn"
          ? "ডেটা, এআই এবং সিমুলেশন-ভিত্তিক নির্বাচিত কাজ।"
          : "Projects are presented with problem, build approach, outcome, and evidence type to show delivery quality without marketing noise.",
      viewAll: lang === "bn" ? "সব প্রজেক্ট দেখুন" : "View All Projects",
    },
    focus: {
      eyebrow: lang === "bn" ? "ক্ষমতা ম্যাপ" : "Capability Map",
      title: lang === "bn" ? "প্রযুক্তি ও গবেষণা ফোকাস" : "Technical capability map",
      description:
        lang === "bn"
          ? "ডেটা ইনফ্রা, অ্যাপ্লাইড এমএল এবং সিস্টেম নির্মাণ।"
          : "How data engineering, applied AI systems, platform security, and research simulation connect in production work.",
      explore: lang === "bn" ? "রিসার্চ কাজ দেখুন" : "Explore Research Work",
    },
    positions: {
      eyebrow: lang === "bn" ? "বর্তমান অবস্থান" : "Current Positions",
      title: lang === "bn" ? "সক্রিয় ভূমিকা" : "Active roles and responsibilities",
      description:
        lang === "bn"
          ? "ইন্ডাস্ট্রি ও প্রোডাক্ট ইঞ্জিনিয়ারিংয়ে চলমান দায়িত্বসমূহ।"
          : "Current responsibilities across data delivery, applied AI implementation, and secure product platform execution.",
      full: lang === "bn" ? "পূর্ণ অভিজ্ঞতা দেখুন" : "View Full Experience",
    },
    highlights: {
      eyebrow: lang === "bn" ? "হাইলাইটস" : "Highlights",
      title: lang === "bn" ? "নির্বাচিত অর্জন" : "Selected outcomes",
      collaborate: lang === "bn" ? "সহযোগিতা করুন" : "Let's Collaborate",
      about: lang === "bn" ? "আমার সম্পর্কে" : "Read About Me",
    },
    stats: {
      featured: lang === "bn" ? "ফিচার্ড" : "Featured",
      focus: lang === "bn" ? "ফোকাস এরিয়া" : "Focus Areas",
      roles: lang === "bn" ? "বর্তমান ভূমিকা" : "Current Roles",
    },
    scopeTitle: lang === "bn" ? "বর্তমান কাজের পরিধি" : "Execution priorities",
    location: {
      city: lang === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh",
      note: lang === "bn" ? "গ্লোবাল সহযোগিতার জন্য প্রস্তুত" : "Open to global collaboration",
    },
  };

  const currentPositions = experience.filter((item) => item.period.toLowerCase().includes("present")).slice(0, 3);
  const heroPhoto = profile.photoPath;
  const focusIcons = [DatabaseIcon, BrainIcon, SystemsIcon, WorkflowIcon];
  const tr = (value: string) => normalizeBnUiText(value, lang);
  const heroTitle =
    lang === "bn"
      ? "ডেটা ইঞ্জিনিয়ারিং, অ্যাপ্লাইড এআই এবং নিরাপদ প্ল্যাটফর্ম সিস্টেম নির্মাণে বাস্তবমুখী ইঞ্জিনিয়ার"
      : profile.identityLine;
  const heroIntro = lang === "bn" ? tr(uiContent.home.profileNarrative.bn[0] ?? profile.shortIntro) : tr(profile.shortIntro);
  const roleBadges = currentPositions.map((item) => tr(item.role)).slice(0, 3);

  return (
    <div className="page-stack">
      <Reveal>
        <section className="hero-panel home-hero grid md:grid-cols-[minmax(0,1.24fr)_minmax(250px,0.76fr)]">
          <article className="home-hero__content flex h-full flex-col">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{displayName}</p>
            <h1 className="home-hero__title section-title">{heroTitle}</h1>
            <p className="copy-text home-hero__intro">{heroIntro}</p>

            <div className="home-hero__roles flex flex-wrap gap-2 text-xs text-muted">
              {roleBadges.map((badge) => (
                <span key={badge} className="chip">
                  <BadgeIcon name="role" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="home-hero__companies flex flex-wrap items-center gap-2.5">
              <span className="chip company-chip">
                <Image src="/images/logos/enact-business-solutions-logo.jpg" alt="Enact Business Solutions logo" width={20} height={20} className="company-chip__logo" />
                {tr("Enact Business Solutions")}
              </span>
              <span className="chip company-chip">
                <Image src="/images/azm-labs-logo.png" alt="AZM Labs logo" width={20} height={20} className="company-chip__logo" />
                {tr("AZM Labs")}
              </span>
            </div>

            <div className="section-actions home-hero__actions">
              <CtaLink href="/projects">{t.viewProjects}</CtaLink>
              <CtaLink href={profile.resumePath} secondary external>
                {t.downloadResume}
              </CtaLink>
              <CtaLink href={profile.github} secondary external>
                GitHub
              </CtaLink>
            </div>

            <div className="home-hero__stats mt-auto">
              <article className="home-hero__stat">
                <p className="meta-label">{t.stats.featured}</p>
                <p className="home-hero__stat-value">{visibleFeaturedProjects.length}</p>
              </article>
              <article className="home-hero__stat">
                <p className="meta-label">{t.stats.focus}</p>
                <p className="home-hero__stat-value">{technicalFocus.length}</p>
              </article>
              <article className="home-hero__stat">
                <p className="meta-label">{t.stats.roles}</p>
                <p className="home-hero__stat-value">{currentPositions.length}</p>
              </article>
            </div>
          </article>

          <PortraitStage
            src={heroPhoto}
            alt="Portrait of Md Mahfuzul Islam"
            sizes="(max-width: 768px) 100vw, 480px"
            caption={`${t.location.city} | ${t.location.note}`}
            objectPosition="center 19%"
            imageClassName="portrait-stage__media--blend"
            className="portrait-stage--home home-hero__portrait"
            blend
            priority
          />
        </section>
      </Reveal>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.profile.eyebrow} title={t.profile.title} description={t.profile.description} icon={<StrategyIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <article className="card card-pad">
              <div className="space-y-4 text-sm leading-7 text-muted md:text-base">
                {uiContent.home.profileNarrative[lang].map((line) => (
                  <p key={line}>{tr(line)}</p>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{t.scopeTitle}</p>
              <div className="mt-4">
                <VisualList items={uiContent.home.scope[lang].map(tr)} imagePool={["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/simulation-depth.svg"]} icon="settings" columns="one" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.workstreams.eyebrow} title={t.workstreams.title} description={t.workstreams.description} icon={<WorkflowIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="grid gap-4">
            {uiContent.home.workstreams.map((item, idx) => (
              <Reveal key={item.title.en} delay={idx * 0.06}>
                <article className="card card-pad">
                  <div className="grid gap-4 md:grid-cols-[minmax(260px,0.95fr)_minmax(0,1.05fr)] md:items-center">
                    <DomainVisual variant={item.variant} lang={lang} />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight md:text-xl">{tr(item.title[lang])}</h3>
                      <p className="mt-2 text-sm text-muted md:text-base">{tr(item.detail[lang])}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} description={t.featured.description} icon={<SystemsIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleFeaturedProjects.slice(0, 4).map((project, idx) => (
              <Reveal key={project.title} delay={idx * 0.05}>
                <ProjectCard project={project} compact lang={lang} />
              </Reveal>
            ))}
          </div>
          <div className="section-actions">
            <CtaLink href="/projects" secondary>
              {t.featured.viewAll}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.focus.eyebrow} title={t.focus.title} description={t.focus.description} icon={<StrategyIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {technicalFocus.map((focus, idx) => {
              const FocusIcon = focusIcons[idx];
              return (
                <Reveal key={focus.title} delay={idx * 0.05}>
                  <article className="card h-full card-pad">
                    <div className="mb-3 flex items-center gap-3">
                      {FocusIcon ? <FocusIcon className="h-8 w-8" /> : null}
                      <h3 className="text-xl font-semibold tracking-tight">{focus.title}</h3>
                    </div>
                    <p className="text-sm text-muted">{tr(focus.detail)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="section-actions">
            <CtaLink href="/research" secondary>
              {t.focus.explore}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.positions.eyebrow} title={t.positions.title} description={t.positions.description} icon={<CollaborationIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="timeline-rail">
            {currentPositions.map((item, idx) => (
              <Reveal key={`${item.role}-${item.period}`} delay={idx * 0.05}>
                <ExperienceCard item={item} lang={lang} />
              </Reveal>
            ))}
          </div>
          <div className="section-actions">
            <CtaLink href="/experience" secondary>
              {t.positions.full}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell section-shell--with-heading">
          <Reveal>
            <SectionHeading eyebrow={t.highlights.eyebrow} title={t.highlights.title} icon={<TrophyIcon className="h-8 w-8" />} />
          </Reveal>
          <VisualList items={highlights.slice(0, 4).map(tr)} imagePool={[
            "/images/pipeline-depth.svg",
            "/images/ai-depth.svg",
            "/images/simulation-depth.svg",
            "/images/placeholders/project-ml.svg",
          ]} icon="award" />
          <div className="accent-line mt-2" />
          <div className="section-actions mt-1">
            <CtaLink href="/contact">{t.highlights.collaborate}</CtaLink>
            <CtaLink href="/about" secondary>
              {t.highlights.about}
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
}



