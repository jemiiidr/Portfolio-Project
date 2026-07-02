export interface ProjectImage {
	src: string;
	alt: string;
}

export interface Project {
	slug: string;
	date: string;
	title: string;
	description: string;

	thumbnailSrc: string;
	thumbnailAlt: string;

	images: ProjectImage[];

	siteUrl?: string;

	tags: string[];
}