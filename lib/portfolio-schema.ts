import { z } from "zod";

const projectCategory = z.enum([
  "Data Engineering",
  "Applied AI Systems",
  "Clinical ML / Predictive Analytics",
  "Simulation / Energy Systems",
  "Control Systems / Simulation",
  "Platform Engineering / CMS Systems",
  "Signal / Image Processing",
  "Embedded / Systems Work",
  "AI / Intelligent Systems",
  "Machine Learning & Analytics",
  "Engineering Simulation",
]);

const projectFigureType = z.enum([
  "healthcare-data-flow",
  "rag-retrieval-workflow",
  "cms-publishing-workflow",
  "simulation-tradeoff-chart",
  "control-response-curve",
  "clinical-ml-pipeline",
  "signal-processing-pipeline",
  "embedded-system-diagram",
]);

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  summary: z.string().min(1),
  shortSummary: z.string().min(1).optional(),
  detail: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  outcomes: z.array(z.string().min(1)).optional(),
  provenCapability: z.string().optional(),
  imagePath: z.string().min(1).optional(),
  figureType: projectFigureType.optional(),
  figureImage: z.string().min(1).optional(),
  metrics: z.array(z.string().min(1)).optional(),
  proofAssets: z.array(z.string().min(1)).optional(),
  links: z.array(z.string().min(1)).optional(),
  stack: z.array(z.string().min(1)),
  category: projectCategory,
  tags: z.array(z.string().min(1)),
  impact: z.string().optional(),
  contributions: z.array(z.string().min(1)).optional(),
  featured: z.boolean().optional(),
  publishState: z.enum(["draft", "published"]).optional(),
  visibility: z.enum(["public", "private"]).optional(),
  repoUrl: z.string().url().optional(),
  privateRepo: z.boolean().optional(),
});

const profileSchema = z.object({
  name: z.string().min(1),
  identityLine: z.string().min(1),
  shortIntro: z.string().min(1),
  photoPath: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  secondaryEmail: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  facebook: z.string().url(),
  resumePath: z.string().min(1),
  cvPath: z.string().min(1),
});

const localizedTextSchema = z.object({
  en: z.string().min(1),
  bn: z.string().min(1),
});

const localizedTextListSchema = z.object({
  en: z.array(z.string().min(1)),
  bn: z.array(z.string().min(1)),
});

const workstreamSchema = z.object({
  title: localizedTextSchema,
  detail: localizedTextSchema,
  variant: z.enum(["data", "ai", "simulation", "platform"]),
});

const contextCardSchema = z.object({
  title: localizedTextSchema,
  detail: localizedTextSchema,
});

const uiContentSchema = z.object({
  navbarRoleLine: localizedTextSchema,
  home: z.object({
    workstreams: z.array(workstreamSchema),
    profileNarrative: localizedTextListSchema,
    scope: localizedTextListSchema,
  }),
  about: z.object({
    biography: localizedTextSchema,
    contextCards: z.array(contextCardSchema),
    professionalFocus: z.array(contextCardSchema),
  }),
  research: z.object({
    technicalInterests: localizedTextListSchema,
    explorations: localizedTextListSchema,
  }),
  resume: z.object({
    summaryPoints: localizedTextListSchema,
  }),
  contact: z.object({
    collaborationTopics: localizedTextListSchema,
  }),
});

const focusSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

const experienceSchema = z.object({
  period: z.string().min(1),
  role: z.string().min(1),
  org: z.string().min(1),
  type: z.string().min(1),
  points: z.array(z.string().min(1)),
});

const educationSchema = z.object({
  period: z.string().min(1),
  degree: z.string().min(1),
  institution: z.string().min(1),
  details: z.array(z.string().min(1)),
});

const trainingSchema = z.object({
  period: z.string().min(1),
  title: z.string().min(1),
  organization: z.string().min(1),
  details: z.array(z.string().min(1)),
});

const skillGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)),
});

export const portfolioContentSchema = z.object({
  profile: profileSchema,
  uiContent: uiContentSchema,
  featuredProjects: z.array(projectSchema),
  projects: z.array(projectSchema),
  technicalFocus: z.array(focusSchema),
  highlights: z.array(z.string().min(1)),
  aboutSummary: z.array(z.string().min(1)),
  workingPhilosophy: z.array(z.string().min(1)),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  training: z.array(trainingSchema),
  researchThemes: z.array(z.string().min(1)),
  skillGroups: z.array(skillGroupSchema),
  achievementItems: z.array(z.string().min(1)),
});

export type PortfolioContentInput = z.infer<typeof portfolioContentSchema>;
