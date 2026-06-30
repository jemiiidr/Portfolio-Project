import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createOwnerEmailHtml, createSenderAutoReplyHtml } from "@/lib/email";
import type { ContactFormValues } from "@/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidContactForm(values: ContactFormValues) {
	return (
		values.name.trim().length > 0 &&
		isValidEmail(values.email) &&
		values.subject.trim().length > 0 &&
		values.message.trim().length > 0
	);
}

export async function POST(request: Request) {
	try {
		const values = (await request.json()) as ContactFormValues;

		if (!isValidContactForm(values)) {
			return NextResponse.json(
				{ message: "Please complete all fields correctly." },
				{ status: 400 },
			);
		}

		const from = process.env.CONTACT_FROM_EMAIL;
		const to = process.env.CONTACT_TO_EMAIL;

		if (!from || !to) {
			return NextResponse.json(
				{ message: "Email environment variables are missing." },
				{ status: 500 },
			);
		}

		const ownerEmail = await resend.emails.send({
			from,
			to,
			replyTo: values.email,
			subject: `Email from Portfolio Site: ${values.subject}`,
			html: createOwnerEmailHtml(values),
		});

		if (ownerEmail.error) {
			return NextResponse.json(
				{ message: ownerEmail.error.message },
				{ status: 500 },
			);
		}

		const senderEmail = await resend.emails.send({
			from,
			to: values.email,
			subject: "Thank you for reaching out to us",
			html: createSenderAutoReplyHtml(values),
		});

		if (senderEmail.error) {
			return NextResponse.json(
				{ message: senderEmail.error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			message: "Message sent successfully.",
		});
	} catch {
		return NextResponse.json(
			{ message: "Something went wrong. Please try again." },
			{ status: 500 },
		);
	}
}
