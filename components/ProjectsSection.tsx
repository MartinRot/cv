"use client";

import React, { useState } from "react";
import { PROJECTS, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import {
  ExternalLink,
  Layers,
  Sparkles,
  ShieldAlert,
  Flame,
  Globe
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectsSectionProps {
  viewMode: "developer" | "recruiter";
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function ProjectsSection({
  viewMode,
  lang,
  destroyedElements,
  elementHp
}: ProjectsSectionProps) {
  const t = UI_TRANSLATIONS.projects;
  const [filter, setFilter] = useState<string>("Todos");

  const categories = [
    { id: "Todos", label: { es: "Todos", en: "All" } },
    { id: "SaaS / Platform", label: { es: "SaaS & Plataformas", en: "SaaS & Platforms" } },
    { id: "Browser Game", label: { es: "Juego Web", en: "Browser Game" } },
    { id: "Frontend", label: { es: "Frontend", en: "Frontend" } },
    { id: "Full Stack", label: { es: "Full Stack", en: "Full Stack" } },
    { id: "Mobile / PWA", label: { es: "Mobile / PWA", en: "Mobile / PWA" } }
  ];

  const filteredProjects =
    filter === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
              <Layers className="w-4 h-4" />
              <span>{t.badge[lang]}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              {t.title[lang]}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {t.desc[lang]}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === cat.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isDestroyed = destroyedElements.has(project.id);
            const currentHp = elementHp[project.id] ?? 100;
            const isDamaged = currentHp < 100 && !isDestroyed;

            if (isDestroyed) {
              return (
                <div
                  key={project.id}
                  className="rounded-3xl border border-dashed border-rose-500/30 p-8 flex flex-col items-center justify-center text-center bg-rose-500/5 min-h-[300px] transition-all animate-pulse"
                >
                  <ShieldAlert className="w-8 h-8 text-rose-500 mb-2" />
                  <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider">
                    {t.destroyedTitle[lang]}
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                    {project.title}
                  </p>
                  <span className="text-xs text-zinc-500 mt-2 font-mono">
                    {t.repairHint[lang]}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                data-destructible="true"
                data-destructible-id={project.id}
                data-hp={currentHp}
                className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 ${
                  isDamaged ? "border-amber-500/60 ring-2 ring-amber-500/20" : ""
                }`}
              >
                {/* Health Bar if damaged in Game Mode */}
                {isDamaged && (
                  <div className="absolute top-3 right-4 flex items-center gap-2 bg-zinc-950/80 px-2 py-1 rounded-md border border-amber-500/40 font-mono text-[10px] text-amber-400">
                    <Flame className="w-3 h-3 text-amber-500 animate-bounce" />
                    <span>HP: {currentHp}%</span>
                  </div>
                )}

                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {project.category}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                        title="Ver Código en GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-colors border border-emerald-500/20"
                        title="Visitar sitio"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                    {project.secondaryLiveUrl && (
                      <a
                        href={project.secondaryLiveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors"
                        title="Visitar sitio secundario"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Subtitle / Tagline */}
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
                  {project.tagline[lang]}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {project.description[lang]}
                </p>

                {/* Mode specific highlight */}
                {viewMode === "developer" ? (
                  <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs">
                    <div className="text-zinc-500 dark:text-zinc-400 font-bold mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.architectureTitle[lang]}</span>
                    </div>
                    <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                      {project.architectureDetails[lang].map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  project.metrics && (
                    <div className="mb-6 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      <strong>{t.impactTitle[lang]} </strong>
                      {project.metrics[lang]}
                    </div>
                  )
                )}

                {/* Tags */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      data-platform="true"
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-emerald-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
