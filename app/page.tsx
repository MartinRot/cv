"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { DestructionGame } from "@/components/game/DestructionGame";
import { Language } from "@/types/cv";

export default function Home() {
  // Default to Recruiter mode as requested by user
  const [viewMode, setViewMode] = useState<"developer" | "recruiter">("recruiter");
  // Default to Spanish with instant switcher to English
  const [lang, setLang] = useState<Language>("es");

  const [isGameActive, setIsGameActive] = useState(false);
  const [destroyedElements, setDestroyedElements] = useState<Set<string>>(new Set());
  const [elementHp, setElementHp] = useState<Record<string, number>>({});

  // Element damage handler (called by the game when projectile hits)
  const handleElementDamage = useCallback((id: string, damage: number) => {
    setElementHp((prev) => {
      const current = prev[id] ?? 100;
      const nextHp = Math.max(0, current - damage);

      if (nextHp === 0) {
        setDestroyedElements((prevDestroyed) => {
          const nextSet = new Set(prevDestroyed);
          nextSet.add(id);
          return nextSet;
        });
      }

      return {
        ...prev,
        [id]: nextHp
      };
    });
  }, []);

  // Reset / Repair all elements (git checkout --hard)
  const handleResetAll = useCallback(() => {
    setDestroyedElements(new Set());
    setElementHp({});
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Top Navbar with Mode & Language Switchers */}
      <Navbar
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        lang={lang}
        onToggleLang={setLang}
        isGameActive={isGameActive}
        onToggleGame={() => setIsGameActive((prev) => !prev)}
      />

      {/* Main CV Content */}
      <main className="relative">
        <Hero
          viewMode={viewMode}
          lang={lang}
          onStartGame={() => setIsGameActive(true)}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <ProjectsSection
          viewMode={viewMode}
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <ExperienceSection
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <EducationSection
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <SkillsSection
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <AboutSection
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />

        <ContactSection
          lang={lang}
          destroyedElements={destroyedElements}
          elementHp={elementHp}
        />
      </main>

      {/* The Destruction Game Canvas Overlay & HUD */}
      <DestructionGame
        isActive={isGameActive}
        lang={lang}
        onClose={() => setIsGameActive(false)}
        destroyedElements={destroyedElements}
        onElementDamage={handleElementDamage}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
