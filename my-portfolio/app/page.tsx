import type { Metadata } from "next";
import AboutHome from "@/components/sections/Home/AboutHome";
import ConnectHome from "@/components/sections/Home/ConnectHome";
import HeroSection from "@/components/sections/Home/HeroSection";
import ProjectsHome from "@/components/sections/Home/ProjectsHome";
import SkillsHome from "@/components/sections/Home/SkillsHome";

export const metadata: Metadata = {
	title: "Home | Jamie Del Rosario",
	description:
		"Portfolio homepage of Jamie Del Rosario featuring selected projects, creative development, and contact information.",
	openGraph: {
		title: "Jamie Del Rosario | Portfolio",
		description:
			"A modern developer portfolio homepage built with Next.js and Tailwind.",
		type: "website",
	},
};

export default function HomePage() {
	return (
		<main>
			<HeroSection />
			<AboutHome />
			<SkillsHome />
			<ProjectsHome />
			<ConnectHome />
		</main>
	);
}
