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
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { experience, featuredProjects, highlights, profile, technicalFocus, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const displayName = lang === "bn" ? "à¦®à§‹à¦ƒ à¦®à¦¾à¦¹à¦«à§à¦œà§à¦² à¦‡à¦¸à¦²à¦¾à¦®" : "Md Mahfuzul Islam";

  const t = {
    viewProjects: lang === "bn" ? "à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà¦¸ à¦¦à§‡à¦–à§à¦¨" : "View Projects",
    downloadResume: lang === "bn" ? "à¦°à§‡à¦œà¦¿à¦‰à¦®à§‡ à¦¡à¦¾à¦‰à¦¨à¦²à§‹à¦¡" : "Download Resume",
    profile: {
      eyebrow: lang === "bn" ? "à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦²" : "Profile",
      title: lang === "bn" ? "à¦ªà§‡à¦¶à¦¾à¦—à¦¤ à¦ªà¦°à¦¿à¦šà¦¿à¦¤à¦¿" : "Current professional scope",
      description:
        lang === "bn"
          ? "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦­à§‚à¦®à¦¿à¦•à¦¾, à¦•à¦¾à¦œà§‡à¦° à¦ªà¦°à¦¿à¦§à¦¿ à¦à¦¬à¦‚ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦¦à¦¿à¦•à¦¨à¦¿à¦°à§à¦¦à§‡à¦¶à§‡à¦° à¦¸à¦‚à¦•à§à¦·à¦¿à¦ªà§à¦¤ à¦šà¦¿à¦¤à§à¦°à¥¤"
          : "A focused view of my current execution areas across healthcare data, applied AI delivery, and platform engineering.",
    },
    workstreams: {
      eyebrow: lang === "bn" ? "à¦“à§Ÿà¦¾à¦°à§à¦•à¦¸à§à¦Ÿà§à¦°à¦¿à¦®à¦¸" : "Workstreams",
      title: lang === "bn" ? "à¦®à§‚à¦² à¦•à¦¾à¦œà§‡à¦° à¦•à§à¦·à§‡à¦¤à§à¦°" : "Execution domains",
      description:
        lang === "bn"
          ? "à¦šà¦²à¦®à¦¾à¦¨ à¦•à¦¾à¦œà§‡à¦° à¦ªà§à¦°à¦§à¦¾à¦¨ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦Ÿà§à¦°à§à¦¯à¦¾à¦•à¥¤"
          : "The technical tracks I am actively delivering.",
    },
    featured: {
      eyebrow: lang === "bn" ? "à¦«à¦¿à¦šà¦¾à¦°à§à¦¡ à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà¦¸" : "Featured Projects",
      title: lang === "bn" ? "à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¿à¦¤ à¦•à¦¾à¦œà§‡à¦° à¦¤à¦¾à¦²à¦¿à¦•à¦¾" : "Featured implementation portfolio",
      description:
        lang === "bn"
          ? "à¦¡à§‡à¦Ÿà¦¾, à¦à¦†à¦‡ à¦à¦¬à¦‚ à¦¸à¦¿à¦®à§à¦²à§‡à¦¶à¦¨-à¦­à¦¿à¦¤à§à¦¤à¦¿à¦• à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¿à¦¤ à¦•à¦¾à¦œà¥¤"
          : "Selected projects where engineering depth, validation, and delivery quality are clearly demonstrated.",
      viewAll: lang === "bn" ? "à¦¸à¦¬ à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¦à§‡à¦–à§à¦¨" : "View All Projects",
    },
    focus: {
      eyebrow: lang === "bn" ? "à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦«à§‹à¦•à¦¾à¦¸" : "Technical Focus",
      title: lang === "bn" ? "à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿ à¦“ à¦—à¦¬à§‡à¦·à¦£à¦¾ à¦«à§‹à¦•à¦¾à¦¸" : "Technical and research directions",
      description:
        lang === "bn"
          ? "à¦¡à§‡à¦Ÿà¦¾ à¦‡à¦¨à¦«à§à¦°à¦¾, à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¾à¦‡à¦¡ à¦à¦®à¦à¦² à¦à¦¬à¦‚ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¬à¦¿à¦²à§à¦¡à¥¤"
          : "Where I am currently investing technical depth across data systems, applied ML, and platform execution.",
      explore: lang === "bn" ? "à¦°à¦¿à¦¸à¦¾à¦°à§à¦š à¦•à¦¾à¦œ à¦¦à§‡à¦–à§à¦¨" : "Explore Research Work",
    },
    positions: {
      eyebrow: lang === "bn" ? "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦…à¦¬à¦¸à§à¦¥à¦¾à¦¨" : "Current Positions",
      title: lang === "bn" ? "à¦¸à¦•à§à¦°à¦¿à§Ÿ à¦­à§‚à¦®à¦¿à¦•à¦¾" : "Active roles and responsibilities",
      description:
        lang === "bn"
          ? "à¦‡à¦¨à§à¦¡à¦¾à¦¸à§à¦Ÿà§à¦°à¦¿ à¦“ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦‡à¦žà§à¦œà¦¿à¦¨à¦¿à§Ÿà¦¾à¦°à¦¿à¦‚à§Ÿà§‡ à¦šà¦²à¦®à¦¾à¦¨ à¦¦à¦¾à§Ÿà¦¿à¦¤à§à¦¬à¦¸à¦®à§‚à¦¹à¥¤"
          : "Current responsibilities across industry delivery, product engineering, and applied AI/data systems.",
      full: lang === "bn" ? "à¦ªà§‚à¦°à§à¦£ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦¦à§‡à¦–à§à¦¨" : "View Full Experience",
    },
    highlights: {
      eyebrow: lang === "bn" ? "à¦¹à¦¾à¦‡à¦²à¦¾à¦‡à¦Ÿà¦¸" : "Highlights",
      title: lang === "bn" ? "à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¿à¦¤ à¦…à¦°à§à¦œà¦¨" : "Selected outcomes and impact",
      collaborate: lang === "bn" ? "à¦¸à¦¹à¦¯à§‹à¦—à¦¿à¦¤à¦¾ à¦•à¦°à§à¦¨" : "Let's Collaborate",
      about: lang === "bn" ? "à¦†à¦®à¦¾à¦° à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡" : "Read About Me",
    },
    stats: {
      featured: lang === "bn" ? "à¦«à¦¿à¦šà¦¾à¦°à§à¦¡" : "Featured",
      focus: lang === "bn" ? "à¦«à§‹à¦•à¦¾à¦¸ à¦à¦°à¦¿à§Ÿà¦¾" : "Focus Areas",
      roles: lang === "bn" ? "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦­à§‚à¦®à¦¿à¦•à¦¾" : "Current Roles",
    },
    scopeTitle: lang === "bn" ? "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦•à¦¾à¦œà§‡à¦° à¦ªà¦°à¦¿à¦§à¦¿" : "Current execution scope",
    location: {
      city: lang === "bn" ? "à¦¢à¦¾à¦•à¦¾, à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶" : "Dhaka, Bangladesh",
      note: lang === "bn" ? "à¦—à§à¦²à§‹à¦¬à¦¾à¦² à¦¸à¦¹à¦¯à§‹à¦—à¦¿à¦¤à¦¾à¦° à¦œà¦¨à§à¦¯ à¦ªà§à¦°à¦¸à§à¦¤à§à¦¤" : "Open to global collaboration",
    },
  };

  const currentPositions = experience.filter((item) => item.period.toLowerCase().includes("present")).slice(0, 3);
  const heroPhoto = profile.photoPath;
  const focusIcons = [DatabaseIcon, BrainIcon, SystemsIcon, WorkflowIcon];
  const roleBadges = currentPositions.map((item) => item.role).slice(0, 3);

  return (
    <div className="page-stack">
      <Reveal>
        <section className="hero-panel home-hero grid md:grid-cols-[minmax(0,1.24fr)_minmax(250px,0.76fr)]">
          <article className="home-hero__content flex h-full flex-col">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{displayName}</p>
            <h1 className="home-hero__title section-title">{profile.identityLine}</h1>
            <p className="copy-text home-hero__intro">{profile.shortIntro}</p>

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
                Enact Business Solutions
              </span>
              <span className="chip company-chip">
                <Image src="/images/azm-labs-logo.png" alt="AZM Labs logo" width={20} height={20} className="company-chip__logo" />
                AZM Labs
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
                <p className="home-hero__stat-value">{featuredProjects.length}</p>
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
                {profile.shortIntro && <p>{profile.shortIntro}</p>}
                {uiContent.home.profileNarrative[lang].map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{t.scopeTitle}</p>
              <div className="mt-4">
                <VisualList items={uiContent.home.scope[lang]} imagePool={["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/simulation-depth.svg"]} icon="settings" columns="one" />
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
          <div className="grid gap-5 md:grid-cols-3">
            {uiContent.home.workstreams.map((item, idx) => (
              <Reveal key={item.title.en} delay={idx * 0.06}>
                <article className="card h-full card-pad">
                  <DomainVisual variant={item.variant} lang={lang} />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title[lang]}</h3>
                  <p className="mt-2 text-sm text-muted">{item.detail[lang]}</p>
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
            {featuredProjects.slice(0, 4).map((project, idx) => (
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
                    <p className="text-sm text-muted">{focus.detail}</p>
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
                <ExperienceCard item={item} />
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
          <VisualList items={highlights.slice(0, 4)} imagePool={[
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



