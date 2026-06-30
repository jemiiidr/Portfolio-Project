import type { ContactFormValues } from "@/types/contact";

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

export function createOwnerEmailHtml(values: ContactFormValues) {
	const name = escapeHtml(values.name);
	const email = escapeHtml(values.email);
	const subject = escapeHtml(values.subject);
	const message = escapeHtml(values.message).replaceAll("\n", "<br />");

	return `
    <div style="font-family: Arial, sans-serif; color: #1c1b1a; line-height: 1.6;">
      <h1>Email from Portfolio Site</h1>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;
}

export function createSenderAutoReplyHtml(values: ContactFormValues) {
	const name = escapeHtml(values.name);
	const email = escapeHtml(values.email);
	const subject = escapeHtml(values.subject);

	return `
    <div style="font-family: Arial, sans-serif; color: #1c1b1a; line-height: 1.6;">
      <h1>Thank you for reaching out to us</h1>

      <p>Hi ${name},</p>

      <p>
        Thank you for sending a message through my portfolio site.
        I received your inquiry and I’ll get back to you as soon as possible.
      </p>

      <p><strong>Your email:</strong> ${email}</p>
      <p><strong>Your subject:</strong> ${subject}</p>

      <hr />

      <p style="color: #666;">
        This is an automated confirmation email.
      </p>
    </div>
  `;
}
