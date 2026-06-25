import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "breve-coffee-webapp",
    year: "2023",
    title: "Breve Coffee WebApp",
    description:
      "Implemented REST APIs for client-server communication and WebSockets for real-time queue updates, with an integrated payment gateway and database support.",
    imageSrc: "/projects/brevecoffee.png",
    imageAlt: "Breve Coffee WebApp preview",
  },
    {
    slug: "icauc2026",
    year: "Jan 2026",
    title: "Deep Transfer Learning–Based Multi-Class Skin Lesion Recognition and Segmentation for Clinical Decision Support",
    description:
      "Presented in ICAUC 2026 Kuala Lumpur, Malaysia. A deep transfer learning–based skin lesion detection and instance segmentation system using YOLOv12-seg",
    imageSrc: "/projects/icauc2026.png",
    imageAlt: "ICAUC 2026 preview",
  },
  {
    slug: "cspa-2026",
    year: "May 2026",
    title: "A Closed-Corpus Hybrid Retrieval-Augmented Legal Assistant and Large Language Models for Lex9165 System",
    description:
      "Presented in CSPA 2026 in Shinawatra University, Thailand. A Lex9165 closed-corpus legal assistant using a hybrid RAG architecture with sparse and dense retrieval, reranking, and LLM-based answer generation for reliable, source-grounded legal question answering.",
    imageSrc: "/projects/cspa2026.png",
    imageAlt: "CSPA 2026 preview",
  },

];