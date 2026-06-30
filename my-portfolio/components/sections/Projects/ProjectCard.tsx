"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

interface ProjectCardProps {
	project: Project;
	view: "grid" | "list";
}

export default function ProjectCard({ project, view }: ProjectCardProps) {
	if (view === "list") {
		return (
			<motion.article
				layout
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 24 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
			>
				<Link
					href={`/projects/${project.slug}`}
					className="group block overflow-hidden bg-card"
				>
					<Image
						src={project.imageSrc}
						alt={project.imageAlt}
						width={900}
						height={520}
						className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
					/>
				</Link>

				<div className="flex flex-col justify-between py-1">
					<div>
						<h2 className="text-3xl font-black uppercase tracking-tighter text-logic md:text-4xl">
							{project.title}
						</h2>

						<p className="mt-2 text-sm font-bold text-muted-cream">
							{project.date}
						</p>

						<p className="mt-8 max-w-md text-lg font-bold leading-relaxed text-muted-cream">
							{project.description}
						</p>
					</div>

					<div className="mt-10 flex flex-wrap justify-end gap-2 text-xs font-black uppercase italic tracking-[-0.03em] text-logic">
						{project.tags.map((tag, index) => (
							<span key={tag}>
								{index > 0 ? " // " : ""}
								{tag}
							</span>
						))}
					</div>
				</div>
			</motion.article>
		);
	}

	return (
		<motion.article
			layout
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 24 }}
			transition={{ duration: 0.35, ease: "easeOut" }}
			className="group"
		>
			<Link href={`/projects/${project.slug}`} className="block">
				<h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.04em] text-logic">
					{project.title}
				</h2>

				<div className="overflow-hidden bg-card">
					<Image
						src={project.imageSrc}
						alt={project.imageAlt}
						width={900}
						height={520}
						className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
					/>
				</div>

				<div className="mt-2 flex items-center justify-between gap-4">
					<p className="text-xs font-bold text-muted-cream">{project.date}</p>

					<div className="flex flex-wrap justify-end gap-1 text-xs font-black uppercase italic tracking-[-0.03em] text-logic">
						{project.tags.map((tag, index) => (
							<span key={tag}>
								{index > 0 ? " // " : ""}
								{tag}
							</span>
						))}
					</div>
				</div>
			</Link>
		</motion.article>
	);
}
