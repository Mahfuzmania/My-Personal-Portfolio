import Image from "next/image";
import { DomainEvidenceFrame } from "@/components/domain-evidence-frame";
import { BrainIcon, CircuitIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

export const dynamic = "force-dynamic";

const BN_RESEARCH_THEME_MAP: Record<string, string> = {
  "Healthcare data integration and reliable analytical infrastructure": "হেলথকেয়ার ডেটা ইন্টিগ্রেশন ও নির্ভরযোগ্য বিশ্লেষণ অবকাঠামো",
  "Survival modeling and interpretable clinical ML": "সারভাইভাল মডেলিং ও ব্যাখ্যাযোগ্য ক্লিনিক্যাল এমএল",
  "Signal and system-level analysis for biomedical and engineering use-cases": "বায়োমেডিক্যাল ও ইঞ্জিনিয়ারিং প্রয়োগে সিগন্যাল এবং সিস্টেম-লেভেল বিশ্লেষণ",
  "Controller design and performance optimization in electrical drives": "ইলেকট্রিক্যাল ড্রাইভে কন্ট্রোলার ডিজাইন ও পারফরম্যান্স অপ্টিমাইজেশন",
  "Retrieval-augmented AI tools for technical learning and decision support": "প্রযুক্তিগত শেখা ও সিদ্ধান্ত সহায়তায় রিট্রিভাল-অগমেন্টেড এআই টুলস",
};

export default async function ResearchPage() {
  const { researchThemes, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();

  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);

  const technicalInterests = uiContent.research.technicalInterests[lang].map((item) => tr(item));
  const explorations = uiContent.research.explorations[lang].map((item) => tr(item));
  const localizedResearchThemes =
    lang === "bn"
      ? researchThemes.map((theme) => BN_RESEARCH_THEME_MAP[theme] ?? tr(theme))
      : researchThemes;

  const practiceNotes = explorations.slice(0, 4);
  const themePreview = localizedResearchThemes.slice(0, 3);
  const researchVisuals = ["/images/ai-depth.svg", "/images/simulation-depth.svg", "/images/placeholders/project-ml.svg", "/images/placeholders/project-signal.svg"];

  const t = {
    hero: {
      kicker: lang === "bn" ? "রিসার্চ ও টেকনিক্যাল কাজ" : "Research / Technical Work",
      title: lang === "bn" ? "ইমপ্লিমেন্টেশন-নির্ভর টেকনিক্যাল গবেষণা" : "Implementation-led technical research",
      description:
        lang === "bn"
          ? "গবেষণা পদ্ধতি, বাস্তব ডেটা, এবং প্রোডাকশন-রেডি সফটওয়্যার সিস্টেমকে একসাথে এনে ব্যবহারযোগ্য ফল তৈরি করি।"
          : "I use research methods to validate real delivery decisions in data engineering, applied AI, and control-oriented systems.",
    },
    interests: {
      eyebrow: lang === "bn" ? "টেকনিক্যাল আগ্রহের ক্ষেত্র" : "Technical Interests",
      title: lang === "bn" ? "বর্তমান গবেষণা দিক" : "Current research directions",
      description:
        lang === "bn"
          ? "যে ক্ষেত্রগুলোতে ধারাবাহিকভাবে কাজ করছি এবং বাস্তব ডেলিভারিতে প্রয়োগ করছি।"
          : "Domains where experiments translate into production-relevant methods and architecture choices.",
      practiceEyebrow: lang === "bn" ? "প্র্যাকটিসে গবেষণা" : "Research in practice",
    },
    themes: {
      eyebrow: lang === "bn" ? "অ্যাপ্লাইড রিসার্চ থিম" : "Applied Research Themes",
      title: lang === "bn" ? "কোর গবেষণা থিম" : "Core research themes",
      description:
        lang === "bn"
          ? "বিশ্লেষণভিত্তিক ধারণাকে বাস্তবায়নযোগ্য সিস্টেমে রূপ দেওয়ার মূল থিমগুলো।"
          : "Themes that connect analysis, evaluation, and implementation-safe system design.",
    },
    explorations: {
      eyebrow: lang === "bn" ? "নির্বাচিত টেকনিক্যাল এক্সপ্লোরেশন" : "Selected Technical Explorations",
      title: lang === "bn" ? "ফোকাসড এক্সপ্লোরেশন" : "Focused technical explorations",
      workshopCaption:
        lang === "bn"
          ? "রিসার্চ প্রোপোজাল লেখা ও টেকনিক্যাল ডকুমেন্টেশন ওয়ার্কশপের একটি মুহূর্ত।"
          : "From a workshop on research proposal writing and technical documentation practice.",
    },
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <article className="card h-full card-pad">
            <SectionHeading eyebrow={t.interests.eyebrow} title={t.interests.title} description={t.interests.description} icon={<BrainIcon className="h-8 w-8" />} />
            <div className="mt-3 grid gap-3">
              <VisualList items={technicalInterests} imagePool={researchVisuals} icon="search" />
              <div className="rounded-xl border border-border bg-surface/75 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{t.interests.practiceEyebrow}</p>
                <div className="mt-2">
                  <VisualList items={practiceNotes} imagePool={researchVisuals} icon="link" columns="one" />
                </div>
              </div>
            </div>
          </article>

          <article className="card h-full card-pad">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-border">
              <Image
                src="/images/portraits/research-photo.jpg"
                alt={lang === "bn" ? "গবেষণা প্রস্তাবনা ওয়ার্কশপে এমডি মাহফুজুল ইসলাম" : "Md Mahfuzul Islam at a research proposal writing workshop"}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-muted">{t.explorations.workshopCaption}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {themePreview.map((item) => (
                <span key={item} className="chip chip--accent">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.themes.eyebrow} title={t.themes.title} description={t.themes.description} icon={<DatabaseIcon className="h-8 w-8" />} />
        </Reveal>
        <Reveal>
          <VisualList items={localizedResearchThemes} imagePool={researchVisuals} icon="analytics" />
        </Reveal>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.explorations.eyebrow} title={t.explorations.title} icon={<CircuitIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] xl:items-start">
          <Reveal>
            <DomainEvidenceFrame
              variant="simulation"
              lang={lang}
              title={lang === "bn" ? "সিমুলেশন ও কন্ট্রোল প্রমাণ" : "Simulation and control evidence"}
              description={
                lang === "bn"
                  ? "মডেল সেটআপ, টিউনিং এবং রেসপন্স কার্ভ ব্যবহার করে ইঞ্জিনিয়ারিং ট্রেডঅফ যাচাই করা হয়েছে।"
                  : "Model setup, controller tuning, and response curves are used to validate engineering tradeoffs."
              }
              rowsLimit={4}
              className="card card-pad h-full"
            />
          </Reveal>
          <div className="card card-pad">
            <VisualList items={explorations} imagePool={researchVisuals} icon="link" columns="one" />
          </div>
        </div>
      </section>
    </div>
  );
}
