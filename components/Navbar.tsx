"use client";

import React from "react";
import { Terminal, Gamepad2, Briefcase, Code2, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";

interface NavbarProps {
  viewMode: "developer" | "recruiter";
  onToggleViewMode: (mode: "developer" | "recruiter") => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  isGameActive: boolean;
  onToggleGame: () => void;
}

export function Navbar({
  viewMode,
  onToggleViewMode,
  lang,
  onToggleLang,
  isGameActive,
  onToggleGame
}: NavbarProps) {
  const t = UI_TRANSLATIONS.nav;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="flex items-center gap-2.5 font-mono font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-base tracking-tight">martinrot</span>
            <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              v2.6
            </span>
          </a>
        </div>

        {/* Navigation links (Desktop) */}
 {/*        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#proyectos" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.projects[lang]}
          </a>
          <a href="#experiencia" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.experience[lang]}
          </a>
          <a href="#educacion" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.education[lang]}
          </a>
          <a href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.skills[lang]}
          </a>
          <a href="#sobre-mi" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.about[lang]}
          </a>
          <a href="#contacto" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {t.contact[lang]}
          </a>
        </nav> */}

        {/* Actions / Modes */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (ES / EN) */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onToggleLang("es")}
              className={`px-2 py-1 rounded-lg transition-all ${
                lang === "es"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onToggleLang("en")}
              className={`px-2 py-1 rounded-lg transition-all ${
                lang === "en"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Recruiter vs Developer Switcher */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => onToggleViewMode("recruiter")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === "recruiter"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title="Vista para reclutadores"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.recruiterMode[lang]}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleViewMode("developer")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === "developer"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title="Vista enfocada en arquitectura y código"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.devMode[lang]}</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="hidden sm:flex items-center gap-1">
            <a
              href="https://github.com/martinrot"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              aria-label="GitHub de Martin Rotelli"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/martin-rotelli"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              aria-label="LinkedIn de Martin Rotelli"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* DESTROY / CHAOS MODE BUTTON */}
          <button
            type="button"
            onClick={onToggleGame}
            className={`relative group flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
              isGameActive
                ? "bg-rose-600 text-white shadow-rose-500/30 animate-pulse"
                : "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-500/20"
            }`}
            title="Activar juego de plataformas y destrucción en la web"
          >
            <Gamepad2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="hidden xs:inline">
              {isGameActive ? t.chaosActive[lang] : t.chaosMode[lang]}
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
