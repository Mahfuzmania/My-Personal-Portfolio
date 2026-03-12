import type { SiteLang } from "@/lib/lang";

const BN_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bEnact Business Solutions\b/g, "এনঅ্যাক্ট বিজনেস সলিউশন্স"],
  [/\bAZM Labs\b/g, "এজেডএম ল্যাবস"],
  [/\bCo-Founder\b/g, "সহ-প্রতিষ্ঠাতা"],
  [/\bSoftware Engineer\b/g, "সফটওয়্যার ইঞ্জিনিয়ার"],
  [/\bData Engineer\b/g, "ডেটা ইঞ্জিনিয়ার"],
  [/\badmin-managed\b/gi, "অ্যাডমিন-ম্যানেজড"],
  [/\brole-based admin panel\b/gi, "রোল-ভিত্তিক অ্যাডমিন প্যানেল"],
  [/\bcontent operations\b/gi, "কনটেন্ট অপারেশনস"],
  [/\bpipelines?\b/gi, "পাইপলাইন"],
  [/\breconciliation\b/gi, "রিকনসিলিয়েশন"],
  [/\bhandling\b/gi, "হ্যান্ডলিং"],
  [/\barchitecture\b/gi, "স্থাপত্য"],
  [/\bimplementation\b/gi, "বাস্তবায়ন"],
  [/\bdelivery\b/gi, "ডেলিভারি"],
  [/\bplatforms?\b/gi, "প্ল্যাটফর্ম"],
  [/\banalytics-ready\b/gi, "বিশ্লেষণ-প্রস্তুত"],
  [/\bAI\b/g, "এআই"],
];

export function normalizeBnUiText(value: string, lang: SiteLang) {
  if (lang !== "bn" || !value) return value;
  return BN_REPLACEMENTS.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}
