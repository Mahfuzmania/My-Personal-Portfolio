import Image from "next/image";
import type { SiteLang } from "@/lib/lang";
import { UiIcon, type UiIconName } from "@/components/ui-icon";

type DomainVisualProps = {
  variant: "data" | "ai" | "simulation" | "platform";
  lang?: SiteLang;
};

type Localized = {
  en: string;
  bn: string;
};

type VisualConfig = {
  title: Localized;
  icon: UiIconName;
  image: string;
  imageAlt: Localized;
  rows: Localized[];
  metric: Localized;
};

const content: Record<DomainVisualProps["variant"], VisualConfig> = {
  data: {
    title: {
      en: "Healthcare Data Flow",
      bn: "হেলথকেয়ার ডেটা ফ্লো",
    },
    icon: "data",
    image: "/images/pipeline-depth.svg",
    imageAlt: {
      en: "Healthcare data pipeline architecture visual",
      bn: "হেলথকেয়ার ডেটা পাইপলাইন আর্কিটেকচার ভিজ্যুয়াল",
    },
    rows: [
      { en: "Oracle Exports", bn: "Oracle Export" },
      { en: "Lab Sheets", bn: "Lab Sheets" },
      { en: "ID + Date Harmonization", bn: "ID + Date Harmonization" },
      { en: "Unified Clinical Dataset", bn: "Unified Clinical Dataset" },
    ],
    metric: {
      en: "70k+ patients | 1M+ lab records",
      bn: "70k+ রোগী | 1M+ ল্যাব রেকর্ড",
    },
  },
  ai: {
    title: {
      en: "RAG Intelligence Stack",
      bn: "RAG ইন্টেলিজেন্স স্ট্যাক",
    },
    icon: "ai",
    image: "/images/ai-depth.svg",
    imageAlt: {
      en: "AI and RAG pipeline visual",
      bn: "এআই ও RAG পাইপলাইন ভিজ্যুয়াল",
    },
    rows: [
      { en: "Textbook Parsing", bn: "Textbook Parsing" },
      { en: "Retrieval Layer", bn: "Retrieval Layer" },
      { en: "Grounded Response", bn: "Grounded Response" },
      { en: "Citation Support", bn: "Citation Support" },
    ],
    metric: {
      en: "Bilingual support with explainable outputs",
      bn: "Explainable আউটপুটসহ bilingual support",
    },
  },
  simulation: {
    title: {
      en: "Simulation Signal Loop",
      bn: "Simulation Signal Loop",
    },
    icon: "simulation",
    image: "/images/simulation-depth.svg",
    imageAlt: {
      en: "Engineering simulation flow visual",
      bn: "ইঞ্জিনিয়ারিং সিমুলেশন ফ্লো ভিজ্যুয়াল",
    },
    rows: [
      { en: "Plant Modeling", bn: "Plant Modeling" },
      { en: "Controller Tuning", bn: "Controller Tuning" },
      { en: "Efficiency Curves", bn: "Efficiency Curves" },
      { en: "Range/Performance Tradeoff", bn: "Range/Performance Tradeoff" },
    ],
    metric: {
      en: "MATLAB/Simulink performance analysis",
      bn: "MATLAB/Simulink performance analysis",
    },
  },
  platform: {
    title: {
      en: "Admin Platform Loop",
      bn: "অ্যাডমিন প্ল্যাটফর্ম লুপ",
    },
    icon: "settings",
    image: "/images/placeholders/project-data.svg",
    imageAlt: {
      en: "Admin-managed platform workflow visual",
      bn: "অ্যাডমিন-ম্যানেজড প্ল্যাটফর্ম ওয়ার্কফ্লো ভিজ্যুয়াল",
    },
    rows: [
      { en: "Admin Login + Session", bn: "Admin Login + Session" },
      { en: "Role-Based Access", bn: "Role-Based Access" },
      { en: "Content Form Editor", bn: "Content Form Editor" },
      { en: "Tracking + Export", bn: "Tracking + Export" },
    ],
    metric: {
      en: "Bilingual CMS with secure content operations",
      bn: "নিরাপদ কনটেন্ট অপারেশনসহ bilingual CMS",
    },
  },
};

export function DomainVisual({ variant, lang = "en" }: DomainVisualProps) {
  const item = content[variant];

  return (
    <div className="domain-visual">
      <div className="domain-visual__media">
        <Image src={item.image} alt={item.imageAlt[lang]} fill className="domain-visual__image" sizes="(max-width: 768px) 100vw, 420px" />
        <div className="domain-visual__veil" />
        <div className="domain-visual__header">
          <span className="domain-visual__icon-frame">
            <UiIcon name={item.icon} className="text-[15px]" />
          </span>
          <p className="domain-visual__title">{item.title[lang]}</p>
        </div>
      </div>

      <div className="domain-visual__rows">
        {item.rows.map((row) => (
          <div key={`${variant}-${row.en}`} className="domain-visual__row">
            <span className="domain-visual__dot" />
            <span>{row[lang]}</span>
          </div>
        ))}
      </div>

      <p className="domain-visual__metric">{item.metric[lang]}</p>
    </div>
  );
}
