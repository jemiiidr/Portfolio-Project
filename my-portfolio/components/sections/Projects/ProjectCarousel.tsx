// src/components/sections/Projects/ProjectCarousel.tsx
"use client";

import {
	motion,
	useInView,
	type PanInfo,
	type Transition,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CarouselArrowIcon } from "@/public/icons/IconComponents";
import type { ProjectImage } from "@/types/project";

interface ProjectCarouselProps {
	images: ProjectImage[];
}

const transition: Transition = {
	duration: 0.75,
	ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const DRAG_THRESHOLD = 80;
const DRAG_HINT_INTERVAL = 15000;

function getCircularOffset(index: number, activeIndex: number, total: number) {
	let offset = index - activeIndex;

	if (offset > total / 2) offset -= total;
	if (offset < -total / 2) offset += total;

	return offset;
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isInView = useInView(sectionRef, { amount: 0.4 });

	const [activeIndex, setActiveIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [hintKey, setHintKey] = useState(0);

	useEffect(() => {
		if (images.length <= 1 || !isInView || isDragging) return;

		setHintKey((current) => current + 1);

		const interval = window.setInterval(() => {
			setHintKey((current) => current + 1);
		}, DRAG_HINT_INTERVAL);

		return () => window.clearInterval(interval);
	}, [images.length, isInView, isDragging]);

	if (images.length === 0) return null;

	function showPrevious() {
		setActiveIndex((current) =>
			current === 0 ? images.length - 1 : current - 1,
		);
	}

	function showNext() {
		setActiveIndex((current) =>
			current === images.length - 1 ? 0 : current + 1,
		);
	}

	function goToSlide(index: number) {
		setActiveIndex(index);
	}

	function handleDragEnd(
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) {
		setIsDragging(false);

		if (info.offset.x > DRAG_THRESHOLD) {
			showPrevious();
			return;
		}

		if (info.offset.x < -DRAG_THRESHOLD) {
			showNext();
		}
	}

	return (
		<section
			ref={sectionRef}
			className="relative bg-blk1 px-6 pb-20 pt-28 md:px-12 md:pt-32"
		>
			<div className="relative mx-auto flex h-105 max-w-6xl items-center justify-center overflow-hidden">
				{/* Drag layer */}
				<motion.div
					drag={images.length > 1 ? "x" : false}
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.18}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={handleDragEnd}
					className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
				/>

				{/* Mobile drag hint */}
				{images.length > 1 && (
					<motion.div
						key={hintKey}
						initial={{ x: 0, opacity: 0 }}
						animate={{
							x: [0, -34, 34, 0],
							opacity: [0, 1, 1, 0],
						}}
						transition={{
							duration: 1.8,
							ease: "easeInOut",
						}}
						className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cream/30 bg-blk1/80 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cream backdrop-blur md:hidden"
					>
						<span>Drag</span>
						<span className="text-logic">↔</span>
					</motion.div>
				)}

				{/* Carousel images */}
				{images.map((image, index) => {
					const offset = getCircularOffset(index, activeIndex, images.length);
					const isCenter = offset === 0;
					const isVisible = Math.abs(offset) <= 1;

					return (
						<motion.div
							key={image.src}
							animate={{
								x: `${offset * 68}%`,
								scale: isCenter ? 1 : 0.72,
								opacity: isVisible ? (isCenter ? 1 : 0.32) : 0,
								zIndex: isCenter ? 10 : 1,
								filter: isCenter ? "blur(0px)" : "blur(0.5px)",
							}}
							transition={transition}
							className="pointer-events-none absolute flex h-full w-full max-w-3xl items-center justify-center"
						>
							<Image
								src={image.src}
								alt={image.alt}
								width={1200}
								height={700}
								priority={index === 0}
								draggable={false}
								className="max-h-full max-w-full select-none object-contain"
							/>

							{!isCenter && <div className="absolute inset-0 bg-black/65" />}
						</motion.div>
					);
				})}

				{/* Slider control */}
				{images.length > 1 && (
					<>
						{/* Left slider button */}
						<button
							type="button"
							onClick={showPrevious}
							aria-label="Previous image"
							className="absolute left-0 z-20 hidden size-20 place-items-center border border-logic bg-blk1/80 text-cream transition hover:bg-logic hover:text-blk1 md:left-2 md:grid"
						>
							<CarouselArrowIcon
								color="currentColor"
								className="h-7.25 w-4 rotate-180 transition-colors"
							/>
						</button>

						{/* Right slider button */}
						<button
							type="button"
							onClick={showNext}
							aria-label="Next image"
							className="absolute right-0 z-20 hidden size-20 place-items-center border border-logic bg-blk1/80 text-cream transition hover:bg-logic hover:text-blk1 md:right-2 md:grid"
						>
							<CarouselArrowIcon
								color="currentColor"
								className="h-7.25 w-4 transition-colors"
							/>
						</button>
					</>
				)}
			</div>

			{/* Image slide indicator */}
			{images.length > 1 && (
				<div className="mt-4 flex justify-center gap-3">
					{images.map((image, index) => (
						<button
							key={image.src}
							type="button"
							onClick={() => goToSlide(index)}
							aria-label={`Go to image ${index + 1}`}
							className={
								index === activeIndex
									? "size-2.5 rounded-full bg-cream"
									: "size-2.5 rounded-full border border-cream/60"
							}
						/>
					))}
				</div>
			)}
		</section>
	);
}