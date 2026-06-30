"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function AboutHome() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const kickerRef = useRef<HTMLParagraphElement | null>(null);
	const textRef = useRef<HTMLHeadingElement | null>(null);

	useGSAP(
		() => {
			const section = sectionRef.current;
			const kicker = kickerRef.current;
			const text = textRef.current;

			if (!section || !kicker || !text) {
				return;
			}

			gsap.fromTo(
				kicker,
				{
					opacity: 0,
					y: 100,
					filter: "blur(6px)",
				},
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 3,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 100%",
					},
				},
			);

			const splitText = SplitText.create(text, {
				type: "lines",
				linesClass: "about-line",
			});

			gsap.set(splitText.lines, {
				"--line-progress": "0%",
			});

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top 90%",
					end: "bottom 120%",
					toggleActions: "restart pause reverse pause",
					scrub: 4,
				},
			});

			timeline.to(splitText.lines, {
				"--line-progress": "100%",
				stagger: 0.3,
				ease: "none",
			});

			ScrollTrigger.refresh();

			return () => {
				splitText.revert();
			};
		},
		{
			scope: sectionRef,
		},
	);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="flex min-h-screen w-full items-center bg-blk1 px-8 py-32 text-cream md:px-24 lg:px-36"
		>
			<div className="max-w-5xl">
				<p
					ref={kickerRef}
					className="mb-10 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream"
				>
					About Me
				</p>

				<h2
					ref={textRef}
					className="max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl lg:text-6xl"
				>
					I bridge the gap between creativity and technology. With experience in
					UI/UX design, front-end development, and AI-driven solutions, I build
					digital products that are{" "}
					<span className="about-accent">
						not only functional but thoughtfully designed
					</span>{" "}
					for the people who use them.
				</h2>
			</div>
		</section>
	);
}
