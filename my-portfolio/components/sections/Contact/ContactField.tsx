"use client";

import { useEffect, useState } from "react";
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

	const [value, setValue] = useState(defaultValue);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const isFloating = isFocused || value.trim().length > 0;

	const fieldClassName =
		"w-full border-b border-muted-cream/70 bg-transparent pb-3 pt-8 text-xl font-bold text-cream outline-none transition duration-300 placeholder:text-transparent focus:border-logic md:text-2xl [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--blk1)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--cream)] [&:-webkit-autofill]:caret-cream";

	const labelClassName = `pointer-events-none absolute left-0 origin-left font-black uppercase transition-all duration-300 ${
		isFloating
			? "top-0 text-sm tracking-[0.2em] text-logic"
			: "top-7 text-3xl tracking-[-0.06em] text-cream md:text-4xl"
	}`;

	return (
		<div className="relative block">
			<label htmlFor={fieldId} className={labelClassName}>
				{label}
				{required && <span className="text-logic">*</span>}
			</label>

			{multiline ? (
				<textarea
					id={fieldId}
					name={name}
					value={value}
					rows={4}
					required={required}
					placeholder={label}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setValue(e.target.value)}
					className={`${fieldClassName} min-h-36 resize-none`}
				/>
			) : (
				<input
					id={fieldId}
					name={name}
					type={type}
					value={value}
					required={required}
					placeholder={label}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setValue(e.target.value)}
					className={fieldClassName}
				/>
			)}
		</div>
	);
}