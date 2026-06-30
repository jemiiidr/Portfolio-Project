"use client";

interface ErrorPageProps {
	error: Error;
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-void px-6 text-center text-cream">
			<section className="max-w-xl">
				<p className="mb-4 text-sm uppercase tracking-[0.4em] text-heart">
					Something went wrong
				</p>

				<h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
					Page Error
				</h1>

				<p className="mt-6 text-muted-cream">
					{error.message || "An unexpected error occurred."}
				</p>

				<button
					type="button"
					onClick={reset}
					className="mt-8 rounded-full bg-logic px-8 py-4 font-display text-sm uppercase text-cream transition hover:bg-heart"
				>
					Try Again
				</button>
			</section>
		</main>
	);
}
