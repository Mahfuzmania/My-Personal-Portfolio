import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { portfolioContentSchema } from "@/lib/portfolio-schema";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/site-data";

const contentDir = path.join(process.cwd(), "data");
const contentFile = path.join(contentDir, "portfolio-content.json");

async function ensureContentFile() {
  await fs.mkdir(contentDir, { recursive: true });

  try {
    await fs.access(contentFile);
  } catch {
    await fs.writeFile(contentFile, JSON.stringify(defaultPortfolioContent, null, 2), "utf-8");
  }
}

function mergeWithDefaults(raw: unknown): PortfolioContent {
  const incoming = (raw as Partial<PortfolioContent>) ?? {};

  return {
    ...defaultPortfolioContent,
    ...incoming,
    profile: {
      ...defaultPortfolioContent.profile,
      ...(incoming.profile ?? {}),
    },
    featuredProjects: Array.isArray(incoming.featuredProjects)
      ? incoming.featuredProjects
      : defaultPortfolioContent.featuredProjects,
    projects: Array.isArray(incoming.projects)
      ? incoming.projects
      : defaultPortfolioContent.projects,
    technicalFocus: Array.isArray(incoming.technicalFocus)
      ? incoming.technicalFocus
      : defaultPortfolioContent.technicalFocus,
    highlights: Array.isArray(incoming.highlights)
      ? incoming.highlights
      : defaultPortfolioContent.highlights,
    aboutSummary: Array.isArray(incoming.aboutSummary)
      ? incoming.aboutSummary
      : defaultPortfolioContent.aboutSummary,
    workingPhilosophy: Array.isArray(incoming.workingPhilosophy)
      ? incoming.workingPhilosophy
      : defaultPortfolioContent.workingPhilosophy,
    experience: Array.isArray(incoming.experience)
      ? incoming.experience
      : defaultPortfolioContent.experience,
    education: Array.isArray(incoming.education)
      ? incoming.education
      : defaultPortfolioContent.education,
    training: Array.isArray(incoming.training)
      ? incoming.training
      : defaultPortfolioContent.training,
    researchThemes: Array.isArray(incoming.researchThemes)
      ? incoming.researchThemes
      : defaultPortfolioContent.researchThemes,
    skillGroups: Array.isArray(incoming.skillGroups)
      ? incoming.skillGroups
      : defaultPortfolioContent.skillGroups,
    achievementItems: Array.isArray(incoming.achievementItems)
      ? incoming.achievementItems
      : defaultPortfolioContent.achievementItems,
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  noStore();
  await ensureContentFile();

  try {
    const raw = await fs.readFile(contentFile, "utf-8");
    const parsed = JSON.parse(raw);
    return portfolioContentSchema.parse(mergeWithDefaults(parsed));
  } catch {
    return defaultPortfolioContent;
  }
}

export async function savePortfolioContent(nextContent: PortfolioContent) {
  const validated = portfolioContentSchema.parse(nextContent);
  await ensureContentFile();
  await fs.writeFile(contentFile, JSON.stringify(validated, null, 2), "utf-8");
  return validated;
}
