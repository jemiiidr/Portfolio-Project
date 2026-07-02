// src/app/api/project-comments/route.ts
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { ProjectComment } from "@/types/comment";

const commentsPath = path.join(process.cwd(), "lib/project-comments.json");

async function readComments(): Promise<ProjectComment[]> {
	const file = await fs.readFile(commentsPath, "utf-8");
	return JSON.parse(file) as ProjectComment[];
}

async function writeComments(comments: ProjectComment[]) {
	await fs.writeFile(commentsPath, JSON.stringify(comments, null, 2));
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const projectSlug = searchParams.get("projectSlug");

	const comments = await readComments();

	return NextResponse.json(
		projectSlug
			? comments.filter((comment) => comment.projectSlug === projectSlug)
			: comments,
	);
}

export async function POST(request: Request) {
	const body = await request.json();

	const newComment: ProjectComment = {
		id: crypto.randomUUID(),
		projectSlug: body.projectSlug,
		name: body.name?.trim() || "Anonymous User",
		message: body.message?.trim(),
		createdAt: new Date().toISOString(),
	};

	if (!newComment.projectSlug || !newComment.message) {
		return NextResponse.json(
			{ error: "Project slug and message are required." },
			{ status: 400 },
		);
	}

	const comments = await readComments();
	const updatedComments = [newComment, ...comments];

	await writeComments(updatedComments);

	return NextResponse.json(newComment);
}