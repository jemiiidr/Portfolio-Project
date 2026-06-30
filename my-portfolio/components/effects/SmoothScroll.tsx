"use client";

import { useEffect } from "react";

interface LenisInstance {
	raf: (time: number) => void;
	destroy: () => void;
}

export default function SmoothScroll() {
	useEffect(() => {
		let animationFrameId = 0;
		let lenis: LenisInstance | null = null;

		async function startSmoothScroll() {
			const Lenis = (await import("lenis")).default;

			lenis = new Lenis({
				duration: 1.15,
				easing: (time: number) => 1 - (1 - time) ** 3,
				smoothWheel: true,
				wheelMultiplier: 0.9,
				touchMultiplier: 1.1,
			});

			function raf(time: number) {
				lenis?.raf(time);
				animationFrameId = requestAnimationFrame(raf);
			}

			animationFrameId = requestAnimationFrame(raf);
		}

		startSmoothScroll();

		return () => {
			cancelAnimationFrame(animationFrameId);
			lenis?.destroy();
		};
	}, []);

	return null;
}
