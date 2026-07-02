// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProjectCarousel from "@/components/sections/Projects/ProjectCarousel";
import ProjectComments from "@/components/sections/Projects/ProjectComments";
import { projects } from "@/lib/project";

interface ProjectPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug,
	}));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;

	const project = projects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-blk2 text-cream">
			
			<ProjectCarousel images={project.images} />

			<section className="bg-blk2 px-6 py-14 md:px-12">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-xs font-black uppercase tracking-[0.08em] text-logic">
								{project.date}
							</p>

							<h1 className="mt-2 max-w-4xl text-4xl font-black uppercase tracking-[-0.06em] text-cream md:text-5xl">
								{project.title}
							</h1>
						</div>

						{project.siteUrl && (
							<a
								href={project.siteUrl}
								target="_blank"
								rel="noreferrer"
								className="w-fit rounded-full bg-logic px-8 py-3 text-xs font-black uppercase tracking-widest text-blk1 transition hover:scale-105"
							>
								Visit Site
							</a>
						)}
					</div>

					<p className="mt-5 max-w-3xl text-sm font-bold leading-8 text-muted-cream">
						{project.description}
					</p>

					<div className="mt-6 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="bg-logic px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-blk1"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</section>

			<ProjectComments projectSlug={project.slug} />
		</main>
	);
}