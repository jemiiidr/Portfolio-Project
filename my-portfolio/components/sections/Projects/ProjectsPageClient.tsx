"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/sections/Projects/ProjectCard";
import SearchField from "@/components/sections/Projects/SearchField";
import TagCombobox from "@/components/sections/Projects/TagCombobox";
import ViewToggle from "@/components/sections/Projects/ViewToggle";
import type { Project } from "@/types/project";

interface ProjectsPageClientProps {
	projects: Project[];
}

export default function ProjectsPageClient({
	projects,
}: ProjectsPageClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [view, setView] = useState<"grid" | "list">("grid");

	const availableTags = useMemo(() => {
		const tags = projects.flatMap((project) => project.tags);
		return Array.from(new Set(tags)).sort();
	}, [projects]);

	const filteredProjects = useMemo(() => {
		const normalizedSearch = searchQuery.trim().toLowerCase();

		return projects.filter((project) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				project.title.toLowerCase().includes(normalizedSearch) ||
				project.description.toLowerCase().includes(normalizedSearch) ||
				project.date.toLowerCase().includes(normalizedSearch) ||
				project.tags.some((tag) =>
					tag.toLowerCase().includes(normalizedSearch),
				);

			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.every((selectedTag) => project.tags.includes(selectedTag));

			return matchesSearch && matchesTags;
		});
	}, [projects, searchQuery, selectedTags]);

	function addTag(tag: string) {
		setSelectedTags((currentTags) => {
			if (currentTags.includes(tag)) {
				return currentTags;
			}

			return [...currentTags, tag];
		});
	}

	function removeTag(tag: string) {
		setSelectedTags((currentTags) => {
			return currentTags.filter((currentTag) => currentTag !== tag);
		});
	}

	return (
		<main className="min-h-screen bg-blk2 text-cream">
			<section className="grid min-h-[48vh] place-items-center px-6 pt-28 text-center">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<h1 className="text-5xl font-black uppercase tracking-[-0.06em] md:text-7xl">
						My Projects
					</h1>

					<p className="mt-5 text-base font-bold text-muted-cream md:text-lg">
						A collection of my projects so far
					</p>
				</motion.div>
			</section>

			<section className="border-t border-card-border px-6 py-10 md:px-12">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
						<SearchField
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder="Search"
						/>

						<TagCombobox
							availableTags={availableTags}
							selectedTags={selectedTags}
							onAddTag={addTag}
							onRemoveTag={removeTag}
						/>

						<ViewToggle view={view} onChange={setView} />
					</div>

					<AnimatePresence mode="popLayout">
						{filteredProjects.length > 0 ? (
							<motion.div
								key={view}
								layout
								className={
									view === "grid"
										? "mt-12 grid gap-x-12 gap-y-24 md:grid-cols-2"
										: "mt-12 space-y-28"
								}
							>
								{filteredProjects.map((project) => (
									<ProjectCard
										key={project.slug}
										project={project}
										view={view}
									/>
								))}
							</motion.div>
						) : (
							<motion.div
								key="empty"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 16 }}
								className="py-32 text-center"
							>
								<p className="text-2xl font-black uppercase tracking-[-0.04em] text-logic">
									No projects found
								</p>

								<p className="mt-3 text-sm font-bold text-muted-cream">
									Try another search or remove a selected tag.
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</section>
		</main>
	);
}
