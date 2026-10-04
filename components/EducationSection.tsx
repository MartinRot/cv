"use client";

import React from "react";
import { EDUCATION, ACADEMIC_PROJECTS, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import { GraduationCap, ExternalLink, Calendar, Code, CheckCircle } from "lucide-react";

interface EducationSectionProps {
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function EducationSection({
  lang,
  destroyedElements,
  elementHp
}: EducationSectionProps) {
  const t = UI_TRANSLATIONS.education;

  return (
    <section id="educacion" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>{t.badge[lang]}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-12">
          {t.title[lang]}
        </h2>

        {/* Education Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {EDUCATION.map((edu, idx) => {
            const cardId = `edu-card-${idx}`;
            const isDestroyed = destroyedElements.has(cardId);
            const currentHp = elementHp[cardId] ?? 100;

            if (isDestroyed) {
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-dashed border-rose-500/30 p-6 flex flex-col items-center justify-center text-center bg-rose-500/5 min-h-[200px]"
                >
                  <span className="font-mono text-xs text-rose-400 font-bold uppercase">
                    [ EDUCACIÓN DESTRUIDA ]
                  </span>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                    {edu.degree[lang]}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={idx}
                data-destructible="true"
                data-destructible-id={cardId}
                data-hp={currentHp}
                className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{edu.period}</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {edu.degree[lang]}
                    </h3>
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {edu.institution}
                    </h4>
                  </div>

                  {edu.projectUrl && (
                    <a
                      href={edu.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors shrink-0"
                      title={t.viewProject[lang]}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed my-3">
                  {edu.description[lang]}
                </p>

                {edu.technologies && (
                  <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1.5">
                    {edu.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Academic Projects Mini Showcase */}
        <div
          data-destructible="true"
          data-destructible-id="academic-projects-bar"
          data-hp={elementHp["academic-projects-bar"] ?? 100}
          className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              {t.academicProjectsTitle[lang]}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ACADEMIC_PROJECTS.map((proj) => (
              <a
                key={proj.title}
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                className="group p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors mb-1">
                    <span>{proj.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    {proj.tech}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
