import type { ContactFieldName } from "@/types/contact";

interface ContactFieldProps {
	label: string;
	name: ContactFieldName;
	defaultValue?: string;
	required?: boolean;
	type?: "text" | "email";
	multiline?: boolean;
}

export default function ContactField({
	label,
	name,
	defaultValue = "",
	required = true,
	type = "text",
	multiline = false,
}: ContactFieldProps) {
	const fieldId = `contact-${name}`;

	const inputClassName =
		"peer w-full border-b border-muted-cream/70 bg-transparent pb-3 pt-8 text-xl font-bold text-cream outline-none transition duration-300 placeholder:text-transparent focus:border-logic md:text-2xl";

	return (
		<div className="group relative block">
			<label
				htmlFor={fieldId}
				className="pointer-events-none absolute left-0 top-0 origin-left text-sm font-black uppercase tracking-[0.2em] text-logic transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-3xl peer-placeholder-shown:tracking-[-0.06em] peer-placeholder-shown:text-cream group-focus-within:top-0 group-focus-within:text-sm group-focus-within:tracking-[0.2em] group-focus-within:text-logic md:peer-placeholder-shown:text-4xl"
			>
				{label}
				{required ? <span className="text-logic">*</span> : null}
			</label>

			{multiline ? (
				<textarea
					id={fieldId}
					name={name}
					defaultValue={defaultValue}
					rows={4}
					required={required}
					placeholder={label}
					className={`${inputClassName} min-h-36 resize-none`}
				/>
			) : (
				<input
					id={fieldId}
					name={name}
					defaultValue={defaultValue}
					type={type}
					required={required}
					placeholder={label}
					className={inputClassName}
				/>
			)}
		</div>
	);
}
