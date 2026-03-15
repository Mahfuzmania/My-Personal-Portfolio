import Image from "next/image";
import { BrandIcon } from "@/components/brand-icon";
import {
  BadgeIcon,
  BrainIcon,
  CollaborationIcon,
  DatabaseIcon,
  GraduationIcon,
  StrategyIcon,
  SystemsIcon,
  WorkflowIcon,
} from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { PortraitStage } from "@/components/portrait-stage";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { repairMojibakeDeep } from "@/lib/mojibake";

export const dynamic = "force-dynamic";

function resolveCompanyLogo(title: string, logos: Record<string, string>) {
  const match = Object.entries(logos).find(([key]) => title.includes(key));
  return match?.[1] ?? null;
}

export default async function AboutPage() {
  const { aboutSummary, profile, skillGroups, uiContent, workingPhilosophy, achievementItems } = await getPortfolioContent();
  const lang = await getSiteLang();
  const biographyText = uiContent.about.biography[lang];
  const roleCards = uiContent.about.contextCards;
  const focusCards = uiContent.about.professionalFocus;
  const aboutVisuals = ["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/simulation-depth.svg", "/images/placeholders/project-data.svg"];

  const isBn = lang === "bn";
  const skillGroupTitleBn: Record<string, string> = {
    "Backend and Platform Engineering": "\u09ac\u09cd\u09af\u09be\u0995\u098f\u09a8\u09cd\u09a1 \u0993 \u09aa\u09cd\u09b2\u09cd\u09af\u09be\u099f\u09ab\u09b0\u09cd\u09ae \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09df\u09be\u09b0\u09bf\u0982",
    "Security and Reliability": "\u09a8\u09bf\u09b0\u09be\u09aa\u09a4\u09cd\u09a4\u09be \u0993 \u09a8\u09bf\u09b0\u09cd\u09ad\u09b0\u09af\u09cb\u0997\u09cd\u09af\u09a4\u09be",
    "Data, AI, and Simulation": "\u09a1\u09c7\u099f\u09be, AI \u0993 \u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u09b6\u09a8",
  };

  const skillItemBn: Record<string, string> = {
    "REST API Design": "REST API \u09a1\u09bf\u099c\u09be\u0987\u09a8",
    "Role-Based Admin": "\u09b0\u09cb\u09b2-\u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u0995 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8",
    "CMS Workflows": "CMS \u0993\u09df\u09be\u09b0\u09cd\u0995\u09ab\u09cd\u09b2\u09cb",
    "JSON/Content Persistence": "JSON/\u0995\u09a8\u099f\u09c7\u09a8\u09cd\u099f \u09aa\u09be\u09b0\u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09a8\u09cd\u09b8",
    "Session Cookies": "\u09b8\u09c7\u09b6\u09a8 \u0995\u09c1\u0995\u09bf\u099c",
    "CSRF Protection": "CSRF \u09aa\u09cd\u09b0\u099f\u09c7\u0995\u09b6\u09a8",
    "Rate Limiting": "\u09b0\u09c7\u099f \u09b2\u09bf\u09ae\u09bf\u099f\u09bf\u0982",
    "Zod Validation": "Zod \u09ad\u09cd\u09af\u09be\u09b2\u09bf\u09a1\u09c7\u09b6\u09a8",
    "API Route Guarding": "API \u09b0\u09c1\u099f \u0997\u09be\u09b0\u09cd\u09a1\u09bf\u0982",
    "RAG Pipelines": "RAG \u09aa\u09be\u0987\u09aa\u09b2\u09be\u0987\u09a8",
    "Control Systems": "\u0995\u09a8\u09cd\u099f\u09cd\u09b0\u09cb\u09b2 \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae",
    "Survival Analysis": "\u09b8\u09be\u09b0\u09ad\u09be\u0987\u09ad\u09be\u09b2 \u0985\u09cd\u09af\u09be\u09a8\u09be\u09b2\u09be\u0987\u09b8\u09bf\u09b8",
  };

  const localizedSkillGroups = isBn
    ? skillGroups.map((group) => ({
        ...group,
        title: skillGroupTitleBn[group.title] ?? group.title,
        items: group.items.map((item) => skillItemBn[item] ?? item),
      }))
    : skillGroups;
  const tr = (value: string) => normalizeBnUiText(value, lang);
  const t = repairMojibakeDeep({
    hero: {
      kicker: isBn ? "প্রোফাইল" : "Profile",
      title: isBn ? "\u09a1\u09c7\u099f\u09be \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09df\u09be\u09b0 \u098f\u09ac\u0982 \u09ac\u09be\u09b8\u09cd\u09a4\u09ac\u09be\u09df\u09a8\u09ae\u09c1\u0996\u09c0 \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae \u09a8\u09bf\u09b0\u09cd\u09ae\u09be\u09a4\u09be" : "Data Engineer and applied AI systems builder",
      description: isBn
        ? "আমি ইঞ্জিনিয়ারিং শৃঙ্খলা ও পরিমাপযোগ্য ডেলিভারির ভিত্তিতে deploy-ready হেলথকেয়ার ডেটা ও এআই সিস্টেম তৈরি করি।"
        : "I build reliable data and AI systems for real operations, with secure platform workflows and simulation-backed engineering depth.",
    },
    bio: {
      eyebrow: isBn ? "প্রফেশনাল প্রোফাইল" : "Professional Profile",
      title: isBn ? "জীবনী" : "Biography",
      description: isBn ? "পটভূমি, কাজের প্রেক্ষাপট, এবং বর্তমান প্রযুক্তিগত দিকনির্দেশ।" : "Background, execution context, and how academic training maps to production delivery.",
    },
    roles: {
      eyebrow: isBn ? "বর্তমান প্রেক্ষাপট" : "Current Context",
      title: isBn ? "বর্তমান ভূমিকা" : "Current Roles",
      description: isBn ? "ইন্ডাস্ট্রি ডেলিভারি এবং প্রোডাক্ট ইঞ্জিনিয়ারিংয়ের দায়িত্ব কীভাবে ভাগ করা আছে।" : "How responsibilities are split across data delivery, platform engineering, and applied AI implementation.",
    },
    strengths: {
      eyebrow: isBn ? "প্রযুক্তিগত শক্তি" : "Technical Strengths",
      title: isBn ? "কার্যসম্পাদন সক্ষমতার ক্ষেত্র" : "Execution capability stack",
      description: isBn ? "প্রতিদিনের প্রযুক্তিগত কাজ ও ডেলিভারিতে যেসব সক্ষমতার ওপর আমি নির্ভর করি।" : "Capability areas I rely on for day-to-day technical execution and delivery.",
    },
    philosophy: {
      eyebrow: isBn ? "কাজের দর্শন" : "Working Philosophy",
      title: isBn ? "আমার কাজের কার্যকর নীতিমালা" : "Principles used to keep systems production-safe",
      description: isBn ? "সিস্টেমকে ব্যবহারযোগ্য, নির্ভরযোগ্য, এবং পরিমাপযোগ্য রাখতে আমি যে মানদণ্ড অনুসরণ করি।" : "The standards I use to keep systems practical, reliable, and measurable.",
    },
    focus: {
      eyebrow: isBn ? "\u09aa\u09c7\u09b6\u09be\u0997\u09a4 \u09ab\u09cb\u0995\u09be\u09b8" : "Professional Focus",
      title: isBn ? "দুটি সক্রিয় ফোকাস ট্র্যাক" : "Primary and secondary focus tracks",
      description: isBn ? "Enact Business Solutions ও AZM Labs-এ আমার ফোকাস ক্ষেত্রের স্পষ্ট বিভাজন।" : "Clear separation of my focus areas at Enact Business Solutions and AZM Labs.",
    },
    academic: {
      label: isBn ? "একাডেমিক পটভূমি" : "Academic Background",
      title: isBn
        ? "ইসলামিক ইউনিভার্সিটি অব টেকনোলজি থেকে ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিংয়ে স্নাতক"
        : "B.Sc. in Electrical and Electronic Engineering, Islamic University of Technology",
      detail: isBn
        ? "কন্ট্রোল সিস্টেম ও সিগন্যাল প্রসেসিং ভিত্তির ওপর নির্মিত; এখন প্রোডাকশন ডেটা ইঞ্জিনিয়ারিং ও অ্যাপ্লাইড এআই ডেলিভারিতে মনোযোগী।"
        : "Built on control systems and signal processing fundamentals, now applied to production data engineering, secure platform delivery, and applied AI execution.",
      cv: isBn ? "সিভি দেখুন" : "View CV",
      labelItems: [isBn ? "ডেটা ইঞ্জিনিয়ারিং" : "Data Engineering", isBn ? "অ্যাপ্লাইড এমএল" : "Applied ML", isBn ? "সিস্টেমস বিল্ড" : "Systems Build"],
    },
    achievements: isBn ? "টি অর্জন তালিকাভুক্ত আছে।" : "achievements recorded.",
  });

  const companyLogos: Record<string, string> = {
    "Enact Business Solutions": "/images/logos/enact-business-solutions-logo.jpg",
    "AZM Labs": "/images/azm-labs-logo.png",
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr] md:items-start">
          <Reveal>
            <article className="card card-pad-lg">
              <SectionHeading eyebrow={t.bio.eyebrow} title={t.bio.title} description={t.bio.description} icon={<StrategyIcon className="h-8 w-8" />} />
              <p className="copy-text">{tr(biographyText)}</p>

              <div className="accent-line my-6" />
              <VisualList items={aboutSummary.map(tr)} imagePool={aboutVisuals} icon="user" columns="one" />

              <div className="accent-line my-6" />
              <SectionHeading eyebrow={t.roles.eyebrow} title={t.roles.title} description={t.roles.description} icon={<CollaborationIcon className="h-8 w-8" />} />
              <div className="mt-3 grid gap-3">
                {roleCards.map((item) => (
                  <article key={item.title.en} className="card p-3.5">
                    <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight md:text-2xl">
                      {resolveCompanyLogo(item.title.en, companyLogos) ? (
                        <Image
                          src={resolveCompanyLogo(item.title.en, companyLogos) as string}
                          alt={`${item.title.en} logo`}
                          width={30}
                          height={30}
                          className="company-chip__logo company-chip__logo--lg"
                        />
                      ) : null}
                      <span>{tr(item.title[lang])}</span>
                    </h3>
                    <p className="mt-2 text-base text-muted">{tr(item.detail[lang])}</p>
                  </article>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className="card overflow-hidden p-0">
              <div className="card-pad pb-0">
                <PortraitStage
                  src={profile.photoPath}
                  alt="Md Mahfuzul Islam profile"
                  sizes="(max-width: 768px) 100vw, 460px"
                  objectPosition="center 16%"
                  imageClassName="portrait-stage__media--about"
                  className="portrait-stage--about portrait-stage--about-fixed"
                  enableDecorations={false}
                />
              </div>
              <div className="card-pad">
                <div className="mt-1 grid gap-2 sm:grid-cols-3">
                  <div className="card p-3">
                    <DatabaseIcon className="h-7 w-7" />
                    <p className="mt-2 text-xs text-muted">{t.academic.labelItems[0]}</p>
                  </div>
                  <div className="card p-3">
                    <BrainIcon className="h-7 w-7" />
                    <p className="mt-2 text-xs text-muted">{t.academic.labelItems[1]}</p>
                  </div>
                  <div className="card p-3">
                    <SystemsIcon className="h-7 w-7" />
                    <p className="mt-2 text-xs text-muted">{t.academic.labelItems[2]}</p>
                  </div>
                </div>

                <div className="accent-line my-5" />
                <SectionHeading eyebrow={tr(t.focus.eyebrow)} title={tr(t.focus.title)} description={tr(t.focus.description)} icon={<BadgeIcon name="focus" />} />
                <div className="mt-3 grid gap-3">
                  {focusCards.map((item) => (
                    <article key={item.title.en} className="rounded-xl border border-border bg-surface/70 px-4 py-3">
                      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                        {resolveCompanyLogo(item.title.en, companyLogos) ? (
                          <Image
                            src={resolveCompanyLogo(item.title.en, companyLogos) as string}
                            alt={`${item.title.en} logo`}
                            width={24}
                            height={24}
                            className="company-chip__logo"
                          />
                        ) : null}
                        {tr(item.title[lang])}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{tr(item.detail[lang])}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.strengths.eyebrow} title={t.strengths.title} description={t.strengths.description} icon={<SystemsIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {localizedSkillGroups.map((group, idx) => (
            <Reveal key={group.title} delay={idx * 0.05}>
              <article className="card h-full card-pad">
                <h3 className="mb-3 text-xl font-semibold">{group.title}</h3>
                <ul className="flex flex-wrap gap-2 text-sm text-muted">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      <BrandIcon label={item} className="text-[13px]" />
                      {tr(item)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        {achievementItems.length ? <p className="text-sm text-muted">{achievementItems.length} {t.achievements}</p> : null}
      </section>

      <section className="section-shell grid gap-4 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <Reveal>
            <SectionHeading eyebrow={t.philosophy.eyebrow} title={t.philosophy.title} description={t.philosophy.description} icon={<WorkflowIcon className="h-8 w-8" />} />
          </Reveal>
          <div className="card card-pad-lg">
            <VisualList items={workingPhilosophy.map(tr)} imagePool={aboutVisuals} icon="settings" columns="one" />
          </div>
        </div>

        <Reveal>
          <article className="card h-fit card-pad-lg">
            <SectionHeading eyebrow={t.academic.label} title={t.academic.title} description={t.academic.detail} icon={<GraduationIcon className="h-8 w-8" />} />
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent" href={profile.cvPath} target="_blank" rel="noreferrer">
                {t.academic.cv}
              </a>
            </div>
          </article>
        </Reveal>
      </section>
    </div>
  );
}


