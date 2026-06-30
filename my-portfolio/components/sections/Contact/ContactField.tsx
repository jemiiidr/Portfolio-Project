import type { ContactFieldName } from "@/types/contact";

type ContactFieldProps = {
	label: string;
	name: ContactFieldName;
	value: string;
	required?: boolean;
	type?: "text" | "email";
	multiline?: boolean;
	onChange: (name: ContactFieldName, value: string) => void;
};

export default function ContactField({
	label,
	name,
	value,
	required = true,
	type = "text",
	multiline = false,
	onChange,
}: ContactFieldProps) {
	const isFloating = value.trim().length > 0;

	const inputClassName =
		"peer w-full border-b border-muted-cream/70 bg-transparent pb-3 pt-8 text-xl font-bold text-cream outline-none transition duration-300 placeholder:text-transparent focus:border-logic md:text-2xl";

	return (
		<label className="group relative block">
			<span
				className={`pointer-events-none absolute left-0 origin-left font-black uppercase tracking-[-0.06em] transition-all duration-300 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:tracking-[0.2em] group-focus-within:text-logic ${
					isFloating
						? "top-0 text-sm tracking-[0.2em] text-logic"
						: "top-7 text-3xl text-cream md:text-4xl"
				}`}
			>
				{label}
				{required && <span className="text-logic">*</span>}
			</span>

			{multiline ? (
				<textarea
					name={name}
					value={value}
					rows={4}
					placeholder={label}
					onChange={(event) => onChange(name, event.target.value)}
					className={`${inputClassName} min-h-36 resize-none`}
				/>
			) : (
				<input
					name={name}
					value={value}
					type={type}
					placeholder={label}
					onChange={(event) => onChange(name, event.target.value)}
					className={inputClassName}
				/>
			)}
		</label>
	);
}
