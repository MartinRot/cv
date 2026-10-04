"use client";

import React from "react";
import { SKILL_CATEGORIES, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import { Cpu, CheckCircle2 } from "lucide-react";

interface SkillsSectionProps {
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function SkillsSection({
  lang,
  destroyedElements,
  elementHp
}: SkillsSectionProps) {
  const t = UI_TRANSLATIONS.skills;

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
          <Cpu className="w-4 h-4" />
          <span>{t.badge[lang]}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.title[lang]}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mb-12">
          {t.desc[lang]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const cardId = `skill-cat-${idx}`;
            const isDestroyed = destroyedElements.has(cardId);
            const currentHp = elementHp[cardId] ?? 100;

            if (isDestroyed) {
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-dashed border-rose-500/30 p-6 flex flex-col items-center justify-center text-center bg-rose-500/5 min-h-[220px]"
                >
                  <span className="font-mono text-xs text-rose-400 font-bold uppercase">
                    [ STACK DESTRUIDO ]
                  </span>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                    {cat.name[lang]}
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
                className="rounded-3xl p-6 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
                      {cat.name[lang]}
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {cat.skills.length} techs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        data-platform="true"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-50 dark:bg-zinc-800/60 hover:bg-emerald-500/10 hover:text-emerald-500 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{skill.name}</span>
                      </div>
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
