import { repairMojibakeDeep } from "@/lib/mojibake";

export type ProjectCategory =
  | "Data Engineering"
  | "Applied AI Systems"
  | "Clinical ML / Predictive Analytics"
  | "Simulation / Energy Systems"
  | "Control Systems / Simulation"
  | "Platform Engineering / CMS Systems"
  | "Signal / Image Processing"
  | "Embedded / Systems Work"
  | "AI / Intelligent Systems"
  | "Machine Learning & Analytics"
  | "Engineering Simulation";

export type ProjectFigureType =
  | "healthcare-data-flow"
  | "rag-retrieval-workflow"
  | "cms-publishing-workflow"
  | "simulation-tradeoff-chart"
  | "control-response-curve"
  | "clinical-ml-pipeline"
  | "signal-processing-pipeline"
  | "embedded-system-diagram";

export type ProjectPublishState = "draft" | "published";
export type ProjectVisibility = "public" | "private";

export type Project = {
  title: string;
  slug?: string;
  summary: string;
  shortSummary?: string;
  detail?: string;
  challenge?: string;
  solution?: string;
  outcomes?: string[];
  provenCapability?: string;
  imagePath?: string;
  figureType?: ProjectFigureType;
  figureImage?: string;
  metrics?: string[];
  proofAssets?: string[];
  links?: string[];
  stack: string[];
  category: ProjectCategory;
  tags: string[];
  impact?: string;
  contributions?: string[];
  featured?: boolean;
  publishState?: ProjectPublishState;
  visibility?: ProjectVisibility;
  repoUrl?: string;
  privateRepo?: boolean;
};

export type Profile = {
  name: string;
  identityLine: string;
  shortIntro: string;
  photoPath: string;
  location: string;
  email: string;
  secondaryEmail: string;
  github: string;
  linkedin: string;
  facebook: string;
  googleScholar?: string;
  researchGate?: string;
  resumePath: string;
  cvPath: string;
};

export type Publication = {
  title: string;
  venue: string;
  year: number;
  authors?: string;
  url?: string;
  doi?: string;
  citations?: number;
};

export type IeltsScore = {
  overallBand: string;
  listening?: string;
  reading?: string;
  writing?: string;
  speaking?: string;
  cefrLevel?: string;
};

export type LocalizedText = {
  en: string;
  bn: string;
};

export type LocalizedTextList = {
  en: string[];
  bn: string[];
};

export type WorkstreamVisual = {
  title: LocalizedText;
  detail: LocalizedText;
  variant: "data" | "ai" | "simulation" | "platform";
};

export type LocalizedCard = {
  title: LocalizedText;
  detail: LocalizedText;
};

export type UiContent = {
  navbarRoleLine: LocalizedText;
  home: {
    workstreams: WorkstreamVisual[];
    profileNarrative: LocalizedTextList;
    scope: LocalizedTextList;
  };
  about: {
    biography: LocalizedText;
    contextCards: LocalizedCard[];
    professionalFocus: LocalizedCard[];
  };
  research: {
    technicalInterests: LocalizedTextList;
    explorations: LocalizedTextList;
  };
  resume: {
    summaryPoints: LocalizedTextList;
  };
  contact: {
    collaborationTopics: LocalizedTextList;
  };
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  type: string;
  points: string[];
};

export type EducationItem = {
  period: string;
  degree: string;
  institution: string;
  details: string[];
};

export type TrainingItem = {
  period: string;
  title: string;
  organization: string;
  details: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type FocusItem = {
  title: string;
  detail: string;
};

export type PortfolioContent = {
  profile: Profile;
  uiContent: UiContent;
  featuredProjects: Project[];
  projects: Project[];
  technicalFocus: FocusItem[];
  highlights: string[];
  aboutSummary: string[];
  workingPhilosophy: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  training: TrainingItem[];
  researchThemes: string[];
  skillGroups: SkillGroup[];
  achievementItems: string[];
  publications: Publication[];
  ielts?: IeltsScore;
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "CV / Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const defaultPortfolioContentBase: PortfolioContent = {
  profile: {
    name: "Md Mahfuzul Islam",
    identityLine:
      "Data Engineer and EEE graduate building applied AI, machine learning, and engineering simulation systems for real-world decision support.",
    shortIntro:
      "I design and implement data-driven systems across healthcare analytics, applied machine learning, and control-oriented engineering software, with emphasis on reliability and measurable impact.",
    photoPath: "/images/portraits/mahfuzul-whatsapp-2026-03-11.jpeg",
    location: "Dhaka, Bangladesh",
    email: "mahfuzulislam@iut-dhaka.edu",
    secondaryEmail: "mahfuzulislam41@gmail.com",
    github: "https://github.com/Mahfuzmania",
    linkedin: "https://www.linkedin.com/in/mahfuzul-islam-4366941a5/",
    facebook: "https://www.facebook.com/mahfuzul.islam.280199/",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=y-kOLZ8AAAAJ",
    researchGate: "https://www.researchgate.net/profile/Md-Islam-2284?ev=hdr_xprf",
    resumePath: "/docs/Md_Mahfuzul_Islam_Resume.pdf",
    cvPath: "/docs/Md_Mahfuzul_Islam_CV.pdf",
  },
  uiContent: {
    navbarRoleLine: {
      en: "Data Engineer at Enact Business Solutions",
      bn: "Enact Business Solutions-ÃƒÂ Ã‚Â¦Ã‚Â Data Engineer",
    },
    home: {
      workstreams: [
        {
          title: {
            en: "Healthcare Data Engineering",
            bn: "ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡",
          },
          detail: {
            en: "Designing clinical pipelines that clean, validate, and unify multi-source hospital datasets for reliable analytics and research.",
            bn: "ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿-ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°, ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â€šÂ¬ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Â¤ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‹â€ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          },
          variant: "data",
        },
        {
          title: {
            en: "Applied AI Systems",
            bn: "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¸",
          },
          detail: {
            en: "Building domain-focused AI workflows with retrieval, explainability, and decision-support outputs for technical users.",
            bn: "ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â², explainability ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â§ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤-ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â°ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¹ ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨-ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‹â€ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          },
          variant: "ai",
        },
        {
          title: {
            en: "Engineering Simulation",
            bn: "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨",
          },
          detail: {
            en: "Modeling control and energy systems to evaluate efficiency, robustness, and design tradeoffs with simulation evidence.",
            bn: "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â® ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾, ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â§Ã¢â€šÂ¬ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡-ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â¦Ã‚Â« ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¹ ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          },
          variant: "simulation",
        },
      ],
      profileNarrative: {
        en: [
          "I build implementation-focused data and AI systems where engineering discipline and analytical rigor are equally important.",
          "My current work spans healthcare data integration, machine learning, and simulation-oriented technical problem solving across industry and software engineering contexts.",
        ],
        bn: [
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨-ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â® ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‹â€ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿, ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬â€œÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¥Ã‚Â¤",
          "ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨, ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨-ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â§ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨, ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â°ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â§Ã…Â¸ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¥Ã‚Â¤",
        ],
      },
      scope: {
        en: [
          "Clinical data integration pipelines",
          "Applied ML and statistical modeling",
          "Simulation-led engineering analysis",
          "Research-to-software implementation",
        ],
        bn: [
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡",
          "ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨-ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â£",
          "ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨",
        ],
      },
    },
    about: {
      biography: {
        en: "Md Mahfuzul Islam is a data engineer with an Electrical and Electronic Engineering background, focused on converting research ideas into reliable software systems. His work combines healthcare data engineering, applied machine learning, and engineering simulation with emphasis on data quality, reproducibility, and measurable outcomes.",
        bn: "Md Mahfuzul Islam ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ Data Engineer, ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¿ Electrical and Electronic EngineeringÃƒÂ Ã‚Â¥Ã‚Â¤ ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â¦Ã‚Â§ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Âª ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¥Ã‚Â¤ ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¸ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡, ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨, ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬â€œÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿, ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â§ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¥Ã‚Â¤",
      },
      contextCards: [
        {
          title: {
            en: "Enact Business Solutions",
            bn: "\u098f\u09a8\u0985\u09cd\u09af\u09be\u0995\u09cd\u099f Business Solutions",
          },
          detail: {
            en: "Working as a Data Engineer on healthcare data integration, quality control, and analytics-ready data architecture.",
            bn: "Data Engineer ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨, ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸-ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          },
        },
        {
          title: {
            en: "AZM Labs",
            bn: "\u098f\u099c\u09c7\u09a1\u098f\u09ae Labs",
          },
          detail: {
            en: "Serving as Co-Founder and Software Engineer to shape technical direction and build practical AI and data systems.",
            bn: "Co-Founder ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ Software Engineer ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ AI/Data ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â® ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â£ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã†â€™ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ ÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          },
        },
      ],
      professionalFocus: [
        {
          title: {
            en: "Enact Business Solutions: Healthcare Data Delivery",
            bn: "\u098f\u09a8\u0985\u09cd\u09af\u09be\u0995\u09cd\u099f Business Solutions: \u09b9\u09c7\u09b2\u09a5\u0995\u09c7\u09df\u09be\u09b0 \u09a1\u09c7\u099f\u09be \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf",
          },
          detail: {
            en: "Building analytics-ready healthcare data pipelines with quality validation, reconciliation, and secure handling standards.",
            bn: "\u09b9\u09c7\u09b2\u09a5\u0995\u09c7\u09df\u09be\u09b0 \u09a1\u09c7\u099f\u09be pipeline \u09a4\u09c8\u09b0\u09bf, \u09ae\u09be\u09a8 \u09af\u09be\u099a\u09be\u0987, reconciliation \u098f\u09ac\u0982 \u09a8\u09bf\u09b0\u09be\u09aa\u09a6 handling \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09be\u0964",
          },
        },
        {
          title: {
            en: "AZM Labs: Product and Platform Engineering",
            bn: "\u098f\u099c\u09c7\u09a1\u098f\u09ae Labs: \u09aa\u09cd\u09b0\u09cb\u09a1\u09be\u0995\u09cd\u099f \u0993 \u09aa\u09cd\u09b2\u09cd\u09af\u09be\u099f\u09ab\u09b0\u09cd\u09ae \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09df\u09be\u09b0\u09bf\u0982",
          },
          detail: {
            en: "Leading architecture, implementation, and shipping of practical AI and data products with admin-managed operations.",
            bn: "\u09ac\u09be\u09b8\u09cd\u09a4\u09ac\u09a7\u09b0\u09cd\u09ae\u09c0 AI \u0993 \u09a1\u09c7\u099f\u09be \u09aa\u09cd\u09b0\u09cb\u09a1\u09be\u0995\u09cd\u099f\u09c7\u09b0 architecture, implementation \u098f\u09ac\u0982 delivery-\u098f \u09a8\u09c7\u09a4\u09c3\u09a4\u09cd\u09ac \u09a6\u09c7\u0993\u09df\u09be\u0964",
          },
        },
      ],
    },
    research: {
      technicalInterests: {
        en: [
          "Applied AI for domain-specific technical workflows",
          "Healthcare analytics with high-integrity datasets",
          "Survival and risk modeling for clinical insights",
          "Electrical drive control and system optimization",
        ],
        bn: [
          "ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨-ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¦ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â°ÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¡ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¹ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ survival ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ risk modeling",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â­ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â® ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨",
        ],
      },
      explorations: {
        en: [
          "Bilingual technical assistant design for EE education (RAG + citation workflow)",
          "Controller tuning comparison strategies (series PI, IMC, manual)",
          "Signal and anomaly processing workflows for engineering datasets",
          "Practical bridges between modeling notebooks and deployable systems",
        ],
        bn: [
          "EE ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ bilingual technical assistant design (RAG + citation workflow)",
          "Controller tuning ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¾ (series PI, IMC, manual)",
          "Engineering dataset-ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ signal ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ anomaly processing workflow",
          "Modeling notebook ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ deployable system-ÃƒÂ Ã‚Â¦Ã‚Â ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¬ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â°",
        ],
      },
    },
    resume: {
      summaryPoints: {
        en: [
          "Data Engineer experienced in healthcare data workflows for large, multi-source datasets.",
          "EEE graduate with applied work in machine learning, simulation, and signal/data-driven systems.",
          "Co-Founder and Software Engineer at AZM Labs.",
        ],
        bn: [
          "ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã…â€œ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿-ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸ ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ Data Engineering workflow-ÃƒÂ Ã‚Â¦Ã‚Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â¦Ã‚Â­ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¥Ã‚Â¤",
          "EEE ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â°ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ machine learning, simulation ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ signal/data-driven systems-ÃƒÂ Ã‚Â¦Ã‚Â ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
          "AZM Labs-ÃƒÂ Ã‚Â¦Ã‚Â Co-Founder ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ Software Engineer ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã…â€œ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã¢â‚¬ÂºÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¥Ã‚Â¤",
        ],
      },
    },
    contact: {
      collaborationTopics: {
        en: [
          "Healthcare data engineering and integration pipelines",
          "Applied machine learning, survival modeling, and evaluation design",
          "Engineering simulation and control-oriented system analysis",
          "Technical execution for research and software teams",
        ],
        bn: [
          "ÃƒÂ Ã‚Â¦Ã‚Â¹ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¥ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¨",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¦ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¡ ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡, survival modeling ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ evaluation design",
          "ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã…Â¾ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â²ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨ ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ control-oriented analysis",
          "ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¡ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¦Ã¢â‚¬Å¡ ÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â«ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã¢â‚¬Å“ÃƒÂ Ã‚Â§Ã…Â¸ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã‚Â®ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã‚Â° ÃƒÂ Ã‚Â¦Ã…â€œÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ ÃƒÂ Ã‚Â¦Ã…Â¸ÃƒÂ Ã‚Â§Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¨ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã‚Â² ÃƒÂ Ã‚Â¦Ã‚ÂªÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â‚¬Â¹ÃƒÂ Ã‚Â¦Ã‚Â¡ÃƒÂ Ã‚Â¦Ã‚Â¾ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã…Â¸ ÃƒÂ Ã‚Â¦Ã‚ÂÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â§Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¸ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬Â°ÃƒÂ Ã‚Â¦Ã‚Â¶ÃƒÂ Ã‚Â¦Ã‚Â¨",
        ],
      },
    },
  },
  featuredProjects: [
    {
      title: "Healthcare Data Integration & Analytics Pipeline",
      summary:
        "Large-scale clinical data processing pipeline for Ibrahim Cardiac Hospital & Research Institute, turning complex records into analysis-ready datasets.",
      detail:
        "Designed and implemented Python workflows to clean, validate, and harmonize patient records, laboratory data, and clinical metadata across multiple sources. Added validation checkpoints and reconciliation logic to ensure each data release remained analysis-ready for clinical research teams.",
      stack: [
        "Python",
        "Pandas",
        "OpenPyXL",
        "Data Cleaning",
        "Data Integration",
        "Data Validation",
        "Healthcare Data Processing",
      ],
      category: "Data Engineering",
      tags: ["Healthcare ETL", "Data Quality", "Clinical Analytics"],
      impact:
        "Enabled reliable analysis-ready healthcare datasets for research and reporting workflows.",
      contributions: [
        "Designed Python-based healthcare data processing pipelines",
        "Harmonized large clinical datasets from multiple sources",
        "Resolved duplicate records, ID mismatches, and irregular date formats",
        "Integrated patient and laboratory data into a unified analytical dataset",
        "Performed quality validation and standardization for research usage",
      ],
      featured: true,
      privateRepo: true,
    },
    {
      title: "Electrical Engineering RAG Bot",
      summary:
        "Local-first EE chatbot with retrieval-augmented generation over textbooks, bilingual support (English/Bengali), source citations, and step-by-step answers.",
      detail:
        "Built as a practical AI toolchain for technical learning with retrieval over engineering sources, controllable reasoning detail, and configurable local/remote model support. The system returns cited answers with structured step-by-step explanations in both English and Bengali.",
      stack: ["Python", "Flask", "RAG", "BM25", "OCR", "Ollama"],
      category: "AI / Intelligent Systems",
      tags: ["LLM Tooling", "Education AI", "Retrieval", "Applied Systems"],
      impact: "Demonstrates full-stack AI system design for engineering education.",
      featured: true,
      repoUrl: "https://github.com/Mahfuzmania/EE-Solutions",
    },
    {
      title: "EV Powertrain Simulation",
      summary:
        "MATLAB/Simulink modeling of EV powertrain performance with variable battery sizing and PID control.",
      detail:
        "Time-domain simulation explored acceleration, efficiency, and range tradeoffs across different battery sizing options. Comparative PID control tuning was used to evaluate stability and response quality under varying operating conditions.",
      stack: ["MATLAB", "Simulink", "Control Systems", "PID"],
      category: "Engineering Simulation",
      tags: ["Energy Systems", "Optimization", "Performance Modeling"],
      featured: true,
      repoUrl: "https://github.com/Mahfuzmania/EV-Powertrain-Simulation",
    },
    {
      title: "Breast Cancer Survival Prediction",
      summary:
        "SEER-based survival analysis using Kaplan-Meier, Cox Proportional Hazard, and Random Survival Forest models.",
      detail:
        "Applied Kaplan-Meier, Cox PH, and Random Survival Forest approaches to compare model behavior under real clinical feature distributions. The work emphasized interpretability and risk-aware decision support for healthcare analytics.",
      stack: ["Python", "Scikit-learn", "Survival Analysis", "Jupyter"],
      category: "Machine Learning & Analytics",
      tags: ["Healthcare ML", "Biostatistics", "Predictive Modeling"],
      featured: true,
      repoUrl: "https://github.com/Mahfuzmania/Breast-Cancer-Survival-Prediction",
    },
    {
      title: "Advanced Controller Design and Optimization (PMSM FOC)",
      summary:
        "Technical assessment project on PI current-controller redesign for PMSM field-oriented control with improved settling and robustness.",
      detail:
        "Used series PI controller design, comparative tuning analysis, and simulation-based validation of dynamic response under parameter variations. Performance was assessed using settling-time and robustness indicators aligned with industrial control objectives.",
      stack: ["Control Theory", "FOC", "PMSM", "Simulation Analysis"],
      category: "Engineering Simulation",
      tags: ["Controller Design", "Motor Drives", "Stability"],
      impact:
        "Showcases analytical controller design workflow from problem framing to quantitative validation.",
      featured: true,
      privateRepo: true,
    },
  ],
  projects: [],
  technicalFocus: [
    {
      title: "Data Engineering for Healthcare",
      detail:
        "Robust pipelines for high-volume, multi-source clinical data with strict quality and consistency controls.",
    },
    {
      title: "Applied Machine Learning",
      detail:
        "Production-minded modeling for survival analysis, anomaly detection, and evidence-based decision support.",
    },
    {
      title: "Engineering Modeling & Simulation",
      detail:
        "Control and energy system simulation in MATLAB/Simulink to evaluate performance, stability, and design tradeoffs.",
    },
    {
      title: "AI Tools & Educational Systems",
      detail:
        "RAG and LLM-assisted systems for technical domains with grounded citations and practical user workflows.",
    },
  ],
  highlights: [
    "Built data pipelines integrating roughly 70k patient records and 1M+ laboratory entries for healthcare analytics.",
    "Published survival-analysis work at ICECET 2023 (South Africa) on SEER-based breast cancer outcomes.",
    "Led technical execution and cross-domain collaboration in healthcare AI and data projects.",
    "Co-founding AZM Labs focused on practical data-driven and AI-enabled technical systems.",
  ],
  aboutSummary: [
    "I am a Data Engineer at Enact Business Solutions with an Electrical and Electronic Engineering foundation.",
    "My work combines robust data preparation, applied machine learning, and engineering modeling for practical technical outcomes.",
    "I build healthcare analytics pipelines and decision-support workflows that are reliable, traceable, and research-ready.",
    "In parallel, I am co-founding AZM Labs and working as a software engineer to deliver practical AI and data systems.",
  ],
  workingPhilosophy: [
    "Start with data integrity before modeling decisions.",
    "Use engineering constraints to keep AI systems practical and reliable.",
    "Prefer reproducible pipelines over ad-hoc analysis.",
    "Design for clarity, traceability, and measurable outcomes.",
  ],
  experience: [
    {
      period: "2025 - Present",
      role: "Co-Founder, AZM Labs",
      org: "AZM Labs",
      type: "Product Leadership",
      points: [
        "Defining technical direction for practical AI and data-driven solutions.",
        "Leading roadmap planning, venture operations, and early delivery priorities.",
      ],
    },
    {
      period: "2025 - Present",
      role: "Software Engineer, AZM Labs",
      org: "AZM Labs",
      type: "Product Engineering",
      points: [
        "Building platform modules across data tooling, AI workflows, and software architecture.",
      ],
    },
    {
      period: "Nov 2025 - Present",
      role: "Data Engineer",
      org: "Enact Business Solutions",
      type: "Professional Experience",
      points: [
        "Built Python-based healthcare data pipelines across multiple clinical sources.",
        "Standardized identifiers and timelines to produce integrated analysis-ready datasets.",
        "Implemented end-to-end quality checks for missing values, duplicates, and consistency.",
      ],
    },
    {
      period: "Nov 2024 - Apr 2025",
      role: "Research Engineer (AI & Data Science)",
      org: "AIMS Lab, IRIIC, United International University",
      type: "Technical / Research Experience",
      points: [
        "Contributed to AI healthcare systems including Jotno.AI and Susastho.AI.",
        "Applied NLP and machine learning for symptom screening and risk assessment workflows.",
        "Collaborated with multidisciplinary teams on implementation-oriented research.",
      ],
    },
  ],
  education: [
    {
      period: "Jan 2020 - Jun 2024",
      degree: "B.Sc. in Electrical and Electronic Engineering (CGPA: 3.72/4.00)",
      institution: "Islamic University of Technology (IUT)",
      details: [
        "Relevant focus: AI/ML, biomedical signal processing, power electronics, control systems, power systems.",
        "Undergraduate thesis: EV powertrain modeling and simulation.",
      ],
    },
    {
      period: "2019",
      degree: "Higher Secondary Certificate (GPA 5.00, General Grade Scholarship)",
      institution: "Dinajpur Govt. College, Dinajpur",
      details: ["Science stream with strong mathematics and analytical foundation."],
    },
    {
      period: "2017",
      degree: "Secondary School Certificate (GPA 5.00)",
      institution: "Dinajpur Zilla School, Dinajpur",
      details: ["Early academic distinction and Olympiad track record."],
    },
  ],
  training: [
    {
      period: "Jun 2023",
      title: "Industrial Trainee",
      organization: "Institute of Nuclear Science and Technology",
      details: [
        "Practical sessions on ITU TRIGA Mark-II training and research reactor operations.",
      ],
    },
    {
      period: "May 2023",
      title: "Industrial Trainee",
      organization: "Robi Axiata Limited",
      details: ["Training in telecommunications network systems and communication design."],
    },
    {
      period: "May 2023",
      title: "Industrial Trainee",
      organization: "Bangladesh Power Development Board (BPDB)",
      details: ["Hands-on exposure to steam, gas, and combined cycle power plant systems."],
    },
  ],
  researchThemes: [
    "Healthcare data integration and reliable analytical infrastructure",
    "Survival modeling and interpretable clinical ML",
    "Signal and system-level analysis for biomedical and engineering use-cases",
    "Controller design and performance optimization in electrical drives",
    "Retrieval-augmented AI tools for technical learning and decision support",
  ],
  skillGroups: [
    {
      title: "Backend and Platform Engineering",
      items: [
        "Node.js Runtime",
        "Next.js Route Handlers",
        "TypeScript",
        "REST API Design",
        "Role-Based Admin",
        "CMS Workflows",
        "JSON/Content Persistence",
      ],
    },
    {
      title: "Security and Reliability",
      items: ["Argon2", "JOSE JWT", "Session Cookies", "CSRF Protection", "Rate Limiting", "Zod Validation", "API Route Guarding"],
    },
    {
      title: "Data, AI, and Simulation",
      items: ["Python", "Pandas", "OpenPyXL", "RAG Pipelines", "MATLAB", "Simulink", "Control Systems", "Survival Analysis"],
    },
  ],
  achievementItems: [
    "OIC partial scholarship recipient for academic excellence at IUT.",
    "Champion, 10th Mathematical Olympiad (Higher Secondary Group, Dinajpur).",
    "Conference publication at ICECET 2023.",
    "Director of Operations, Esonance 2023 (major university tech festival).",
  ],
  publications: [
    {
      title: "Survival Analysis of Breast Cancer Patients: A Population-Based Study from SEER",
      authors: "R S Rahman, Al Keats, M A Kabir, A Newaz, M M Islam",
      venue: "2023 International Conference on Electrical, Computer and Energy Technologies (ICECET)",
      year: 2023,
      url: "https://scholar.google.com/citations?hl=en&user=y-kOLZ8AAAAJ",
      citations: 4,
    },
  ],
  ielts: {
    overallBand: "7.5",
    listening: "7.5",
    reading: "9.0",
    writing: "6.5",
    speaking: "6.5",
    cefrLevel: "C1",
  },
};

defaultPortfolioContentBase.projects = [
  ...defaultPortfolioContentBase.featuredProjects,
  {
    title: "Anomaly Detection Using Gaussian Model",
    summary:
      "Server anomaly detection with Gaussian and multivariate density modeling, threshold tuning, and F1-guided evaluation.",
    detail:
      "Built a probabilistic anomaly-detection workflow for server metrics using univariate and multivariate Gaussian models, threshold selection via F1 optimization, and false-positive control analysis for more reliable incident flagging. Designed evaluation steps to balance sensitivity and operational alert quality.",
    stack: ["MATLAB", "Statistical Modeling"],
    category: "Machine Learning & Analytics",
    tags: ["Anomaly Detection", "Probabilistic Methods"],
    repoUrl: "https://github.com/Mahfuzmania/Anomaly-Detection-Using-Gaussian-Model",
  },
  {
    title: "ECG Signal Denoising with Wiener Filtering",
    summary:
      "Biomedical signal enhancement using synchronous averaging, cross-correlation QRS detection, and Wiener filtering.",
    detail:
      "Implemented an ECG-cleaning pipeline combining synchronous averaging, QRS detection through cross-correlation, and Wiener filtering to improve signal quality for downstream waveform interpretation. Focused on preserving diagnostic waveform characteristics while reducing noise artifacts.",
    stack: ["MATLAB", "Signal Processing"],
    category: "Signal / Image Processing",
    tags: ["ECG", "Biomedical Signals", "Filtering"],
    repoUrl: "https://github.com/Mahfuzmania/ECG-Signal-Denoising-Wiener-Filtering",
  },
  {
    title: "Image Thresholding for Background Removal",
    summary:
      "Image preprocessing workflow for white/near-white background removal through threshold-based segmentation.",
    detail:
      "Developed a threshold-based RGB preprocessing workflow to isolate foreground objects from white and near-white backgrounds, with parameter tuning for improved edge preservation and segmentation stability. Added post-processing logic to reduce segmentation noise in edge regions.",
    stack: ["MATLAB", "Image Processing"],
    category: "Signal / Image Processing",
    tags: ["Segmentation", "Thresholding", "Preprocessing"],
    repoUrl: "https://github.com/Mahfuzmania/Image-Thresholding-for-Background-Removal",
  },
  {
    title: "Bluetooth Interfacing with 8051",
    summary:
      "Embedded wireless command-control system with HC-05 and 8051 for LED/LCD/relay/buzzer operations.",
    detail:
      "Engineered an embedded Bluetooth command system around 8051 + HC-05 to control LCD, LEDs, relay modules, and buzzer states through serial protocols. Implemented command parsing, real-time control sequencing, and baseline protection logic for stable operation.",
    stack: ["8051 Assembly", "MIDE 51", "Serial Communication"],
    category: "Embedded / Systems Work",
    tags: ["Microcontroller", "Bluetooth", "Real-time Control"],
    repoUrl: "https://github.com/Mahfuzmania/Bluetooth-Interfacing-8051-Final",
  },
  {
    title: "Two-Area Power System MATLAB Simulink",
    summary:
      "Load-frequency and tie-line dynamic analysis for an interconnected two-area power system.",
    detail:
      "Modeled a two-area interconnected power system in Simulink to analyze load-frequency control behavior, tie-line power deviations, and system response under load disturbances. Evaluated transient and steady-state behavior to support control-focused system understanding.",
    stack: ["MATLAB", "Simulink", "Power Systems"],
    category: "Engineering Simulation",
    tags: ["LFC", "Grid Dynamics", "Frequency Control"],
    repoUrl: "https://github.com/Mahfuzmania/Two-Area-Power-System-MATLAB-Simulink",
  },
  {
    title: "Cardiac EDA Processing",
    summary:
      "Private healthcare ETL pipeline for extracting Oracle exports and multi-sheet labs, then consolidating into curated clinical data assets.",
    detail:
      "Designed a private healthcare ETL workflow that ingests Oracle exports and multi-sheet lab reports, standardizes identifiers and timelines, and outputs curated patient-level datasets for reliable analysis. Added repeatable QC checks to ensure consistency across iterative data refresh cycles.",
    stack: ["Python", "Pandas", "OpenPyXL", "Healthcare ETL"],
    category: "Data Engineering",
    tags: ["Clinical Data", "ETL", "Standardization"],
    privateRepo: true,
  },
  {
    title: "Coronary Angiogram Dataset Cleaning",
    summary:
      "Private workflow for cleaning and standardizing coronary angiogram data including severity classification and derived features.",
    detail:
      "Implemented rule-based cleaning and harmonization for coronary angiogram records, including severity normalization, derived feature generation, and quality checks to reduce analytical noise. Prepared standardized structures suitable for downstream clinical analytics and modeling.",
    stack: ["Python", "Data Cleaning", "Clinical Rules"],
    category: "Data Engineering",
    tags: ["Data Quality", "Feature Engineering", "Clinical Analytics"],
    privateRepo: true,
  },
];

export const defaultPortfolioContent: PortfolioContent = repairMojibakeDeep(defaultPortfolioContentBase, "bnOnly");

