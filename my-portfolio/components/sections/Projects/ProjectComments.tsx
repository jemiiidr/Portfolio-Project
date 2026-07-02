"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { ProjectComment } from "@/types/comment";

interface ProjectCommentsProps {
	projectSlug: string;
}

const COMMENTS_PER_PAGE = 3;

export default function ProjectComments({ projectSlug }: ProjectCommentsProps) {
	const [comments, setComments] = useState<ProjectComment[]>([]);
	const [name, setName] = useState("Anonymous User");
	const [message, setMessage] = useState("");
	const [page, setPage] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const totalPages = Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE));

	const paginatedComments = useMemo(() => {
		const start = (page - 1) * COMMENTS_PER_PAGE;
		return comments.slice(start, start + COMMENTS_PER_PAGE);
	}, [comments, page]);

	useEffect(() => {
		async function loadComments() {
			const response = await fetch(`/api/project-comments?projectSlug=${projectSlug}`);
			const data = (await response.json()) as ProjectComment[];
			setComments(data);
		}

		loadComments();
	}, [projectSlug]);

	async function submitComment(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!message.trim()) return;

		setIsSubmitting(true);

		const response = await fetch("/api/project-comments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				projectSlug,
				name,
				message,
			}),
		});

		const newComment = (await response.json()) as ProjectComment;

		setComments((current) => [newComment, ...current]);
		setMessage("");
		setPage(1);
		setIsSubmitting(false);
	}

	return (
		<section className="border-t border-card-border bg-blk2 px-6 py-14 md:px-12">
			<div className="mx-auto max-w-5xl">
				<div className="mb-6">
					<p className="text-sm font-black uppercase tracking-[0.25em] text-logic">
						Discussion
					</p>

					<h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] text-cream">
						Comments
					</h2>
				</div>

				<form onSubmit={submitComment} className="space-y-4">
					<input
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder="Anonymous User"
						className="w-full border border-logic bg-transparent px-4 py-3 text-sm font-bold text-cream outline-none transition placeholder:text-muted-cream focus:bg-blk1"
					/>

					<textarea
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						placeholder="Write your comment..."
						rows={4}
						className="w-full resize-none border border-logic bg-transparent px-4 py-4 text-sm font-bold text-cream outline-none transition placeholder:text-muted-cream focus:bg-blk1"
					/>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isSubmitting}
							className="rounded-full bg-logic px-7 py-3 text-xs font-black uppercase tracking-[0.12em] text-blk1 transition hover:scale-105 disabled:opacity-50"
						>
							{isSubmitting ? "Posting..." : "Post Comment"}
						</button>
					</div>
				</form>

				<div className="mt-10 space-y-4">
					<AnimatePresence mode="popLayout">
						{paginatedComments.length > 0 ? (
							paginatedComments.map((comment) => (
								<motion.article
									key={comment.id}
									layout
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 16 }}
									className="border border-card-border bg-blk1 p-5"
								>
									<div className="flex flex-wrap items-center justify-between gap-3">
										<h3 className="text-sm font-black uppercase text-logic">
											{comment.name}
										</h3>

										<p className="text-xs font-bold text-muted-cream">
											{new Date(comment.createdAt).toLocaleDateString()}
										</p>
									</div>

									<p className="mt-3 text-sm font-medium leading-relaxed text-muted-cream">
										{comment.message}
									</p>
								</motion.article>
							))
						) : (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="border border-card-border bg-blk1 p-5 text-sm font-bold text-muted-cream"
							>
								No comments yet. Be the first to comment.
							</motion.p>
						)}
					</AnimatePresence>
				</div>

				{comments.length > COMMENTS_PER_PAGE && (
					<div className="mt-8 flex items-center justify-center gap-3">
						<button
							type="button"
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={page === 1}
							className="border border-logic px-4 py-2 text-xs font-black uppercase text-cream transition hover:bg-logic hover:text-blk1 disabled:opacity-40"
						>
							Prev
						</button>

						<p className="text-xs font-black uppercase tracking-[0.18em] text-muted-cream">
							Page {page} of {totalPages}
						</p>

						<button
							type="button"
							onClick={() =>
								setPage((current) => Math.min(totalPages, current + 1))
							}
							disabled={page === totalPages}
							className="border border-logic px-4 py-2 text-xs font-black uppercase text-cream transition hover:bg-logic hover:text-blk1 disabled:opacity-40"
						>
							Next
						</button>
					</div>
				)}
			</div>
		</section>
	);
}