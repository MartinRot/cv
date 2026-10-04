"use client";

import React from "react";
import { PERSONAL_INFO, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import {
  Terminal,
  Mail,
  Gamepad2,
  FileDown,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface HeroProps {
  viewMode: "developer" | "recruiter";
  lang: Language;
  onStartGame: () => void;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function Hero({
  viewMode,
  lang,
  onStartGame,
  destroyedElements,
  elementHp
}: HeroProps) {
  const t = UI_TRANSLATIONS.hero;

  const getDamageStyle = (id: string) => {
    if (destroyedElements.has(id)) {
      return "opacity-0 scale-75 pointer-events-none transition-all duration-300";
    }
    const hp = elementHp[id] ?? 100;
    if (hp < 100) {
      return "border-rose-500/50 rotate-1 shadow-rose-500/20";
    }
    return "";
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Availability Badge */}
        <div
          data-destructible="true"
          data-destructible-id="hero-badge"
          data-hp={elementHp["hero-badge"] ?? 100}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-6 backdrop-blur-sm transition-all ${getDamageStyle(
            "hero-badge"
          )}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 -ml-4" />
          <span>{PERSONAL_INFO.availability[lang]}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Title & Bio */}
          <div className="lg:col-span-8">
            <h1
              data-destructible="true"
              data-destructible-id="hero-title"
              data-hp={elementHp["hero-title"] ?? 100}
              className={`text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 transition-all ${getDamageStyle(
                "hero-title"
              )}`}
            >
              {viewMode === "developer" ? (
                <span className="font-mono flex items-center gap-3">
                  <Terminal className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-500 inline-block" />
                  <span>~/martinrot</span>
                </span>
              ) : (
                <span>{PERSONAL_INFO.name}</span>
              )}
            </h1>

            {/* Subtitle / Tech Headline */}
            <h2
              data-destructible="true"
              data-destructible-id="hero-subtitle"
              data-hp={elementHp["hero-subtitle"] ?? 100}
              className={`text-lg sm:text-2xl font-semibold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent mb-3 transition-all ${getDamageStyle(
                "hero-subtitle"
              )}`}
            >
              {PERSONAL_INFO.title}
            </h2>

            {/* Motto */}
            <div className="font-mono text-xs text-zinc-500 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{PERSONAL_INFO.motto}</span>
            </div>

            <p
              data-destructible="true"
              data-destructible-id="hero-bio"
              data-hp={elementHp["hero-bio"] ?? 100}
              className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed mb-8 transition-all ${getDamageStyle(
                "hero-bio"
              )}`}
            >
              {viewMode === "developer"
                ? PERSONAL_INFO.aboutMe.developer[lang]
                : PERSONAL_INFO.aboutMe.recruiter[lang]}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-sm transition-all shadow-md active:scale-95"
              >
                <span>{t.seeProjects[lang]}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:martin_rot@hotmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-sm transition-all active:scale-95"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{t.contactMe[lang]}</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-sm transition-all"
                title="Imprimir o guardar como PDF"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">{t.exportPdf[lang]}</span>
              </button>
            </div>
          </div>

          {/* Gamified Chaos Mode Feature Card */}
          <div className="lg:col-span-4">
            <div
              data-destructible="true"
              data-destructible-id="chaos-teaser-card"
              data-hp={elementHp["chaos-teaser-card"] ?? 100}
              className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-emerald-500/30 text-white shadow-2xl transition-all ${getDamageStyle(
                "chaos-teaser-card"
              )}`}
            >
              {/* Scanline / Arcade ambient */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Gamepad2 className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                    Interactive Easter Egg
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">v2.0</span>
              </div>

              <h3 className="text-lg font-bold mb-2">{t.easterEggTitle[lang]}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                {t.easterEggDesc[lang]}
              </p>

              <button
                type="button"
                onClick={onStartGame}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold font-mono text-sm shadow-lg shadow-emerald-500/25 transition-all active:scale-95 group"
              >
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>{t.activateChaos[lang]}</span>
              </button>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-zinc-500 font-mono">
                  {t.restoreHint[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16">
          {PERSONAL_INFO.stats.map((stat, idx) => {
            const cardId = `stat-card-${idx}`;
            return (
              <div
                key={idx}
                data-destructible="true"
                data-destructible-id={cardId}
                data-hp={elementHp[cardId] ?? 100}
                className={`p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm transition-all ${getDamageStyle(
                  cardId
                )}`}
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  {stat.label[lang]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
