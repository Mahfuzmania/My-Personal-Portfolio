import type { ReactNode } from "react";
import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandLinkedinFilled } from "@tabler/icons-react";
import { siGooglescholar, siResearchgate } from "simple-icons";
import { UiIcon, type UiIconName } from "@/components/ui-icon";

type IconProps = {
  className?: string;
};

function IconFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`icon-frame ${className}`.trim()} aria-hidden>
      {children}
    </span>
  );
}

function SurfaceIcon({ name, className = "" }: { name: UiIconName; className?: string }) {
  return (
    <IconFrame className={className}>
      <UiIcon name={name} className="h-[56%] w-[56%]" />
    </IconFrame>
  );
}

function BrandMark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <IconFrame className={className}>
      {children}
    </IconFrame>
  );
}

export function GithubIcon({ className = "" }: IconProps) {
  return (
    <BrandMark className={className}>
      <IconBrandGithubFilled className="h-[56%] w-[56%]" stroke={1.9} />
    </BrandMark>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <BrandMark className={`text-[#0A66C2] ${className}`.trim()}>
      <IconBrandLinkedinFilled className="h-[56%] w-[56%]" stroke={1.9} />
    </BrandMark>
  );
}

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <BrandMark className={`text-[#1877F2] ${className}`.trim()}>
      <IconBrandFacebookFilled className="h-[56%] w-[56%]" stroke={1.9} />
    </BrandMark>
  );
}

function SimpleBrandSvg({ path, className = "" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[56%] w-[56%] ${className}`.trim()} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

export function GoogleScholarIcon({ className = "" }: IconProps) {
  return (
    <BrandMark className={`text-[#4285F4] ${className}`.trim()}>
      <SimpleBrandSvg path={siGooglescholar.path} />
    </BrandMark>
  );
}

export function ResearchGateIcon({ className = "" }: IconProps) {
  return (
    <BrandMark className={`text-[#00CCBB] ${className}`.trim()}>
      <SimpleBrandSvg path={siResearchgate.path} />
    </BrandMark>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="mail" className={className} />;
}

export function DatabaseIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="data" className={className} />;
}

export function BrainIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="analytics" className={className} />;
}

export function CircuitIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="simulation" className={className} />;
}

export function BriefcaseIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="briefcase" className={className} />;
}

export function GraduationIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="education" className={className} />;
}

export function TrophyIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="award" className={className} />;
}

export function SparkIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="spark" className={className} />;
}

export function WorkflowIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="settings" className={className} />;
}

export function StrategyIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="analytics" className={className} />;
}

export function SystemsIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="layers" className={className} />;
}

export function CollaborationIcon({ className = "" }: IconProps) {
  return <SurfaceIcon name="link" className={className} />;
}

type BadgeIconName = "role" | "company" | "focus" | "workflow" | "location";

const BADGE_ICON_MAP: Record<BadgeIconName, UiIconName> = {
  role: "briefcase",
  company: "layers",
  focus: "analytics",
  workflow: "settings",
  location: "location",
};

export function BadgeIcon({ name, className = "" }: { name: BadgeIconName; className?: string }) {
  return (
    <span
      className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-accent/35 bg-accent-soft/80 text-accent ${className}`}
      aria-hidden
    >
      <UiIcon name={BADGE_ICON_MAP[name]} className="text-[10px]" />
    </span>
  );
}
