export default function ContactIllustration() {
	return (
		<div className="contact-reveal relative hidden min-h-136 items-center justify-center lg:flex">
			<div className="absolute size-72 animate-pulse rounded-full border border-logic/30" />
			<div className="absolute size-96 rounded-full border border-logic/10" />

			<svg
				viewBox="0 0 420 420"
				className="relative z-10 h-112 w-md"
				role="img"
				aria-label="Animated message illustration"
			>
				<path
					d="M90 145 L210 80 L330 145 L330 285 L90 285 Z"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					className="text-muted-cream/40"
				/>

				<path
					d="M90 145 L210 220 L330 145"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					className="text-logic"
				>
					<animate
						attributeName="stroke-dasharray"
						values="0 520;520 0;520 0"
						dur="3.8s"
						repeatCount="indefinite"
					/>
				</path>

				<circle cx="210" cy="220" r="42" className="fill-logic">
					<animate
						attributeName="r"
						values="34;46;34"
						dur="2.4s"
						repeatCount="indefinite"
					/>
				</circle>

				<path
					d="M184 218 H236"
					stroke="#1c1b1a"
					strokeWidth="8"
					strokeLinecap="round"
				/>

				<path
					d="M172 250 H248"
					stroke="#1c1b1a"
					strokeWidth="8"
					strokeLinecap="round"
					opacity="0.75"
				/>

				<g className="origin-center animate-[spin_18s_linear_infinite]">
					<circle cx="210" cy="64" r="8" className="fill-logic" />
					<circle cx="356" cy="210" r="8" className="fill-logic" />
					<circle cx="210" cy="356" r="8" className="fill-logic" />
					<circle cx="64" cy="210" r="8" className="fill-logic" />
				</g>

				<path
					d="M130 335 C175 380 245 380 290 335"
					fill="none"
					stroke="currentColor"
					strokeWidth="5"
					strokeLinecap="round"
					className="text-logic"
				>
					<animate
						attributeName="opacity"
						values="0.2;1;0.2"
						dur="2s"
						repeatCount="indefinite"
					/>
				</path>
			</svg>
		</div>
	);
}
