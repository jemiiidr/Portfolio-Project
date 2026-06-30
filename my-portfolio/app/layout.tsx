import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const redHatText = Red_Hat_Text({
	subsets: ["latin"],
	variable: "--font-red-hat-text",
});

export const metadata: Metadata = {
	title: "Jamie Del Rosario | Portfolio",
	description:
		"A modern developer portfolio built with Next.js, React, TypeScript, Tailwind, GSAP, and Three.js.",
	openGraph: {
		title: "Jamie Del Rosario | Portfolio",
		description:
			"A modern developer portfolio built with Next.js, React, TypeScript, Tailwind, GSAP, and Three.js.",
		type: "website",
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html lang="en">
			<body
				className={`${redHatText.variable} bg-blk1 font-sans text-cream max-w-screen overflow-x-hidden`}
			>
				<SmoothScroll />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
