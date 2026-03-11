import Image from "next/image";
import { DomainVisual } from "@/components/domain-visual";
import { BriefcaseIcon, GraduationIcon, SparkIcon, TrophyIcon } from "@/components/logo-pack";
import { ExperienceCard } from "@/components/experience-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const { achievementItems, education, experience, training } = await getPortfolioContent();
  const lang = await getSiteLang();
  const azmLabsExperience = experience.filter((item) => item.org === "AZM Labs");
  const nonAzmExperience = experience.filter((item) => item.org !== "AZM Labs");
  const careerTimeline = [...nonAzmExperience, ...azmLabsExperience];
  const achievementVisuals = ["/images/placeholders/project-data.svg", "/images/placeholders/project-ml.svg", "/images/simulation-depth.svg", "/images/placeholders/project-embedded.svg"];

  const t = {
    hero: {
      kicker: lang === "bn" ? "অভিজ্ঞতা" : "Experience",
      title: lang === "bn" ? "পেশাগত, গবেষণা ও প্রোডাক্ট যাত্রাপথ" : "Industry, research, and product engineering journey",
      description:
        lang === "bn"
          ? "ডেটা ইঞ্জিনিয়ারিং, টেকনিক্যাল রিসার্চ এবং প্রোডাক্ট ডেলিভারির টাইমলাইন।"
          : "Timeline across data engineering, technical research, and product delivery execution.",
    },
    current: {
      label: lang === "bn" ? "বর্তমান প্রোফাইল" : "Current Profile",
      title: lang === "bn" ? "ইন্ডাস্ট্রি + প্রোডাক্ট ইঞ্জিনিয়ারিং ট্র্যাক" : "Industry + product delivery track",
      detail:
        lang === "bn"
          ? "বর্তমানে Enact Business Solutions-এ Data Engineer হিসেবে এবং AZM Labs-এ Co-Founder ও Software Engineer হিসেবে কাজ করছি।"
          : "I currently work as a Data Engineer at Enact Business Solutions and as Co-Founder/Software Engineer at AZM Labs.",
    },
    pro: {
      eyebrow: lang === "bn" ? "পেশাগত অভিজ্ঞতা" : "Professional Experience",
      title: lang === "bn" ? "ইন্ডাস্ট্রি ও রিসার্চ ভূমিকা" : "Industry and research experience",
      timeline: lang === "bn" ? "পেশাগত টাইমলাইন" : "Professional timeline",
    },
    edu: {
      eyebrow: lang === "bn" ? "শিক্ষা" : "Education",
      title: lang === "bn" ? "একাডেমিক ভিত্তি" : "Academic foundation",
      tag: lang === "bn" ? "শিক্ষা" : "Education",
    },
    train: {
      eyebrow: lang === "bn" ? "ট্রেনিং" : "Training",
      title: lang === "bn" ? "ইন্ডাস্ট্রিয়াল ও টেকনিক্যাল ট্রেনিং" : "Industrial and technical training",
      tag: lang === "bn" ? "ট্রেনিং" : "Training",
    },
    achievements: {
      eyebrow: lang === "bn" ? "অর্জন" : "Achievements",
      title: lang === "bn" ? "নির্বাচিত স্বীকৃতি ও সাফল্য" : "Selected achievements and outcomes",
    },
  };

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero kicker={t.hero.kicker} title={t.hero.title} description={t.hero.description} />
      </Reveal>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.pro.eyebrow} title={t.pro.title} description={t.current.detail} icon={<SparkIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <div className="panel-grid">
            <article className="card card-pad">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">{t.current.label}</p>
              <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">{t.current.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <div className="chip company-chip">
                  <Image src="/images/logos/enact-business-solutions-logo.jpg" alt="Enact Business Solutions logo" width={20} height={20} className="company-chip__logo" />
                  Enact Business Solutions
                </div>
                <div className="chip company-chip">
                  <Image src="/images/azm-labs-logo.png" alt="AZM Labs logo" width={20} height={20} className="company-chip__logo" />
                  AZM Labs
                </div>
              </div>
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-border">
                <Image src="/images/portraits/experience-photo.jpg" alt="Md Mahfuzul Islam in a professional session" fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
              </div>
            </article>

            <article className="card card-pad">
              <div className="inline-flex items-center gap-2">
                <SparkIcon className="h-7 w-7" />
                <h3 className="section-title text-2xl font-semibold tracking-tight">{t.pro.timeline}</h3>
              </div>
              <div className="timeline-rail mt-4">
                {careerTimeline.map((item, idx) => (
                  <Reveal key={`${item.role}-${item.period}`} delay={idx * 0.04}>
                    <ExperienceCard item={item} />
                  </Reveal>
                ))}
              </div>
            </article>
          </div>

          <div className="panel-grid">
            <article className="card h-fit card-pad">
              <DomainVisual variant="data" lang={lang} />
            </article>

            <article className="card card-pad">
              <div className="inline-flex items-center gap-2">
                <GraduationIcon className="h-7 w-7" />
                <h3 className="section-title text-2xl font-semibold tracking-tight">{t.edu.title}</h3>
              </div>
              <div className="timeline-rail mt-4">
                {education.map((item, idx) => (
                  <Reveal key={`${item.degree}-${item.period}`} delay={idx * 0.04}>
                    <article className="card relative card-pad">
                      <span className="timeline-dot" aria-hidden />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="chip chip--accent text-[0.68rem] font-semibold uppercase tracking-[0.14em]">{t.edu.tag}</span>
                        <span className="meta-label">{item.period}</span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold tracking-tight">{item.degree}</h4>
                      <p className="mt-1 text-sm text-muted">{item.institution}</p>
                      <ul className="mt-3.5 space-y-2 text-sm text-muted">
                        {item.details.map((detail) => (
                          <li key={`${item.degree}-${detail}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </article>

            <article className="card card-pad">
              <div className="inline-flex items-center gap-2">
                <BriefcaseIcon className="h-7 w-7" />
                <h3 className="section-title text-2xl font-semibold tracking-tight">{t.train.title}</h3>
              </div>
              <div className="timeline-rail mt-4">
                {training.map((item, idx) => (
                  <Reveal key={`${item.organization}-${item.period}`} delay={idx * 0.04}>
                    <article className="card relative card-pad">
                      <span className="timeline-dot" aria-hidden />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="chip chip--accent text-[0.68rem] font-semibold uppercase tracking-[0.14em]">{t.train.tag}</span>
                        <span className="meta-label">{item.period}</span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted">{item.organization}</p>
                      <ul className="mt-3.5 space-y-2 text-sm text-muted">
                        {item.details.map((detail) => (
                          <li key={`${item.organization}-${detail}`} className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
              </article>
            </div>
          </div>
      </section>

      <section className="section-shell section-shell--with-heading">
        <Reveal>
          <SectionHeading eyebrow={t.achievements.eyebrow} title={t.achievements.title} icon={<TrophyIcon className="h-8 w-8" />} />
        </Reveal>
        <div className="card card-pad-lg">
          <VisualList items={achievementItems} imagePool={achievementVisuals} icon="award" />
        </div>
      </section>
    </div>
  );
}



