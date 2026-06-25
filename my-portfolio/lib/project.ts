import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "breve-coffee-webapp",
    year: "2023",
    title: "Breve Coffee WebApp",
    description:
      "Implemented REST APIs for client-server communication and WebSockets for real-time queue updates, with an integrated payment gateway and database support.",
    imageSrc: "/projects/placeholder.svg",
    imageAlt: "Breve Coffee WebApp preview",
  },
  {
    slug: "ai-research-system",
    year: "2025",
    title: "AI Research System",
    description:
      "Specialized in artificial intelligence workflows and joined international research conferences for AI-based system development.",
    imageSrc: "/projects/placeholder.svg",
    imageAlt: "AI Research System preview",
  },
  {
    slug: "creative-portfolio",
    year: "2026",
    title: "Creative Portfolio",
    description:
      "Designed and developed a modern portfolio using Next.js, Tailwind CSS, animations, and reusable component architecture.",
    imageSrc: "/projects/placeholder.svg",
    imageAlt: "Creative Portfolio preview",
  },
];