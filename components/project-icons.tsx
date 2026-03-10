import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Binary,
  BookOpen,
  Bot,
  Brain,
  Cable,
  CircuitBoard,
  Cpu,
  Database,
  FileSpreadsheet,
  GaugeCircle,
  ImageIcon,
  Languages,
  Radar,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Wrench,
  Workflow,
} from "lucide-react";
import type { ProjectCategory } from "@/lib/site-data";

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  "AI / Intelligent Systems": Bot,
  "Data Engineering": Database,
  "Machine Learning & Analytics": BarChart3,
  "Engineering Simulation": GaugeCircle,
  "Signal / Image Processing": Activity,
  "Embedded / Systems Work": Cpu,
};

export function getProjectCategoryIcon(category: ProjectCategory): LucideIcon {
  return categoryIcons[category] ?? Workflow;
}

export function getToolIcon(label: string): LucideIcon {
  const value = label.toLowerCase();

  if (value.includes("python")) return Binary;
  if (value.includes("pandas") || value.includes("openpyxl")) return FileSpreadsheet;
  if (value.includes("matlab")) return SlidersHorizontal;
  if (value.includes("simulink")) return CircuitBoard;
  if (value.includes("flask")) return Server;
  if (value.includes("rag") || value.includes("retrieval")) return Search;
  if (value.includes("ocr")) return Languages;
  if (value.includes("ollama") || value.includes("llm")) return Bot;
  if (value.includes("control") || value.includes("pid")) return Wrench;
  if (value.includes("survival")) return Stethoscope;
  if (value.includes("machine learning") || value.includes("scikit")) return Brain;
  if (value.includes("image")) return ImageIcon;
  if (value.includes("signal")) return Activity;
  if (value.includes("statistical") || value.includes("analytics")) return BarChart3;
  if (value.includes("serial") || value.includes("bluetooth")) return Cable;
  if (value.includes("assembly") || value.includes("8051")) return Cpu;
  if (value.includes("clinical") || value.includes("healthcare")) return ShieldCheck;
  if (value.includes("power")) return Radar;
  if (value.includes("data")) return Database;
  if (value.includes("simulation")) return GaugeCircle;

  return BookOpen;
}
