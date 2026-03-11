import Image from "next/image";
import { DomainVisual } from "@/components/domain-visual";
import { BrainIcon, CircuitIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const { researchThemes, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const technicalInterests = uiContent.research.technicalInterests[lang];
  const explorations = uiContent.research.explorations[lang];
  const researchVisuals = ["/images/ai-depth.svg", "/images/simulation-depth.svg", "/images/placeholders/project-ml.svg", "/images/placeholders/project-signal.svg"];

  const t = {
    hero: {
      kicker: lang === "bn" ? "à¦°à¦¿à¦¸à¦¾à¦°à§à¦š / à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦“à§Ÿà¦¾à¦°à§à¦•" : "Research / Technical Work",
      title: lang === "bn" ? "à¦‡à¦®à¦ªà§à¦²à¦¿à¦®à§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨-à¦•à§‡à¦¨à§à¦¦à§à¦°à¦¿à¦• à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦°à¦¿à¦¸à¦¾à¦°à§à¦š" : "Implementation-led technical research",
      description:
        lang === "bn"
          ? "à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£à¦§à¦°à§à¦®à§€ à¦šà¦¿à¦¨à§à¦¤à¦¾ à¦“ à¦¬à¦¾à¦¸à§à¦¤à¦¬ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¨à¦¿à¦°à§à¦®à¦¾à¦£à§‡à¦° à¦¸à¦‚à¦¯à§‹à¦—à§‡ à¦•à¦°à¦¾ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦à¦•à§à¦¸à¦ªà§à¦²à§‹à¦°à§‡à¦¶à¦¨à¥¤"
          : "Technical explorations that connect research methods with deployable engineering systems.",
    },
    interests: {
      eyebrow: lang === "bn" ? "à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦‡à¦¨à§à¦Ÿà¦¾à¦°à§‡à¦¸à§à¦Ÿ" : "Technical Interests",
      title: lang === "bn" ? "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦«à§‹à¦•à¦¾à¦¸ à¦à¦°à¦¿à§Ÿà¦¾" : "Current research directions",
    },
    themes: {
      eyebrow: lang === "bn" ? "à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¾à¦‡à¦¡ à¦°à¦¿à¦¸à¦¾à¦°à§à¦š à¦¥à¦¿à¦®" : "Applied Research Themes",
      title: lang === "bn" ? "à¦—à¦¬à§‡à¦·à¦£à¦¾ à¦¥à¦¿à¦®" : "Core research themes",
      description:
        lang === "bn"
          ? "à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£à¦§à¦°à§à¦®à§€ à¦ªà¦¦à§à¦§à¦¤à¦¿ à¦“ à¦¡à¦¿à¦ªà§à¦²à§Ÿà§‡à¦¬à¦² à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®à§‡à¦° à¦¸à¦‚à¦¯à§‹à¦—à¦•à¦¾à¦°à§€ à¦¥à¦¿à¦®à¥¤"
          : "Themes where analytical methods are translated into practical, implementation-ready systems.",
    },
    explorations: {
      eyebrow: lang === "bn" ? "à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¿à¦¤ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦à¦•à§à¦¸à¦ªà§à¦²à§‹à¦°à§‡à¦¶à¦¨" : "Selected Technical Explorations",
      title: lang === "bn" ? "à¦«à§‹à¦•à¦¾à¦¸à¦¡ à¦…à¦¨à§à¦¸à¦¨à§à¦§à¦¾à¦¨" : "Focused technical explorations",
      workshopCaption:
        lang === "bn"
          ? "à¦°à¦¿à¦¸à¦¾à¦°à§à¦š à¦ªà§à¦°à¦ªà§‹à¦œà¦¾à¦² à¦°à¦¾à¦‡à¦Ÿà¦¿à¦‚ à¦“ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦¡à¦•à§à¦®à§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨ à¦“à§Ÿà¦¾à¦°à§à¦•à¦¶à¦ªà§‡ à¦…à¦‚à¦¶à¦—à§à¦°à¦¹à¦£à§‡à¦° à¦à¦•à¦Ÿà¦¿ à¦®à§à¦¹à§‚à¦°à§à¦¤à¥¤"
          : "From a workshop on research proposal writing and technical documentation practice.",
    },
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <article className="card card-pad">
            <SectionHeading eyebrow={t.interests.eyebrow} title={t.interests.title} icon={<BrainIcon className="h-8 w-8" />} />
            <VisualList items={technicalInterests} imagePool={researchVisuals} icon="search" />
          </article>

          <article className="card h-fit card-pad">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-border">
              <Image src="/images/portraits/research-photo.jpg" alt="Md Mahfuzul Islam at a research proposal writing workshop" fill sizes="(max-width: 768px) 100vw, 460px" className="object-cover" />
            </div>
            <p className="mt-3 text-sm text-muted">{t.explorations.workshopCaption}</p>
          </article>
        </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.themes.eyebrow} title={t.themes.title} description={t.themes.description} icon={<DatabaseIcon className="h-8 w-8" />} />
        </Reveal>
        <Reveal>
          <VisualList items={researchThemes} imagePool={researchVisuals} icon="analytics" />
        </Reveal>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.explorations.eyebrow} title={t.explorations.title} icon={<CircuitIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-stretch">
          <Reveal>
            <article className="card h-fit card-pad">
              <DomainVisual variant="simulation" lang={lang} />
            </article>
          </Reveal>
          <div className="card h-full card-pad">
            <VisualList items={explorations} imagePool={researchVisuals} icon="link" columns="one" />
          </div>
        </div>
      </section>
    </div>
  );
}

