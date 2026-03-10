import { z } from "zod";

const projectCategory = z.enum([
  "AI / Intelligent Systems",
  "Data Engineering",
  "Machine Learning & Analytics",
  "Engineering Simulation",
  "Signal / Image Processing",
  "Embedded / Systems Work",
]);

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  detail: z.string().optional(),
  stack: z.array(z.string().min(1)),
  category: projectCategory,
  tags: z.array(z.string().min(1)),
  impact: z.string().optional(),
  contributions: z.array(z.string().min(1)).optional(),
  featured: z.boolean().optional(),
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
  resumePath: z.string().min(1),
  cvPath: z.string().min(1),
  assessmentPath: z.string().min(1),
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
