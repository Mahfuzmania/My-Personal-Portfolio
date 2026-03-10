"use client";

import { createElement, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { getProjectCategoryIcon } from "@/components/project-icons";
import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/lib/site-data";

type ProjectsBrowserProps = {
  projects: Project[];
};

type CategoryFilter = "All" | ProjectCategory;

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))] as CategoryFilter[],
    [projects],
  );
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="space-y-6">
      <div className="section-shell p-4">
        <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = category === activeCategory;
          const CategoryIcon =
            category === "All" ? LayoutGrid : getProjectCategoryIcon(category as ProjectCategory);
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-accent text-white shadow-[0_10px_18px_-12px_rgba(20,61,110,0.7)]"
                  : "border border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {createElement(CategoryIcon, { className: "h-3.5 w-3.5", "aria-hidden": true })}
                {category}
              </span>
            </button>
          );
        })}
        </div>
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        {filtered.map((project) => (
          <motion.div key={project.title} layout transition={{ duration: 0.3 }}>
            <ProjectCard project={project} compact />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
