"use server";

import type { ContactFormState, ContactFormValues } from "@/types/contact";

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getStringValue(formData: FormData, key: keyof ContactFormValues) {
	const value = formData.get(key);

	return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
	_previousState: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> {
	const values: ContactFormValues = {
		name: getStringValue(formData, "name"),
		email: getStringValue(formData, "email"),
		subject: getStringValue(formData, "subject"),
		message: getStringValue(formData, "message"),
	};

	if (
		values.name.length === 0 ||
		values.email.length === 0 ||
		values.subject.length === 0 ||
		values.message.length === 0
	) {
		return {
			status: "error",
			message: "Please fill out all required fields.",
			values,
		};
	}

	if (!isValidEmail(values.email)) {
		return {
			status: "error",
			message: "Please enter a valid email address.",
			values,
		};
	}

	try {
		console.log("New contact message:", values);

		return {
			status: "success",
			message: "Message sent. I’ll get back to you soon.",
			values: {
				name: "",
				email: "",
				subject: "",
				message: "",
			},
		};
	} catch {
		return {
			status: "error",
			message: "Something went wrong. Please try again.",
			values,
		};
	}
}
