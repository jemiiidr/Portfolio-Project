"use client";

import { subjectSuggestions } from "@/lib/contact";

interface SubjectSuggestionsProps {
	value?: string;
	onSelect: (subject: string) => void;
}

export default function SubjectSuggestions({
	value = "",
	onSelect,
}: SubjectSuggestionsProps) {
	const normalizedValue = value.trim().toLowerCase();

	return (
		<div className="contact-reveal mt-5 flex flex-wrap items-center gap-3">
			<span className="mr-1 text-xs font-black uppercase tracking-[0.22em] text-muted-cream">
				Suggested
			</span>

			{subjectSuggestions.map((suggestion) => {
				const suggestionValue = suggestion.value.toLowerCase();

				const isMatched =
					normalizedValue.length > 0 &&
					suggestionValue === normalizedValue;

				return (
					<button
						key={suggestion.value}
						type="button"
						onClick={() => onSelect(suggestion.value)}
						className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition-all duration-300 ${
							isMatched
								? "border-logic bg-logic text-blk1"
								: "border-logic/60 text-logic hover:border-logic hover:bg-logic hover:text-blk1"
						}`}
					>
						{suggestion.label}
					</button>
				);
			})}
		</div>
	);
}