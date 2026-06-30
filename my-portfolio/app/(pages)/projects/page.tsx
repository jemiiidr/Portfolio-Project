import ProjectsPageClient from "@/components/sections/Projects/ProjectsPageClient";
import { projects } from "@/lib/project";

export default function ProjectsPage() {
  return <ProjectsPageClient projects={projects} />;
}