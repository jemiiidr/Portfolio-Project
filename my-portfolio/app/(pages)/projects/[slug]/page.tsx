import Image from "next/image";
import { notFound } from "next/navigation";

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
		<main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-20">
			<Image
				src={project.imageSrc}
				alt={project.imageAlt}
				width={1600}
				height={900}
				priority
				className="w-full border border-muted-cream/50 object-cover"
			/>

			<section className="space-y-6">
				<div className="space-y-2">
					<p className="text-xs font-black uppercase tracking-[0.08em] text-logic">
						{project.date}
					</p>

					<h1 className="text-4xl font-black uppercase md:text-5xl">
						{project.title}
					</h1>

					<p className="max-w-3xl leading-8 text-muted-cream">
						{project.description}
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="bg-logic px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-blk1"
						>
							{tag}
						</span>
					))}
				</div>
			</section>
		</main>
	);
}
