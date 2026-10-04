"use client";

import React from "react";
import { UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import { User, Code2, Rocket, TrendingUp } from "lucide-react";

interface AboutSectionProps {
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function AboutSection({
  lang,
  destroyedElements,
  elementHp
}: AboutSectionProps) {
  const t = UI_TRANSLATIONS.about;
  const cardId = "about-main-card";
  const isDestroyed = destroyedElements.has(cardId);
  const currentHp = elementHp[cardId] ?? 100;

  return (
    <section id="sobre-mi" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
          <User className="w-4 h-4" />
          <span>{t.badge[lang]}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-8">
          {t.title[lang]}
        </h2>

        {isDestroyed ? (
          <div className="rounded-3xl border border-dashed border-rose-500/30 p-8 text-center text-rose-400 font-mono text-sm bg-rose-500/5">
            [ SECCIÓN SOBRE MÍ DESTRUIDA - &apos;git checkout --hard&apos; para restaurar ]
          </div>
        ) : (
          <div
            data-destructible="true"
            data-destructible-id={cardId}
            data-hp={currentHp}
            className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed text-base"
          >
            {lang === "es" ? (
              <p>
                ¡Hola! Soy <strong>Martin.</strong> Mi foco principal como desarrollador frontend y de producto es la intersección entre la <strong>arquitectura escalable</strong>, la <strong>alta performance técnica</strong> y la <strong>experiencia del usuario final</strong>.
              </p>
            ) : (
              <p>
                Hello! I am <strong>Martin Rotelli</strong> (online as <code className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">@martinrot</code>). My core focus as a frontend and product engineer lies at the intersection of <strong>scalable software architecture</strong>, <strong>extreme web performance</strong>, and <strong>exceptional end-user experience</strong>.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-2">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col gap-2">
                <Code2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {t.cleanCode[lang]}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t.cleanCodeDesc[lang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col gap-2">
                <Rocket className="w-5 h-5 text-sky-500" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {t.perfFirst[lang]}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t.perfFirstDesc[lang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {t.businessFocus[lang]}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t.businessFocusDesc[lang]}
                </p>
              </div>
            </div>

            {lang === "es" ? (
              <p>
                He fundado y desarrollado plataformas web de alto tráfico como <strong>Paren La Pelota Futsal</strong> (+500.000 visitas anuales monetizadas con AdSense) y plataformas SaaS completas como <strong>Playoff</strong> con generación dinámica de sitios institucionales y cobro recurrente. Además de la web, estoy aprendiendo a desarrollar aplicaciones móviles con <strong>React Native</strong>.
              </p>
            ) : (
              <p>
                I have founded and architected high-traffic web applications such as <strong>Paren La Pelota Futsal</strong> (+500,000 annual visits monetized with AdSense) and end-to-end SaaS platforms such as <strong>Playoff</strong> featuring dynamic website generation and subscription billing. In addition to web development, I build cross-platform mobile apps using <strong>React Native</strong>.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
