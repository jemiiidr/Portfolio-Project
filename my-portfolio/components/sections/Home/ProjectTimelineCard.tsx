import Image from "next/image";
import type { Project } from "@/types/project";
import LinkButton from "./Buttons";

interface ProjectTimelineCardProps {
  project: Project;
  side: "left" | "right";
}

export default function ProjectTimelineCard({
  project,
  side,
}: ProjectTimelineCardProps) {
  return (
    <article
      data-side={side}
      className="project-card group relative w-full max-w-116 border border-logic/70 bg-blk1 p-7 text-left transition duration-500 hover:scale-[1.035] hover:border-logic"
    >
      <div className="flex items-center gap-4">
        <p className="text-2xl font-black tracking-[-0.06em] text-cream">
          {project.year}
        </p>

        <h3 className="text-2xl font-black tracking-tighter text-cream">
          {project.title}
        </h3>
      </div>

      <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-cream">
        {project.description}
      </p>

      <div className="mt-6 overflow-hidden border border-card-border bg-card">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={900}
          height={520}
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-7 bottom-7 flex translate-y-4 justify-end opacity-0 transition duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <LinkButton href={`/projects/${project.slug}`}>View Project</LinkButton>
      </div>
    </article>
  );
}