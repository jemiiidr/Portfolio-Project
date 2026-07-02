"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/types/project";
import LinkButton from "./Buttons";

interface ProjectTimelineCardProps {
	project: Project;
	side: "left" | "right";
	expanded: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(min-width: 1024px)");

		function update() {
			setIsDesktop(query.matches);
		}

		update();
		query.addEventListener("change", update);

		return () => {
			query.removeEventListener("change", update);
		};
	}, []);

	return isDesktop;
}

export default function ProjectTimelineCard({
	project,
	side,
	expanded,
}: ProjectTimelineCardProps) {
	const isDesktop = useIsDesktop();
	const isOpen = !isDesktop || expanded;

	return (
		<motion.article
			layout
			data-side={side}
			data-expanded={isOpen}
			whileHover={{ scale: 1.035 }}
			transition={{ duration: 0.5, ease }}
			className="group relative min-h-0 w-full max-w-116 overflow-hidden border border-logic/70 bg-blk1 p-7 text-left transition-colors duration-500 hover:border-logic"
		>
			<div className="flex items-center gap-4">
				<p className="text-right text-2xl font-black tracking-[-0.06em] text-cream">
					{project.date}
				</p>

				<h3 className="text-2xl font-medium tracking-tighter text-cream">
					{project.title}
				</h3>
			</div>

			<motion.div
				layout
				animate={{
					height: isOpen ? "auto" : 0,
					opacity: isOpen ? 1 : 0,
					y: isOpen ? 0 : -12,
				}}
				transition={{
					height: { duration: 0.65, ease },
					opacity: { duration: 0.35 },
					y: { duration: 0.5, ease },
				}}
				className="overflow-hidden"
			>
				<p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-cream">
					{project.description}
				</p>

				<div className="relative mt-6 overflow-hidden border border-card-border bg-card">
					<Image
						src={project.thumbnailSrc}
						alt={project.thumbnailAlt}
						width={900}
						height={520}
						className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
					/>

					<div className="pointer-events-none absolute inset-0 z-10 flex translate-y-4 items-center justify-center opacity-0 transition duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 max-lg:pointer-events-auto max-lg:translate-y-0 max-lg:opacity-100">
						<LinkButton href={`/projects/${project.slug}`}>
							View Project
						</LinkButton>
					</div>
				</div>
			</motion.div>
		</motion.article>
	);
}