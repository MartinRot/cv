"use client";

import React, { useState } from "react";
import { PERSONAL_INFO, UI_TRANSLATIONS } from "@/data/cv-data";
import { Language } from "@/types/cv";
import {
  Mail,
  Check,
  Copy,
  MapPin,
  Send,
  FileDown
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

interface ContactSectionProps {
  lang: Language;
  destroyedElements: Set<string>;
  elementHp: Record<string, number>;
}

export function ContactSection({
  lang,
  destroyedElements,
  elementHp
}: ContactSectionProps) {
  const t = UI_TRANSLATIONS.contact;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const cardId = "contact-main-card";
  const isDestroyed = destroyedElements.has(cardId);
  const currentHp = elementHp[cardId] ?? 100;

  return (
    <section id="contacto" className="py-16 sm:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2">
          <Send className="w-4 h-4" />
          <span>{t.badge[lang]}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.title[lang]}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-10">
          {t.desc[lang]}
        </p>

        {isDestroyed ? (
          <div className="rounded-3xl border border-dashed border-rose-500/30 p-8 text-rose-400 font-mono text-sm bg-rose-500/5">
            [ CONTACTO DESTRUIDO - Usa &apos;git checkout --hard&apos; para restaurar ]
          </div>
        ) : (
          <div
            data-destructible="true"
            data-destructible-id={cardId}
            data-hp={currentHp}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-900/90 border border-zinc-800 shadow-2xl relative overflow-hidden"
          >
            {/* Glow ambient */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8">
              {/* Email Pill with Copy */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 font-mono text-sm">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:underline hover:text-emerald-400 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-2 p-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-colors"
                  title="Copiar email"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.location[lang]}</span>
              </div>
            </div>

            {/* Social & Action Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all shadow-md active:scale-95"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub (~/martinrot)</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md active:scale-95"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md active:scale-95"
              >
                <FileDown className="w-4 h-4" />
                <span>{UI_TRANSLATIONS.hero.exportPdf[lang]}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name} • {PERSONAL_INFO.motto}
          </div>
          <div className="flex items-center gap-3 text-zinc-500">
            <span>Next.js 16</span>
            <span>•</span>
            <span>React 19</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Firebase</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
