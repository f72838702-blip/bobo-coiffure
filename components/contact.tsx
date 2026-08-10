"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import type { ContactPayload, ContactResponse } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Types & constantes                                                          */
/* -------------------------------------------------------------------------- */

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Champ honeypot anti-spam — doit rester vide (caché aux utilisateurs). */
  website: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

/** Validation légère côté client (le serveur reste source de vérité). */
function validate(
  values: FormState,
  e: { name: string; email: string; message: string }
): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = e.name;
  }

  // Regex RFC 5322 simplifiée, suffisante pour un pré-filtre client.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(values.email)) {
    errors.email = e.email;
  }

  if (values.message.trim().length < 10) {
    errors.message = e.message;
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/*  Sous-composants                                                             */
/* -------------------------------------------------------------------------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, value, error, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--foreground)]"
      >
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {error && value !== "" && (
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--foreground)] shadow-sm transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 disabled:cursor-not-allowed disabled:opacity-60";

/* -------------------------------------------------------------------------- */
/*  Composant principal                                                         */
/* -------------------------------------------------------------------------- */

export function Contact() {
  const { site, ui } = useLocale();
  const { profile } = site;
  const f = ui.form;

  const [form, setForm] = React.useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [feedback, setFeedback] = React.useState<string>("");

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  /** Met à jour un champ et efface son erreur éventuelle. */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    // Toute interaction repasse en idle si on était en succès/erreur.
    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  /** Soumission : validation client puis appel à la route API. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validate(form, f.errors);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("loading");
    setErrors({});
    setFeedback("");

    const payload: ContactPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || undefined,
      message: form.message.trim(),
      // Honeypot : propagé pour la détection côté serveur.
      ...(form.website ? { website: form.website } : {}),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as ContactResponse;

      if (!res.ok || !data.success) {
        setStatus("error");
        setFeedback(data.message ?? f.fallbackError);
        // Erreurs champ par champ renvoyées par le serveur.
        if (data.errors) setErrors(data.errors);
        return;
      }

      setStatus("success");
      setFeedback(data.message ?? f.fallbackSuccess);
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setFeedback(f.fallbackError);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="contact-title"
    >
      <div className="mb-10 text-center">
        <h2
          id="contact-title"
          className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {ui.contact.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          {ui.contact.subtitle}
        </p>

        {/* Accès direct au PDG sur WhatsApp */}
        {profile.phone && (
          <a
            href={`https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-pill mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/10 dark:text-emerald-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.623 5.319l-.999 3.648 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
            </svg>
            {ui.contact.whatsapp}
          </a>
        )}
      </div>

      {/* Bandeau d'état : succès ou erreur */}
      {isSuccess && (
        <div
          className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
          role="status"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">{feedback}</p>
        </div>
      )}

      {isError && (
        <div
          className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">{feedback}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="glass glass-card space-y-5 p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label={f.name} value={form.name} error={errors.name} required>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
              placeholder={f.namePlaceholder}
              required
              className={inputClasses}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>

          <Field id="email" label={f.email} value={form.email} error={errors.email} required>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder={f.emailPlaceholder}
              required
              className={inputClasses}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
        </div>

        <Field id="subject" label={f.subject} value={form.subject} error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            disabled={isLoading}
            placeholder={f.subjectPlaceholder}
            className={inputClasses}
          />
        </Field>

        <Field
          id="message"
          label={f.message}
          value={form.message}
          error={errors.message}
          required
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            disabled={isLoading}
            placeholder={f.messagePlaceholder}
            required
            className={`${inputClasses} resize-y`}
            aria-invalid={Boolean(errors.message)}
          />
        </Field>

        {/* Honeypot anti-spam : champ caché aux humains, rempli par les bots.
            Ne pas supprimer, ne pas afficher visuellement. */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-label={f.honeypotAria}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] shadow-sm transition-colors hover:bg-[var(--accent-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {f.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {f.submit}
            </>
          )}
        </button>
      </form>
    </section>
  );
}

export default Contact;