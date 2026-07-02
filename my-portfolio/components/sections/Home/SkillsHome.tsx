"use client";

import {
	motion,
	useAnimationFrame,
	useMotionValue,
	type Variants,
} from "motion/react";
import { useEffect, useRef } from "react";
import { skills } from "@/lib/skill";
import SkillCard from "./SkillCard";

const ease = [0.22, 1, 0.36, 1] as const;
const MARQUEE_SPEED = 50; // pixels per second

const reveal: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease },
	},
};

function wrapX(value: number, width: number) {
	if (width <= 0) return value;
	return ((((value % width) + width) % width) - width) % width;
}

export default function SkillsHome() {
	const x = useMotionValue(0);
	const trackRef = useRef<HTMLDivElement | null>(null);
	const loopWidth = useRef(0);
	const isPaused = useRef(false);

	const marqueeSkills = [
		...skills.map((skill) => ({ skill, copy: "first" })),
		...skills.map((skill) => ({ skill, copy: "second" })),
	];

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		loopWidth.current = track.scrollWidth / 2;
	}, []);

	useAnimationFrame((_time, delta) => {
		if (isPaused.current) return;

		const width = loopWidth.current;
		if (width <= 0) return;

		const moveBy = (MARQUEE_SPEED * delta) / 1000;
		x.set(wrapX(x.get() - moveBy, width));
	});

	return (
		<section
			id="skills"
			className="min-h-screen min-w-screen overflow-x-hidden bg-blk2 px-6 py-28 text-cream md:py-32"
		>
			<motion.div
				variants={reveal}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.35 }}
				className="mx-auto max-w-4xl text-center"
			>
				<p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream md:text-sm">
					Skills
				</p>

				<h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
					Technologies I{" "}
					<motion.span
						initial={{ color: "var(--cream)" }}
						whileInView={{ color: "var(--logic)" }}
						viewport={{ once: false, amount: 0.45 }}
						transition={{ duration: 0.8, ease }}
					>
						Work With
					</motion.span>
				</h2>

				<p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-muted-cream md:text-base">
					A toolkit of technologies, frameworks and concepts I have used to build
					modern and impactful solutions.
				</p>
			</motion.div>

			<motion.div
				variants={reveal}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.25 }}
				onMouseEnter={() => {
					isPaused.current = true;
				}}
				onMouseLeave={() => {
					isPaused.current = false;
				}}
				className="mt-10 cursor-grab overflow-hidden py-10 active:cursor-grabbing mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
			>
				<motion.div
					ref={trackRef}
					drag="x"
					dragElastic={0.08}
					dragMomentum={false}
					style={{ x }}
					onDragStart={() => {
						isPaused.current = true;
					}}
					onDrag={() => {
						x.set(wrapX(x.get(), loopWidth.current));
					}}
					onDragEnd={() => {
						x.set(wrapX(x.get(), loopWidth.current));
						isPaused.current = false;
					}}
					className="flex w-max gap-8"
				>
					{marqueeSkills.map(({ skill, copy }) => (
						<SkillCard key={`${copy}-${skill.title}`} skill={skill} />
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}