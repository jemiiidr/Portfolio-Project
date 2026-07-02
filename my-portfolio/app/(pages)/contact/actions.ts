"use server";

import { Resend } from "resend";
import {
	createOwnerEmailHtml,
	createSenderAutoReplyHtml,
} from "@/lib/email";
import type { ContactFormState, ContactFormValues } from "@/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

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
		!values.name ||
		!values.email ||
		!values.subject ||
		!values.message
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

	const from = process.env.CONTACT_FROM_EMAIL;
	const to = process.env.CONTACT_TO_EMAIL;

	if (!from || !to || !process.env.RESEND_API_KEY) {
		return {
			status: "error",
			message: "Email configuration is missing.",
			values,
		};
	}

	try {
		const ownerEmail = await resend.emails.send({
			from,
			to,
			replyTo: values.email,
			subject: `Portfolio Contact: ${values.subject}`,
			html: createOwnerEmailHtml(values),
		});

		if (ownerEmail.error) {
			console.error(ownerEmail.error);

			return {
				status: "error",
				message: ownerEmail.error.message,
				values,
			};
		}

		const senderEmail = await resend.emails.send({
			from,
			to: values.email,
			subject: "Thank you for contacting me!",
			html: createSenderAutoReplyHtml(values),
		});

		if (senderEmail.error) {
			console.error(senderEmail.error);

			return {
				status: "error",
				message: senderEmail.error.message,
				values,
			};
		}

		return {
			status: "success",
			message: "Message sent successfully!",
			values: {
				name: "",
				email: "",
				subject: "",
				message: "",
			},
		};
	} catch (error) {
		console.error(error);

		return {
			status: "error",
			message: "Something went wrong while sending the email.",
			values,
		};
	}
}