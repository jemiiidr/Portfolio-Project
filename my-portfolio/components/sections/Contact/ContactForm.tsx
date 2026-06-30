"use client";

import { useActionState, useState } from "react";
import { sendContactMessage } from "@/app/(pages)/contact/actions";
import ContactField from "@/components/sections/Contact/ContactField";
import SubjectSuggestions from "@/components/sections/Contact/SubjectSuggestions";
import SubmitButton from "@/components/sections/Contact/SubmitButton";
import type { ContactFormState } from "@/types/contact";

const initialState: ContactFormState = {
	status: "idle",
	message: "",
	values: {
		name: "",
		email: "",
		subject: "",
		message: "",
	},
};

export default function ContactForm() {
	const [state, formAction] = useActionState(sendContactMessage, initialState);
	const [subjectValue, setSubjectValue] = useState(state.values.subject);

	return (
		<form
			action={formAction}
			className="contact-reveal mt-10 max-w-xl space-y-8"
		>
			<ContactField label="Name" name="name" defaultValue={state.values.name} />

			<div>
				<label className="group relative block">
					<span
						className={`pointer-events-none absolute left-0 origin-left font-black uppercase transition-all duration-300 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:tracking-[0.2em] group-focus-within:text-logic ${
							subjectValue.trim().length > 0
								? "top-0 text-sm tracking-[0.2em] text-logic"
								: "top-7 text-3xl tracking-[-0.06em] text-cream md:text-4xl"
						}`}
					>
						Subject<span className="text-logic">*</span>
					</span>

					<input
						name="subject"
						value={subjectValue}
						required
						placeholder="Subject"
						onChange={(event) => setSubjectValue(event.target.value)}
						className="peer w-full border-b border-muted-cream/70 bg-transparent pb-3 pt-8 text-xl font-bold text-cream outline-none transition duration-300 placeholder:text-transparent focus:border-logic md:text-2xl"
					/>
				</label>

				<SubjectSuggestions onSelect={setSubjectValue} />
			</div>

			<ContactField
				label="Email"
				name="email"
				type="email"
				defaultValue={state.values.email}
			/>

			<ContactField
				label="Message"
				name="message"
				multiline
				defaultValue={state.values.message}
			/>

			<SubmitButton />

			{state.message.length > 0 ? (
				<p
					className={`text-sm font-bold ${
						state.status === "success" ? "text-logic" : "text-muted-cream"
					}`}
				>
					{state.message}
				</p>
			) : null}
		</form>
	);
}
