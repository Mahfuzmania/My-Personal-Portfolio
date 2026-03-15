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
      en: "Clinical Data Standardization Flow",
      bn: "হেলথকেয়ার ডেটা ফ্লো",
    },
    icon: "data",
    image: "/images/pipeline-depth.svg",
    imageAlt: {
      en: "Healthcare data pipeline architecture visual",
      bn: "হেলথকেয়ার ডেটা পাইপলাইন আর্কিটেকচার ভিজ্যুয়াল",
    },
    rows: [
      { en: "Source Intake: Oracle + Lab Sheets", bn: "সোর্স ইনটেক: Oracle + ল্যাব শিট" },
      { en: "Cleaning: IDs, Dates, Missing Values", bn: "ক্লিনিং: আইডি, তারিখ, মিসিং ভ্যালু" },
      { en: "Validation: Rule Checks + Reconciliation", bn: "ভ্যালিডেশন: রুল চেক + রিকনসিলিয়েশন" },
      { en: "Output: Analysis-ready Unified Dataset", bn: "আউটপুট: বিশ্লেষণ-রেডি ইউনিফায়েড ডেটাসেট" },
    ],
    metric: {
      en: "Evidence: 70k+ patients integrated with quality gates",
      bn: "70k+ রোগী | 1M+ ল্যাব রেকর্ড",
    },
  },
  ai: {
    title: {
      en: "RAG Retrieval-to-Answer Pipeline",
      bn: "RAG ইন্টেলিজেন্স স্ট্যাক",
    },
    icon: "ai",
    image: "/images/ai-depth.svg",
    imageAlt: {
      en: "AI and RAG pipeline visual",
      bn: "এআই ও RAG পাইপলাইন ভিজ্যুয়াল",
    },
    rows: [
      { en: "Ingestion: Technical Docs and Textbooks", bn: "ইনজেশন: টেকনিক্যাল ডকুমেন্ট ও টেক্সটবুক" },
      { en: "Chunking + Retrieval (BM25/Vector)", bn: "চাঙ্কিং + রিট্রিভাল (BM25/Vector)" },
      { en: "Grounded Response with Citations", bn: "সাইটেশনসহ গ্রাউন্ডেড রেসপন্স" },
      { en: "Bilingual Output Control", bn: "দ্বিভাষিক আউটপুট কন্ট্রোল" },
    ],
    metric: {
      en: "Evidence: citation-backed technical answers",
      bn: "ব্যাখ্যাযোগ্য আউটপুটসহ দ্বিভাষিক সাপোর্ট",
    },
  },
  simulation: {
    title: {
      en: "Simulation and Control Evidence",
      bn: "সিমুলেশন সিগন্যাল লুপ",
    },
    icon: "simulation",
    image: "/images/simulation-depth.svg",
    imageAlt: {
      en: "Engineering simulation flow visual",
      bn: "ইঞ্জিনিয়ারিং সিমুলেশন ফ্লো ভিজ্যুয়াল",
    },
    rows: [
      { en: "Model Setup: Plant + Constraints", bn: "মডেল সেটআপ: প্ল্যান্ট + কনস্ট্রেইন্ট" },
      { en: "Controller Tuning Comparison", bn: "কন্ট্রোলার টিউনিং তুলনা" },
      { en: "Response Curves and Settling Analysis", bn: "রেসপন্স কার্ভ ও সেটলিং অ্যানালাইসিস" },
      { en: "Tradeoff: Efficiency vs Dynamic Response", bn: "ট্রেড-অফ: এফিশিয়েন্সি বনাম ডাইনামিক রেসপন্স" },
    ],
    metric: {
      en: "Evidence: MATLAB/Simulink response plots",
      bn: "MATLAB/Simulink ভিত্তিক পারফরম্যান্স বিশ্লেষণ",
    },
  },
  platform: {
    title: {
      en: "Secure CMS Publishing Workflow",
      bn: "অ্যাডমিন প্ল্যাটফর্ম লুপ",
    },
    icon: "settings",
    image: "/images/placeholders/project-data.svg",
    imageAlt: {
      en: "Admin-managed platform workflow visual",
      bn: "অ্যাডমিন-ম্যানেজড প্ল্যাটফর্ম ওয়ার্কফ্লো ভিজ্যুয়াল",
    },
    rows: [
      { en: "Role Login + Session Controls", bn: "রোল লগইন + সেশন কন্ট্রোল" },
      { en: "Draft, Review, Publish Lifecycle", bn: "ড্রাফট, রিভিউ, পাবলিশ লাইফসাইকেল" },
      { en: "Section-level Content Management", bn: "সেকশন-লেভেল কন্টেন্ট ম্যানেজমেন্ট" },
      { en: "Operational Tracking + Inbox", bn: "অপারেশনাল ট্র্যাকিং + ইনবক্স" },
    ],
    metric: {
      en: "Evidence: secure admin-managed public platforms",
      bn: "নিরাপদ কনটেন্ট অপারেশনসহ দ্বিভাষিক CMS",
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
