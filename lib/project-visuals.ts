import type { Project, ProjectFigureType } from "@/lib/site-data";
import type { SiteLang } from "@/lib/lang";

export const PROJECT_FIGURE_DIR = "/images/project-figures";
// Drop custom evidence figures into public/images/project-figures and store only the filename in project.figureImage.

export const PROJECT_FIGURE_FILE_HINTS = {
  healthcareDataFlow: "healthcare-data-flow.png",
  ragArchitecture: "rag-architecture.png",
  cmsAdminWorkflow: "cms-admin-workflow.png",
  simulationTradeoffChart: "simulation-tradeoff-chart.png",
  clinicalMlPipeline: "clinical-ml-pipeline.png",
} as const;

const figureTypeLabels: Record<ProjectFigureType, { en: string; bn: string }> = {
  "healthcare-data-flow": { en: "Healthcare Data Flow", bn: "হেলথকেয়ার ডেটা ফ্লো" },
  "rag-retrieval-workflow": { en: "RAG Retrieval Workflow", bn: "RAG রিট্রিভাল ওয়ার্কফ্লো" },
  "cms-publishing-workflow": { en: "CMS Publishing Workflow", bn: "CMS পাবলিশিং ওয়ার্কফ্লো" },
  "simulation-tradeoff-chart": { en: "Simulation Tradeoff Chart", bn: "সিমুলেশন ট্রেড-অফ চার্ট" },
  "control-response-curve": { en: "Control Response Curve", bn: "কন্ট্রোল রেসপন্স কার্ভ" },
  "clinical-ml-pipeline": { en: "Clinical ML Pipeline", bn: "ক্লিনিক্যাল এমএল পাইপলাইন" },
  "signal-processing-pipeline": { en: "Signal Processing Pipeline", bn: "সিগন্যাল প্রসেসিং পাইপলাইন" },
  "embedded-system-diagram": { en: "Embedded System Diagram", bn: "এমবেডেড সিস্টেম ডায়াগ্রাম" },
};

const figureTypeFallbackImage: Record<ProjectFigureType, string> = {
  "healthcare-data-flow": "/images/placeholders/project-data.svg",
  "rag-retrieval-workflow": "/images/placeholders/project-ai.svg",
  "cms-publishing-workflow": "/images/placeholders/project-data.svg",
  "simulation-tradeoff-chart": "/images/placeholders/project-simulation.svg",
  "control-response-curve": "/images/placeholders/project-simulation.svg",
  "clinical-ml-pipeline": "/images/placeholders/project-ml.svg",
  "signal-processing-pipeline": "/images/placeholders/project-signal.svg",
  "embedded-system-diagram": "/images/placeholders/project-embedded.svg",
};

export function buildFigurePath(fileName: string) {
  if (!fileName) return "";
  if (fileName.startsWith("/")) return fileName;
  return `${PROJECT_FIGURE_DIR}/${fileName}`;
}

export function resolveProjectFigureImage(project: Project) {
  if (project.figureImage) {
    return buildFigurePath(project.figureImage);
  }
  if (project.imagePath) {
    return project.imagePath;
  }
  if (project.figureType) {
    return figureTypeFallbackImage[project.figureType];
  }
  return "/images/placeholders/project-data.svg";
}

export function getProjectFigureLabel(figureType: ProjectFigureType | undefined, lang: SiteLang) {
  if (!figureType) return null;
  return figureTypeLabels[figureType][lang];
}

export function resolveProjectLinks(project: Project) {
  const links = (project.links ?? []).filter(Boolean);
  const merged = project.repoUrl ? [project.repoUrl, ...links] : links;
  return [...new Set(merged)];
}
