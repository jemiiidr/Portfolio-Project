"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="group relative mt-6 flex w-full max-w-lg items-center justify-center overflow-hidden rounded-full bg-cream px-10 py-5 text-lg font-black uppercase tracking-[-0.04em] text-blk1 transition-all duration-500 hover:rounded-none hover:bg-logic disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:rounded-full disabled:hover:bg-cream md:text-2xl"
		>
			<span className="absolute inset-y-0 left-0 w-0 bg-logic transition-all duration-500 group-hover:w-full" />

			<span className="relative z-10 transition duration-300 group-hover:scale-105">
				{pending ? "Sending..." : "Send Message"}
			</span>
		</button>
	);
}
