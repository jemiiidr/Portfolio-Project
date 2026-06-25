import {
  SiC,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { SkillCard } from "@/types/skill";

export const skills: SkillCard[] = [
  {
    title: "Frontend Development",
    icon: SiReact,
    iconLabel: "React",
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend Development",
    icon: SiC,
    iconLabel: "C",
    tags: ["C", "Java", "Python", "APIs", "Databases"],
  },
  {
    title: "Modern Web Apps",
    icon: SiNextdotjs,
    iconLabel: "Next.js",
    tags: ["Next.js", "Routing", "Server Actions", "Components"],
  },
  {
    title: "UI Engineering",
    icon: SiTailwindcss,
    iconLabel: "Tailwind CSS",
    tags: ["Tailwind", "Responsive UI", "Design Systems"],
  },
  {
    title: "Type-Safe Code",
    icon: SiTypescript,
    iconLabel: "TypeScript",
    tags: ["TypeScript", "Interfaces", "Strict Mode"],
  },
  {
    title: "Interactive Logic",
    icon: SiJavascript,
    iconLabel: "JavaScript",
    tags: ["JavaScript", "Animation", "DOM", "Events"],
  },
  {
    title: "AI Solutions",
    icon: SiPython,
    iconLabel: "Python",
    tags: ["Python", "OpenCV", "YOLO", "Automation"],
  },
];