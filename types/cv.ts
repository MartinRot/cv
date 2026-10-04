export type Language = "es" | "en";

export interface LocalizedString {
  es: string;
  en: string;
}

export interface LocalizedStringArray {
  es: string[];
  en: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: LocalizedString;
  description: LocalizedString;
  role: LocalizedString;
  year: string;
  tags: string[];
  metrics?: LocalizedString;
  architectureDetails: LocalizedStringArray;
  githubUrl?: string;
  liveUrl?: string;
  secondaryLiveUrl?: string;
  category: "Full Stack" | "Frontend" | "SaaS / Platform" | "Mobile / PWA" | "Browser Game";
  featured: boolean;
  hp: number;
}

export interface SkillCategory {
  name: LocalizedString;
  skills: { name: string; level: LocalizedString; icon?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: LocalizedString;
  company: string;
  website?: string;
  description: LocalizedString;
  highlights: LocalizedStringArray;
  technologies: string[];
}

export interface EducationItem {
  period: string;
  degree: LocalizedString;
  institution: string;
  description: LocalizedString;
  technologies?: string[];
  projectUrl?: string;
  status?: LocalizedString;
}
