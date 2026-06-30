export type ContactFormValues = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export type ContactFieldName = keyof ContactFormValues;

export type SubjectSuggestion = {
	label: string;
	value: string;
};
