export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
  gradient: string;
  icon: string;
}

export interface Skill {
  name: string;
  domain: "languages" | "ml-dl" | "infrastructure" | "systems";
  connections: string[];
  x?: number;
  y?: number;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LabEntry {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric?: string;
}
