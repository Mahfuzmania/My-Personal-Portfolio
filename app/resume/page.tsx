import { CtaLink } from "@/components/cta-link";
import { DomainEvidenceFrame } from "@/components/domain-evidence-frame";
import { BrandIcon } from "@/components/brand-icon";
import { BriefcaseIcon, DatabaseIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { VisualList } from "@/components/visual-list";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const { profile, skillGroups, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);
  const summaryPoints = uiContent.resume.summaryPoints[lang].map((item) => tr(item));
  const resumeVisuals = ["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/placeholders/project-ml.svg"];
  const skillGroupTitleBn: Record<string, string> = {
    "Backend and Platform Engineering": "ব্যাকএন্ড ও প্ল্যাটফর্ম ইঞ্জিনিয়ারিং",
    "Security and Reliability": "নিরাপত্তা ও নির্ভরযোগ্যতা",
    "Data, AI, and Simulation": "ডেটা, এআই ও সিমুলেশন",
  };

  const localizedSkillGroups =
    lang === "bn"
      ? skillGroups.map((group) => ({
          ...group,
          title: skillGroupTitleBn[group.title] ?? tr(group.title),
          items: group.items.map((item) => tr(item)),
        }))
      : skillGroups;

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero
          kicker={lang === "bn" ? "সিভি / রেজিউমে" : "CV / Resume"}
          title={lang === "bn" ? "প্রোফাইল সামারি ও ডাউনলোডযোগ্য ডকুমেন্ট" : "Professional summary and downloadable documents"}
          description={lang === "bn" ? "দক্ষতা, অভিজ্ঞতা এবং টেকনিক্যাল ফোকাস।" : "Skills, experience, and execution focus in one place."}
          actions={
            <>
              <CtaLink href={profile.resumePath} external>
                {lang === "bn" ? "রেজিউমে ডাউনলোড" : "Download Resume"}
              </CtaLink>
              <CtaLink href={profile.cvPath} secondary external>
                {lang === "bn" ? "সিভি ডাউনলোড" : "Download CV"}
              </CtaLink>
            </>
          }
        />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <article className="card card-pad">
            <div className="mb-4 flex items-center gap-3">
              <BriefcaseIcon className="h-8 w-8" />
              <h2 className="section-title text-2xl font-semibold">{lang === "bn" ? "প্রোফাইল সামারি" : "Professional Summary"}</h2>
            </div>
            <div className="mt-4">
              <VisualList items={summaryPoints} imagePool={resumeVisuals} icon="briefcase" columns="one" />
            </div>
          </article>

          <DomainEvidenceFrame
            variant="data"
            lang={lang}
            title={lang === "bn" ? "ডেলিভারি প্রুফ ফ্রেম" : "Delivery proof frame"}
            description={
              lang === "bn"
                ? "ডেটা ইনজেশন, স্ট্যান্ডার্ডাইজেশন, ভ্যালিডেশন এবং প্রোডাকশন-রেডি হ্যান্ডঅফ ফ্লো।"
                : "Data ingestion, standardization, validation, and production-ready handoff flow."
            }
            rowsLimit={4}
            className="card card-pad"
          />
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-3">
          {localizedSkillGroups.map((group) => (
            <article key={group.title} className="card h-full card-pad">
              <div className="mb-3 flex items-center gap-2">
                <DatabaseIcon className="h-7 w-7" />
                <h3 className="text-lg font-semibold">{tr(group.title)}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    <BrandIcon label={item} className="text-[13px]" />
                    {tr(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

