import type { UiIconName } from "@/components/ui-icon";
import type { ProjectCategory } from "@/lib/site-data";

const categoryIcons: Record<ProjectCategory, UiIconName> = {
  "AI / Intelligent Systems": "ai",
  "Data Engineering": "data",
  "Machine Learning & Analytics": "analytics",
  "Engineering Simulation": "simulation",
  "Signal / Image Processing": "signal",
  "Embedded / Systems Work": "embedded",
};

export function getProjectCategoryIcon(category: ProjectCategory): UiIconName {
  return categoryIcons[category] ?? "layers";
}

export function getToolIcon(label: string): UiIconName {
  const value = label.toLowerCase();

  if (value.includes("python") || value.includes("c++") || value.includes("assembly") || value.includes("mide") || value.includes("flask")) return "code";
  if (value.includes("next.js") || value.includes("typescript") || value.includes("tailwind") || value.includes("framer")) return "layers";
  if (value.includes("admin") || value.includes("cms") || value.includes("role-based") || value.includes("workflow")) return "settings";
  if (value.includes("jwt") || value.includes("jose") || value.includes("argon2") || value.includes("session") || value.includes("guard")) return "settings";
  if (value.includes("nodemailer") || value.includes("email")) return "mail";
  if (value.includes("pandas") || value.includes("openpyxl") || value.includes("numpy")) return "data";
  if (value.includes("zod") || value.includes("argon2") || value.includes("jose") || value.includes("jwt")) return "settings";
  if (value.includes("matlab")) return "analytics";
  if (value.includes("simulink")) return "simulation";
  if (value.includes("rag") || value.includes("retrieval") || value.includes("bm25")) return "search";
  if (value.includes("llm") || value.includes("transformer")) return "ai";
  if (value.includes("ocr")) return "document";
  if (value.includes("ollama") || value.includes("llm")) return "ai";
  if (value.includes("control") || value.includes("pid") || value.includes("foc") || value.includes("pmsm")) return "simulation";
  if (value.includes("survival") || value.includes("biostat") || value.includes("statistical") || value.includes("probabilistic")) return "analytics";
  if (value.includes("machine learning") || value.includes("scikit")) return "analytics";
  if (value.includes("image")) return "signal";
  if (value.includes("signal")) return "signal";
  if (value.includes("analytics") || value.includes("model")) return "analytics";
  if (value.includes("serial") || value.includes("bluetooth")) return "link";
  if (value.includes("assembly") || value.includes("8051") || value.includes("embedded") || value.includes("microcontroller")) return "embedded";
  if (value.includes("clinical") || value.includes("healthcare") || value.includes("etl")) return "data";
  if (value.includes("power") || value.includes("energy")) return "simulation";
  if (value.includes("documentation") || value.includes("technical writing")) return "book";
  if (value.includes("api") || value.includes("integration")) return "link";
  if (value.includes("data")) return "data";
  if (value.includes("simulation")) return "simulation";

  return "layers";
}
