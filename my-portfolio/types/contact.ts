export type ContactFieldName = "name" | "email" | "subject" | "message";

export interface ContactFormValues {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export type ContactFormStatus = "idle" | "success" | "error";

export interface ContactFormState {
	status: ContactFormStatus;
	message: string;
	values: ContactFormValues;
}
