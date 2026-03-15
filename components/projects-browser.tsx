"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { SiteLang } from "@/lib/lang";
import type { Project, ProjectCategory } from "@/lib/site-data";

type ProjectsBrowserProps = {
  projects: Project[];
  lang: SiteLang;
};

type CategoryFilter = "All" | ProjectCategory;

const CATEGORY_LABELS_BN: Partial<Record<ProjectCategory, string>> = {
  "Data Engineering": "ডেটা ইঞ্জিনিয়ারিং",
  "Applied AI Systems": "অ্যাপ্লাইড এআই সিস্টেম",
  "Clinical ML / Predictive Analytics": "ক্লিনিক্যাল এমএল / প্রেডিক্টিভ অ্যানালিটিক্স",
  "Simulation / Energy Systems": "সিমুলেশন / এনার্জি সিস্টেম",
  "Control Systems / Simulation": "কন্ট্রোল সিস্টেম / সিমুলেশন",
  "Platform Engineering / CMS Systems": "প্ল্যাটফর্ম ইঞ্জিনিয়ারিং / CMS সিস্টেম",
  "Signal / Image Processing": "সিগন্যাল / ইমেজ প্রসেসিং",
  "Embedded / Systems Work": "এমবেডেড / সিস্টেমস কাজ",
  "AI / Intelligent Systems": "এআই / ইন্টেলিজেন্ট সিস্টেম",
  "Machine Learning & Analytics": "মেশিন লার্নিং ও অ্যানালিটিক্স",
  "Engineering Simulation": "ইঞ্জিনিয়ারিং সিমুলেশন",
};

export function ProjectsBrowser({ projects, lang }: ProjectsBrowserProps) {
  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))] as CategoryFilter[], [projects]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="grid gap-4">
      <div className="card card-pad">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = category === activeCategory;
            const label = category === "All" ? (lang === "bn" ? "সব" : "All") : lang === "bn" ? CATEGORY_LABELS_BN[category] ?? category : category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`chip px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "chip--accent shadow-[0_10px_18px_-12px_rgba(20,61,110,0.7)]"
                    : "hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <motion.div key={project.title} layout transition={{ duration: 0.3 }}>
            <ProjectCard project={project} compact lang={lang} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
