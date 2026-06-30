"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	type Variants,
} from "motion/react";

const typewriterWords = ["CREATE.", "THINK.", "THRIVE."] as const;

const titleLineVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 32,
		scaleY: 0.96,
		filter: "blur(7px)",
	},
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		scaleY: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.85,
			delay: 0.16 + index * 0.12,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

function HeroTitleContent({
	variant,
	onTextEnter,
	onTextLeave,
}: {
	variant: "base" | "highlight";
	onTextEnter?: () => void;
	onTextLeave?: () => void;
}) {
	const isBase = variant === "base";
	const heartClassName = isBase ? "text-heart" : "text-cream";
	const logicClassName = isBase ? "text-logic" : "text-cream";

	const lines: ReactNode[] = [
		"Designing",
		<>
			With <span className={heartClassName}>Heart.</span>
		</>,
		"Building",
		<>
			With <span className={logicClassName}>Logic.</span>
		</>,
	];

	return (
		<>
			{lines.map((line, index) =>
				isBase ? (
					<motion.span
						key={index}
						custom={index}
						variants={titleLineVariants}
						initial="hidden"
						animate="visible"
						className="block"
					>
						<span
							className="inline-block"
							onPointerEnter={onTextEnter}
							onPointerLeave={onTextLeave}
						>
							{line}
						</span>
					</motion.span>
				) : (
					<span key={index} className="block">
						{line}
					</span>
				),
			)}
		</>
	);
}

export default function HeroSection() {
	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);
	const gridX = useMotionValue(0);
	const gridY = useMotionValue(0);
	const titleX = useMotionValue(0);
	const titleY = useMotionValue(0);
	const cursorRadius = useMotionValue(51.2);
	const titleRadius = useMotionValue(0);

	const smoothCursorX = useSpring(cursorX, { stiffness: 420, damping: 45 });
	const smoothCursorY = useSpring(cursorY, { stiffness: 420, damping: 45 });
	const smoothGridX = useSpring(gridX, { stiffness: 180, damping: 30 });
	const smoothGridY = useSpring(gridY, { stiffness: 180, damping: 30 });
	const smoothTitleX = useSpring(titleX, { stiffness: 420, damping: 45 });
	const smoothTitleY = useSpring(titleY, { stiffness: 420, damping: 45 });
	const smoothCursorRadius = useSpring(cursorRadius, {
		stiffness: 280,
		damping: 32,
	});
	const smoothTitleRadius = useSpring(titleRadius, {
		stiffness: 280,
		damping: 32,
	});

	const [displayedWord, setDisplayedWord] = useState("");
	const [wordIndex, setWordIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [showIntroTooltip, setShowIntroTooltip] = useState(true);
	const [isTextHovered, setIsTextHovered] = useState(false);

	const dottedMask = useMotionTemplate`radial-gradient(circle ${smoothCursorRadius}px at ${smoothCursorX}px ${smoothCursorY}px, black 0%, black 98%, transparent 100%)`;

	const titleMask = useMotionTemplate`radial-gradient(circle ${smoothTitleRadius}px at ${smoothTitleX}px ${smoothTitleY}px, black 0%, black 98%, transparent 100%)`;

	useEffect(() => {
		cursorRadius.set(isTextHovered ? 128 : 51.2);
		titleRadius.set(isTextHovered ? 128 : 0);
	}, [cursorRadius, titleRadius, isTextHovered]);

	useEffect(() => {
		const tooltipTimeout = window.setTimeout(() => {
			setShowIntroTooltip(false);
		}, 2600);

		return () => window.clearTimeout(tooltipTimeout);
	}, []);

	useEffect(() => {
		const currentWord = typewriterWords[wordIndex] ?? typewriterWords[0];

		if (!isDeleting && displayedWord === currentWord) {
			const pauseTimeout = window.setTimeout(() => {
				setIsDeleting(true);
			}, 900);

			return () => window.clearTimeout(pauseTimeout);
		}

		if (isDeleting && displayedWord === "") {
			const nextWordTimeout = window.setTimeout(() => {
				setIsDeleting(false);
				setWordIndex((currentIndex) => {
					return (currentIndex + 1) % typewriterWords.length;
				});
			}, 250);

			return () => window.clearTimeout(nextWordTimeout);
		}

		const typingTimeout = window.setTimeout(
			() => {
				const nextLength = displayedWord.length + (isDeleting ? -1 : 1);
				setDisplayedWord(currentWord.slice(0, nextLength));
			},
			isDeleting ? 45 : 90,
		);

		return () => window.clearTimeout(typingTimeout);
	}, [displayedWord, isDeleting, wordIndex]);

	function handlePointerMove(event: PointerEvent<HTMLElement>) {
		const section = event.currentTarget;
		const sectionRect = section.getBoundingClientRect();

		const nextCursorX = event.clientX - sectionRect.left;
		const nextCursorY = event.clientY - sectionRect.top;

		cursorX.set(nextCursorX);
		cursorY.set(nextCursorY);
		gridX.set((nextCursorX - sectionRect.width / 2) / 42);
		gridY.set((nextCursorY - sectionRect.height / 2) / 42);

		const titleElement = section.querySelector("[data-hero-title]");

		if (!(titleElement instanceof HTMLElement)) {
			return;
		}

		const titleRect = titleElement.getBoundingClientRect();

		titleX.set(event.clientX - titleRect.left);
		titleY.set(event.clientY - titleRect.top);
	}

	return (
		<section
			className="relative grid min-h-svh w-full place-items-center overflow-hidden bg-blk1 px-5 py-24 text-center text-cream sm:px-6 sm:py-28 md:min-h-screen md:py-32"
			onPointerMove={handlePointerMove}
		>
			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-75"
				style={{
					backgroundImage:
						"linear-gradient(color-mix(in srgb, var(--cream) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--cream) 4%, transparent) 1px, transparent 1px)",
					backgroundSize: "1.4rem 1.4rem",
					backgroundPositionX: smoothGridX,
					backgroundPositionY: smoothGridY,
				}}
			/>

			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle,var(--cream)_1px,transparent_1px)] bg-[size:1rem_1rem] md:block"
				initial={{ opacity: 0 }}
				animate={{ opacity: isTextHovered ? 0.3 : 0.22 }}
				transition={{ duration: 0.16 }}
				style={{
					WebkitMaskImage: dottedMask,
					maskImage: dottedMask,
				}}
			/>

			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 z-30 hidden rounded-full border border-logic bg-blk1 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-logic md:block"
				initial={{ opacity: 1 }}
				animate={{ opacity: showIntroTooltip ? 1 : 0 }}
				transition={{ duration: 1 }}
				style={{
					x: smoothCursorX,
					y: smoothCursorY,
					translateX: "0.9rem",
					translateY: "0.9rem",
					rotate: -2,
				}}
			>
				<motion.span
					className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-logic"
					initial={{ width: 0 }}
					animate={{ width: "13ch" }}
					transition={{ duration: 0.9, ease: "linear" }}
				>
					Hello there!
				</motion.span>
			</motion.div>

			<div className="relative z-10 mx-auto w-full max-w-6xl">
				<motion.p
					className="mb-6 text-xs font-medium uppercase tracking-[0.32em] text-muted-cream sm:mb-7 sm:text-sm md:mb-8 md:text-xl md:tracking-[0.42em]"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					Jamie Del Rosario
				</motion.p>

				<div data-hero-title className="relative">
					<div className="text-[clamp(3.2rem,17vw,9.25rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-[clamp(4.5rem,12vw,9.25rem)] md:leading-[0.87] md:tracking-[-0.075em]">
						<HeroTitleContent
							variant="base"
							onTextEnter={() => setIsTextHovered(true)}
							onTextLeave={() => setIsTextHovered(false)}
						/>
					</div>

					<motion.div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 text-[clamp(3.2rem,17vw,9.25rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-logic sm:text-[clamp(4.5rem,12vw,9.25rem)] md:leading-[0.87] md:tracking-[-0.075em]"
						initial={{ opacity: 0 }}
						animate={{ opacity: isTextHovered ? 1 : 0 }}
						transition={{ duration: 0.12 }}
						style={{
							WebkitMaskImage: titleMask,
							maskImage: titleMask,
						}}
					>
						<HeroTitleContent variant="highlight" />
					</motion.div>
				</div>

				<motion.p
					className="mt-7 text-xs font-medium uppercase tracking-[0.32em] text-muted-cream sm:mt-8 sm:text-sm md:mt-10 md:text-xl md:tracking-[0.42em]"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.82, ease: "easeOut" }}
				>
					<span>{displayedWord}</span>

					<motion.span
						className="ml-[0.2em] inline-block h-[1em] w-[0.08em] translate-y-[0.15em] bg-logic"
						animate={{ opacity: [1, 1, 0, 0, 1] }}
						transition={{
							duration: 0.8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				</motion.p>
			</div>
		</section>
	);
}