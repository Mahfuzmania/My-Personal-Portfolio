import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { portfolioContentSchema } from "@/lib/portfolio-schema";
import { repairMojibakeDeep } from "@/lib/mojibake";
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
    uiContent: {
      ...defaultPortfolioContent.uiContent,
      ...(incoming.uiContent ?? {}),
      navbarRoleLine: {
        ...defaultPortfolioContent.uiContent.navbarRoleLine,
        ...(incoming.uiContent?.navbarRoleLine ?? {}),
      },
      home: {
        ...defaultPortfolioContent.uiContent.home,
        ...(incoming.uiContent?.home ?? {}),
        profileNarrative: {
          ...defaultPortfolioContent.uiContent.home.profileNarrative,
          ...(incoming.uiContent?.home?.profileNarrative ?? {}),
        },
        scope: {
          ...defaultPortfolioContent.uiContent.home.scope,
          ...(incoming.uiContent?.home?.scope ?? {}),
        },
      },
      about: {
        ...defaultPortfolioContent.uiContent.about,
        ...(incoming.uiContent?.about ?? {}),
        biography: {
          ...defaultPortfolioContent.uiContent.about.biography,
          ...(incoming.uiContent?.about?.biography ?? {}),
        },
        professionalFocus: Array.isArray(incoming.uiContent?.about?.professionalFocus)
          ? incoming.uiContent.about.professionalFocus
          : defaultPortfolioContent.uiContent.about.professionalFocus,
      },
      research: {
        ...defaultPortfolioContent.uiContent.research,
        ...(incoming.uiContent?.research ?? {}),
        technicalInterests: {
          ...defaultPortfolioContent.uiContent.research.technicalInterests,
          ...(incoming.uiContent?.research?.technicalInterests ?? {}),
        },
        explorations: {
          ...defaultPortfolioContent.uiContent.research.explorations,
          ...(incoming.uiContent?.research?.explorations ?? {}),
        },
      },
      resume: {
        ...defaultPortfolioContent.uiContent.resume,
        ...(incoming.uiContent?.resume ?? {}),
        summaryPoints: {
          ...defaultPortfolioContent.uiContent.resume.summaryPoints,
          ...(incoming.uiContent?.resume?.summaryPoints ?? {}),
        },
      },
      contact: {
        ...defaultPortfolioContent.uiContent.contact,
        ...(incoming.uiContent?.contact ?? {}),
        collaborationTopics: {
          ...defaultPortfolioContent.uiContent.contact.collaborationTopics,
          ...(incoming.uiContent?.contact?.collaborationTopics ?? {}),
        },
      },
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
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, ""));
    const merged = mergeWithDefaults(parsed);
    const repaired = repairMojibakeDeep(merged, "bnOnly");
    return portfolioContentSchema.parse(repaired);
  } catch {
    return repairMojibakeDeep(defaultPortfolioContent, "bnOnly");
  }
}

export async function savePortfolioContent(nextContent: PortfolioContent) {
  const repaired = repairMojibakeDeep(nextContent, "bnOnly");
  const validated = portfolioContentSchema.parse(repaired);
  await ensureContentFile();
  await fs.writeFile(contentFile, JSON.stringify(validated, null, 2), "utf-8");
  return validated;
}
