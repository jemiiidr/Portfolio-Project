"use client";

import { useMemo, useState } from "react";
import ContactField from "./ContactField";
import SubjectSuggestions from "./SubjectSuggestions";
import type { ContactFieldName, ContactFormValues } from "@/types/contact";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const isFormValid = useMemo(() => {
    return (
      values.name.trim().length > 0 &&
      isValidEmail(values.email) &&
      values.subject.trim().length > 0 &&
      values.message.trim().length > 0
    );
  }, [values]);

  function updateField(name: ContactFieldName, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setStatus("idle");
    setStatusMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid || status === "sending") {
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage("Message sent. I’ll get back to you soon.");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-reveal mt-10 max-w-xl space-y-8"
    >
      <ContactField
        label="Name"
        name="name"
        value={values.name}
        onChange={updateField}
      />

      <div>
        <ContactField
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={updateField}
        />

        <SubjectSuggestions
          onSelect={(subject) => updateField("subject", subject)}
        />
      </div>

      <ContactField
        label="Email"
        name="email"
        value={values.email}
        type="email"
        onChange={updateField}
      />

      <ContactField
        label="Message"
        name="message"
        value={values.message}
        multiline
        onChange={updateField}
      />

      <button
        type="submit"
        disabled={!isFormValid || status === "sending"}
        className="group relative mt-6 flex w-full max-w-lg items-center justify-center overflow-hidden rounded-full bg-cream px-10 py-5 text-lg font-black uppercase tracking-[-0.04em] text-blk1 transition-all duration-500 hover:rounded-none hover:bg-logic disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:rounded-full disabled:hover:bg-cream md:text-2xl"
      >
        <span className="absolute inset-y-0 left-0 w-0 bg-logic transition-all duration-500 group-hover:w-full" />

        <span className="relative z-10 transition duration-300 group-hover:scale-105">
          {status === "sending" ? "Sending..." : "Send Message"}
        </span>
      </button>

      {statusMessage && (
        <p
          className={`text-sm font-bold ${
            status === "success" ? "text-logic" : "text-muted-cream"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
}