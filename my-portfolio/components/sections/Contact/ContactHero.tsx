import ContactForm from "./ContactForm";

export default function ContactHero() {
	return (
		<section className="relative min-h-screen overflow-hidden bg-blk1 px-6 py-28 text-cream md:px-10">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,color-mix(in_srgb,var(--logic)_16%,transparent),transparent_32%)]" />

			<div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_32rem] lg:items-center">
				<div>
					<p className="animate-contact-fade-up text-xs font-medium uppercase tracking-[0.45em] text-muted-cream">
						Send me a message
					</p>

					<h1 className="mt-6 animate-contact-fade-up-delay-1 text-5xl font-black tracking-[-0.07em] md:text-7xl">
						Let&apos;s work{" "}
						<span className="inline-block animate-contact-type overflow-hidden whitespace-nowrap border-r-4 border-logic pr-1 text-logic">
							together
						</span>
					</h1>

					<p className="mt-6 max-w-md animate-contact-fade-up-delay-2 text-xl font-bold leading-tight text-muted-cream md:text-2xl">
						Have a specific inquiry or partnership request? Fill out the form
						here and I&apos;ll get back to you asap.
					</p>

					<ContactForm />
				</div>

				{/* <ContactIllustration /> */}
			</div>
		</section>
	);
}
