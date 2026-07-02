import type { Project } from "@/types/project";

export const projects: Project[] = [
	{
		slug: "breve-coffee-webapp",
		date: "2023",
		title: "Breve Coffee WebApp",
		description:
			"Implemented REST APIs for client-server communication and WebSockets for real-time queue updates, with an integrated payment gateway and database support.",

		thumbnailSrc: "/projects/brevecoffee.png",
		thumbnailAlt: "Breve Coffee WebApp preview",

		images: [
			{
				src: "/projects/brevecoffee/brevecoffee.png",
				alt: "Breve Coffee WebApp preview",
			},
						{
				src: "/projects/brevecoffee/test1.jpg",
				alt: "Image 2",
			},
						{
				src: "/projects/brevecoffee/test2.jpg",
				alt: "iamge 3",
			},
		],

		siteUrl: "https://www.stateofdance.co/",

		tags: ["E-Commerce", "React", "Django", "REST API", "WebSocket"],
	},
	{
		slug: "icauc2026",
		date: "Jan 2026",
		title:
			"Deep Transfer Learning–Based Multi-Class Skin Lesion Recognition and Segmentation for Clinical Decision Support",
		description:
			"Presented in ICAUC 2026 Kuala Lumpur, Malaysia. A deep transfer learning–based skin lesion detection and instance segmentation system using YOLOv12-seg.",

		thumbnailSrc: "/projects/icauc2026.png",
		thumbnailAlt: "ICAUC 2026 preview",

		images: [
			{
				src: "/projects/icauc2026.png",
				alt: "ICAUC 2026 preview",
			},
		],

		tags: ["AI", "Computer Vision", "Deep Learning", "YOLOv12", "Segmentation"],
	},
	{
		slug: "cspa-2026",
		date: "May 2026",
		title:
			"A Closed-Corpus Hybrid Retrieval-Augmented Legal Assistant and Large Language Models for Lex9165 System",
		description:
			"Presented in CSPA 2026 in Shinawatra University, Thailand. A Lex9165 closed-corpus legal assistant using a hybrid RAG architecture with sparse and dense retrieval, reranking, and LLM-based answer generation for reliable, source-grounded legal question answering.",

		thumbnailSrc: "/projects/cspa2026.png",
		thumbnailAlt: "CSPA 2026 preview",

		images: [
			{
				src: "/projects/cspa2026.png",
				alt: "CSPA 2026 preview",
			},
		],

		tags: ["AI", "LLM", "RAG", "NLP", "Legal Tech"],
	},
];