"use client";

import React from "react";
import { EXPERIENCES, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import { Briefcase, Calendar, CheckCircle, ExternalLink } from "lucide-react";

interface ExperienceSectionProps {
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function ExperienceSection({
  lang,
  destroyedElements,
  elementHp
}: ExperienceSectionProps) {
  const t = UI_TRANSLATIONS.experience;

  return (
    <section id="experiencia" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
          <Briefcase className="w-4 h-4" />
          <span>{t.badge[lang]}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-12">
          {t.title[lang]}
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const cardId = `exp-item-${idx}`;
            const isDestroyed = destroyedElements.has(cardId);
            const currentHp = elementHp[cardId] ?? 100;

            if (isDestroyed) {
              return (
                <div key={idx} className="relative">
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-rose-500 border-4 border-white dark:border-zinc-950" />
                  <div className="p-4 rounded-2xl border border-dashed border-rose-500/30 text-rose-400 font-mono text-xs">
                    [ TRAYECTORIA DESTRUIDA - {exp.company} ]
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                data-destructible="true"
                data-destructible-id={cardId}
                data-hp={currentHp}
                className="relative group transition-all"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-zinc-950 group-hover:scale-125 transition-transform" />

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.period}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400 font-medium">
                        {exp.company}
                      </span>
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-emerald-500 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                    {exp.role[lang]}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {exp.description[lang]}
                  </p>

                  <div className="space-y-2 mb-4">
                    {exp.highlights[lang].map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
