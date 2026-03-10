import type { ReactNode } from "react";
import {
  Brain,
  Briefcase,
  CircuitBoard,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
  Trophy,
} from "lucide-react";

type IconProps = {
  className?: string;
};

function IconFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-accent-soft text-accent shadow-[0_8px_16px_-12px_rgba(8,14,30,0.9)] ${className}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function BrandMark({ className = "" }: IconProps) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent text-xs font-bold tracking-[0.12em] text-white ${className}`}
      aria-label="AZM brand mark"
    >
      AZ
    </span>
  );
}

export function GithubIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Github className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Linkedin className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Mail className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function DatabaseIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Database className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function BrainIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Brain className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function CircuitIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <CircuitBoard className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function BriefcaseIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Briefcase className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function GraduationIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <GraduationCap className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function TrophyIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Trophy className="h-4.5 w-4.5" />
    </IconFrame>
  );
}

export function SparkIcon({ className = "" }: IconProps) {
  return (
    <IconFrame className={className}>
      <Sparkles className="h-4.5 w-4.5" />
    </IconFrame>
  );
}
