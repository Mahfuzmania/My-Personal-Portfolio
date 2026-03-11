import type { FC, SVGProps } from "react";
import {
  IconApps,
  IconArrowRight,
  IconArrowUpRight,
  IconBook2,
  IconBrain,
  IconBriefcase,
  IconChartLine,
  IconCode,
  IconDatabase,
  IconFileText,
  IconHome,
  IconLanguage,
  IconLayersIntersect,
  IconLink,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconMoon,
  IconSchool,
  IconSearch,
  IconSend,
  IconSettings,
  IconSparkles,
  IconSun,
  IconTrophy,
  IconUser,
  IconWaveSine,
  IconX,
} from "@tabler/icons-react";

type FluentIcon = FC<SVGProps<SVGSVGElement>>;

export type UiIconName =
  | "home"
  | "user"
  | "layers"
  | "research"
  | "briefcase"
  | "resume"
  | "contact"
  | "menu"
  | "close"
  | "language"
  | "sun"
  | "moon"
  | "data"
  | "ai"
  | "analytics"
  | "simulation"
  | "signal"
  | "embedded"
  | "document"
  | "mail"
  | "location"
  | "education"
  | "award"
  | "spark"
  | "search"
  | "settings"
  | "link"
  | "github"
  | "linkedin"
  | "code"
  | "chip"
  | "book"
  | "arrow-right"
  | "arrow-up-right";

const ICON_COMPONENT: Record<UiIconName, FluentIcon> = {
  home: IconHome,
  user: IconUser,
  layers: IconApps,
  research: IconBrain,
  briefcase: IconBriefcase,
  resume: IconFileText,
  contact: IconSend,
  menu: IconMenu2,
  close: IconX,
  language: IconLanguage,
  sun: IconSun,
  moon: IconMoon,
  data: IconDatabase,
  ai: IconSparkles,
  analytics: IconChartLine,
  simulation: IconWaveSine,
  signal: IconWaveSine,
  embedded: IconCode,
  document: IconFileText,
  mail: IconMail,
  location: IconMapPin,
  education: IconSchool,
  award: IconTrophy,
  spark: IconSparkles,
  search: IconSearch,
  settings: IconSettings,
  link: IconLink,
  github: IconCode,
  linkedin: IconLayersIntersect,
  code: IconCode,
  chip: IconSparkles,
  book: IconBook2,
  "arrow-right": IconArrowRight,
  "arrow-up-right": IconArrowUpRight,
};

type UiIconProps = {
  name: UiIconName;
  className?: string;
};

export function UiIcon({ name, className = "" }: UiIconProps) {
  const IconComponent = ICON_COMPONENT[name];
  return <IconComponent aria-hidden className={`ui-icon ${className}`.trim()} />;
}
