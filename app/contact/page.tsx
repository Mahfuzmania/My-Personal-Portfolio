import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { ContactQuickMessageForm } from "@/components/contact-quick-message-form";
import { FacebookIcon, GithubIcon, LinkedInIcon, MailIcon, SparkIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisualList } from "@/components/visual-list";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { repairMojibakeText } from "@/lib/mojibake";

export const dynamic = "force-dynamic";

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

function ContactRow({ icon, label, value }: ContactRowProps) {
  return (
    <div className="contact-row">
      <span className="mt-0.5 text-foreground">{icon}</span>
      <div>
        <span className="contact-row__label">{label}</span>
        <div className="contact-row__value text-[0.98rem] leading-7">{value}</div>
      </div>
    </div>
  );
}

function formatPublicUrl(url: string) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}

export default async function ContactPage() {
  const { profile, uiContent } = await getPortfolioContent();
  const lang = await getSiteLang();
  const tr = (value: string) => normalizeBnUiText(repairMojibakeText(value), lang);
  const coverPhoto = profile.photoPath;
  const collaborationTopics = uiContent.contact.collaborationTopics[lang].map((item) => tr(item));
  const contactVisuals = ["/images/pipeline-depth.svg", "/images/ai-depth.svg", "/images/simulation-depth.svg", "/images/placeholders/project-data.svg"];

  return (
    <div className="page-stack">
      <Reveal>
        <PageHero
          kicker={lang === "bn" ? "যোগাযোগ" : "Contact"}
          title={lang === "bn" ? "টেকনিক্যাল সহযোগিতার জন্য উন্মুক্ত" : "Available for technical collaboration"}
          description={
            lang === "bn"
              ? "ডেটা ইঞ্জিনিয়ারিং, গবেষণা সহযোগিতা এবং বাস্তবায়ন-কেন্দ্রিক সফটওয়্যার প্রজেক্টে কাজের জন্য উন্মুক্ত।"
              : "Open to data engineering, applied AI implementation, and platform-focused technical collaboration across sectors."
          }
        />
      </Reveal>

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <Reveal>
            <article className="card overflow-hidden p-0">
              <div className="contact-media-frame">
                <Image
                  src={coverPhoto}
                  alt={lang === "bn" ? "মোঃ মাহফুজুল ইসলামের ছবি" : "Md Mahfuzul Islam portrait"}
                  fill
                  className="contact-media-image contact-media-image--face"
                  sizes="(max-width: 1024px) 100vw, 580px"
                />
              </div>
              <div className="card-pad-lg">
                <SectionHeading
                  eyebrow={lang === "bn" ? "সরাসরি যোগাযোগ" : "Direct Contact"}
                  title={lang === "bn" ? "আপনার প্রজেক্ট প্ল্যান নিয়ে আলোচনা করি" : "Let's align on your project scope"}
                  description={
                    lang === "bn"
                      ? "ডেটা প্ল্যাটফর্ম, এআই ওয়ার্কফ্লো, অথবা অ্যাডমিন-ম্যানেজড ওয়েবসাইট ডেলিভারি নিয়ে কাজ শুরু করতে প্রসঙ্গ শেয়ার করুন।"
                      : "Share your project context, delivery goals, and constraints across data platforms, AI workflows, or admin-managed websites."
                  }
                  icon={<SparkIcon className="h-8 w-8" />}
                />
                <div className="space-y-3">
                  <ContactRow
                    icon={<MailIcon className="h-6 w-6" />}
                    label={lang === "bn" ? "প্রাথমিক ইমেইল" : "Primary Email"}
                    value={<span className="font-mono break-all">{profile.email}</span>}
                  />
                  <ContactRow
                    icon={<MailIcon className="h-6 w-6" />}
                    label={lang === "bn" ? "বিকল্প ইমেইল" : "Alternative Email"}
                    value={<span className="font-mono break-all">{profile.secondaryEmail}</span>}
                  />
                  <ContactRow
                    icon={<GithubIcon className="h-6 w-6" />}
                    label="GitHub"
                    value={
                      <Link href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                        {formatPublicUrl(profile.github)}
                      </Link>
                    }
                  />
                  <ContactRow
                    icon={<LinkedInIcon className="h-6 w-6" />}
                    label="LinkedIn"
                    value={
                      <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                        {formatPublicUrl(profile.linkedin)}
                      </Link>
                    }
                  />
                  <ContactRow
                    icon={<FacebookIcon className="h-6 w-6" />}
                    label="Facebook"
                    value={
                      <Link href={profile.facebook} target="_blank" rel="noreferrer" className="hover:text-accent">
                        {formatPublicUrl(profile.facebook)}
                      </Link>
                    }
                  />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="card card-pad-lg">
              <h2 className="section-title text-2xl font-semibold">{lang === "bn" ? "দ্রুত বার্তা" : "Quick Message"}</h2>
                <p className="mt-3 text-sm text-muted">
                  {lang === "bn"
                    ? "আপনার প্রজেক্টের স্কোপ, টিম প্রসঙ্গ, ডেলিভারি স্টেজ এবং সম্ভাব্য টাইমলাইন লিখে পাঠান।"
                    : "Send a brief outlining your scope, team context, delivery stage, and expected timeline."}
                </p>
              <p className="mt-1 text-xs text-muted">
                {lang === "bn"
                  ? "ছবি অথবা PDF সহ বার্তা পাঠাতে পারবেন (সর্বোচ্চ ৩টি attachment)।"
                  : "You can attach images or PDFs (up to 3 files)."}
              </p>
              <ContactQuickMessageForm toEmail={profile.email} lang={lang} />
              <div className="accent-line my-6" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{lang === "bn" ? "সহযোগিতার ফোকাস" : "Collaboration Areas"}</p>
                <div className="mt-3">
                  <VisualList items={collaborationTopics} imagePool={contactVisuals} icon="spark" columns="one" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

