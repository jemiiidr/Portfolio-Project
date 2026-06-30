import { subjectSuggestions } from "@/lib/contact";

type SubjectSuggestionsProps = {
	onSelect: (subject: string) => void;
};

export default function SubjectSuggestions({
	onSelect,
}: SubjectSuggestionsProps) {
	return (
		<div className="contact-reveal mt-5 flex flex-wrap gap-3">
			{subjectSuggestions.map((suggestion) => (
				<button
					key={suggestion.value}
					type="button"
					onClick={() => onSelect(suggestion.value)}
					className="rounded-full border border-logic/60 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-logic transition-all duration-300 hover:rounded-none hover:bg-logic hover:text-blk1"
				>
					{suggestion.label}
				</button>
			))}
		</div>
	);
}
