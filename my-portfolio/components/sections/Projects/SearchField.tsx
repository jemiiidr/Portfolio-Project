interface SearchFieldProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export default function SearchField({
	value,
	onChange,
	placeholder = "Search",
}: SearchFieldProps) {
	return (
		<div className="relative w-full">
			<input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="h-16 w-full border border-muted-cream/50 bg-transparent px-4 text-xs font-black uppercase tracking-[0.08em] text-cream outline-none transition placeholder:text-muted-cream focus:border-logic"
			/>
		</div>
	);
}
