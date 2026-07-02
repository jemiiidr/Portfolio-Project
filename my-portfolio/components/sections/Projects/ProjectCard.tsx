"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

interface ProjectCardProps {
	project: Project;
	view: "grid" | "list";
}

const cardVariants: Variants = {
	initial: {
		opacity: 0,
		y: 24,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.35,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: 24,
		transition: {
			duration: 0.25,
			ease: "easeOut",
		},
	},
};

function ProjectImage({ project }: { project: Project }) {
	return (
		<div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-card">
			<Image
				src={project.thumbnailSrc}
				alt={project.thumbnailAlt}
				width={900}
				height={520}
				className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
			/>

			<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />

			<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<span className="font-display text-sm uppercase tracking-[0.25em] text-cream">
					View Project
				</span>
			</div>
		</div>
	);
}

function ProjectTags({ tags }: { tags: string[] }) {
	return (
		<div className="flex flex-wrap justify-end gap-1 text-xs font-black uppercase italic tracking-[-0.03em] text-logic">
			{tags.map((tag, index) => (
				<span key={tag}>
					{index > 0 ? " // " : ""}
					{tag}
				</span>
			))}
		</div>
	);
}

export default function ProjectCard({ project, view }: ProjectCardProps) {
	const isList = view === "list";

	return (
		<motion.article
			layout
			variants={cardVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="group border border-card-border p-5 transition-colors duration-300 hover:border-logic sm:p-6"
		>
			<Link
				href={`/projects/${project.slug}`}
				className={
					isList
						? "grid gap-6 md:grid-cols-[420px_minmax(0,1fr)] md:gap-8"
						: "block"
				}
			>
				{isList ? (
					<>
						<ProjectImage project={project} />

						<div className="flex flex-col justify-between">
							<div>
								<h2 className="text-3xl font-black uppercase tracking-tight text-logic md:text-4xl">
									{project.title}
								</h2>

								<p className="mt-2 text-sm font-bold text-muted-cream">
									{project.date}
								</p>

								<p className="mt-6 text-base font-bold leading-relaxed text-muted-cream md:mt-8 md:text-lg">
									{project.description}
								</p>
							</div>

							<div className="mt-8 md:mt-10">
								<ProjectTags tags={project.tags} />
							</div>
						</div>
					</>
				) : (
					<>
						<h2 className="mb-5 text-2xl font-black uppercase tracking-[-0.04em] text-logic">
							{project.title}
						</h2>

						<ProjectImage project={project} />

						<p className="mt-5 line-clamp-3 text-sm font-bold leading-relaxed text-muted-cream">
							{project.description}
						</p>

						<div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-xs font-bold text-muted-cream">
								{project.date}
							</p>

							<ProjectTags tags={project.tags} />
						</div>
					</>
				)}
			</Link>
		</motion.article>
	);
}