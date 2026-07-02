"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProjectTimelineCard from "@/components/sections/Home/ProjectTimelineCard";
import { projects } from "@/lib/project";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease,
		},
	},
};

function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum);
}

export default function ProjectsHome() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const timelineRef = useRef<HTMLDivElement | null>(null);

	const [dotY, setDotY] = useState(0);
	const [endProgress, setEndProgress] = useState(0);
	const [isTimelineComplete, setIsTimelineComplete] = useState(false);
	const [activeProjectIndex, setActiveProjectIndex] = useState(-1);

	useEffect(() => {
		let animationFrameId = 0;

		function updateTimeline() {
			const section = sectionRef.current;
			const timeline = timelineRef.current;

			if (!section || !timeline) return;

			const rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const scrollDistance = rect.height - viewportHeight;
			const rawProgress = scrollDistance > 0 ? -rect.top / scrollDistance : 0;
			const progress = clamp(rawProgress, 0, 1);

			const nextDotY = progress * timeline.offsetHeight;
			const nextEndProgress = clamp((progress - 0.78) / 0.16, 0, 1);

			setDotY(nextDotY);
			setEndProgress(nextEndProgress);
			setIsTimelineComplete(progress > 0.92);

			const dotCenterY = timeline.getBoundingClientRect().top + nextDotY;

			let nextActiveProjectIndex = -1;

			const checkpoints = section.querySelectorAll<HTMLElement>(
				"[data-project-node]",
			);

			checkpoints.forEach((checkpoint, index) => {
				const checkpointRect = checkpoint.getBoundingClientRect();
				const checkpointCenterY =
					checkpointRect.top + checkpointRect.height / 2;

				if (dotCenterY >= checkpointCenterY - 4) {
					nextActiveProjectIndex = index;
				}
			});

			setActiveProjectIndex(nextActiveProjectIndex);
		}

		function requestTimelineUpdate() {
			window.cancelAnimationFrame(animationFrameId);
			animationFrameId = window.requestAnimationFrame(updateTimeline);
		}

		updateTimeline();

		window.addEventListener("scroll", requestTimelineUpdate, {
			passive: true,
		});
		window.addEventListener("resize", requestTimelineUpdate);

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			window.removeEventListener("scroll", requestTimelineUpdate);
			window.removeEventListener("resize", requestTimelineUpdate);
		};
	}, []);

	const endButtonSize = 3 + endProgress * 3;

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="relative min-h-[320vh] overflow-hidden bg-blk2 px-6 pb-28 text-cream md:px-10 max-lg:min-h-auto"
		>
			<motion.div
				variants={reveal}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.35 }}
				className="z-20 mx-auto max-w-3xl pb-28 text-center"
			>
				<p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream">
					Projects
				</p>

				<h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
					Building with{" "}
					<span className="bg-logic px-3 text-blk1">intention.</span>
				</h2>

				<p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-muted-cream">
					Every project begins with curiosity and ends with purpose—whether
					through thoughtful design, scalable software, or emerging technologies.
				</p>
			</motion.div>

			<div className="relative mx-auto mt-32 min-h-[220vh] max-w-7xl pb-128 pt-20 max-lg:min-h-auto max-lg:pb-32">
				<div
					ref={timelineRef}
					className="absolute left-1/2 top-0 bottom-0 hidden w-16 -translate-x-1/2 overflow-visible lg:block"
				>
					<div className="absolute left-1/2 top-0 h-full -translate-x-1/2 border-l border-dashed border-cream/35" />

					<motion.div
						aria-hidden="true"
						animate={{ top: dotY - 112 }}
						transition={{ duration: 0.12, ease: "easeOut" }}
						className="absolute left-1/2 z-3 h-28 w-px -translate-x-1/2 bg-linear-to-b from-transparent to-logic/85 opacity-75"
					/>

					<motion.div
						aria-hidden="true"
						animate={{
							top: dotY,
							width: isTimelineComplete ? 0 : 16,
							height: isTimelineComplete ? 0 : 16,
							opacity: isTimelineComplete ? 0 : 1,
							backgroundColor: isTimelineComplete
								? "var(--logic)"
								: "var(--cream)",
						}}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="absolute left-1/2 z-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
					/>

					<motion.div
						aria-hidden="true"
						animate={{ opacity: isTimelineComplete ? 1 : 0 }}
						transition={{ duration: 0.25 }}
						className="absolute bottom-0 left-1/2 z-2 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-cream"
					/>

					<motion.div
						animate={{
							width: isTimelineComplete ? "6rem" : `${endButtonSize}rem`,
							height: isTimelineComplete ? "6rem" : `${endButtonSize}rem`,
							opacity: isTimelineComplete ? 1 : endProgress,
							borderRadius: "9999px",
							pointerEvents: isTimelineComplete ? "auto" : "none",
						}}
						whileHover={
							isTimelineComplete
								? {
										width: "100vw",
										height: "7rem",
										borderRadius: "0rem",
									}
								: undefined
						}
						transition={{
							width: { duration: 0.65, ease },
							height: { duration: 0.65, ease },
							borderRadius: { duration: 0.75, ease },
							opacity: { duration: 0.25 },
						}}
						className="group absolute bottom-0 left-1/2 z-50 grid -translate-x-1/2 translate-y-1/2 place-items-center overflow-hidden border border-logic/70 bg-logic text-xs font-black uppercase tracking-[0.12em] text-cream"
					>
						<Link
							href="/projects"
							className="absolute inset-0 z-20"
							aria-label="View all projects"
						/>

						<span className="text-2xl leading-none transition duration-300 group-hover:translate-x-8 group-hover:opacity-0">
							→
						</span>

						<span className="pointer-events-none absolute w-max translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
							View all projects
						</span>
					</motion.div>
				</div>

				<div className="space-y-48 md:space-y-60">
					{projects.map((project, index) => {
						const side = index % 2 === 0 ? "right" : "left";

						return (
							<div
								key={project.slug}
								data-side={side}
								className="relative flex w-full justify-center lg:data-[side=left]:justify-start lg:data-[side=right]:justify-end"
							>
								<span
									data-project-node
									aria-hidden="true"
									className="absolute left-1/2 top-9 z-2 hidden size-0 -translate-x-1/2 rounded-full bg-cream lg:block"
								/>

								<ProjectTimelineCard
									project={project}
									side={side}
									expanded={index <= activeProjectIndex}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}