/**
 * Envoi d'e-mails pour le formulaire de contact.
 *
 * Utilise Resend (https://resend.com) quand `RESEND_API_KEY` est défini ;
 * sinon, n'opère aucun envoi réel (mode "log only") pour le développement.
 *
 * Lève en cas d'échec afin que la route API puisse renvoyer un statut
 * d'erreur cohérent au client.
 */

export interface ContactEmailInput {
  /** Destinataire (généralement `process.env.CONTACT_EMAIL`). */
  to: string;
  /** Expéditeur (adresse "From" Resend vérifiée). */
  from: string;
  /** Données du formulaire, déjà validées et nettoyées. */
  data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  };
}

export interface ContactEmailResult {
  /** Identifiant renvoyé par le fournisseur, ou `null` en mode "log only". */
  id: string | null;
}

/** Indique si l'envoi réel via Resend est activé. */
export function isEmailEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Envoie un e-mail via Resend. Lève une Error si l'API renvoie un échec.
 * En l'absence de clé API, simule l'envoi (log) et renvoie `id: null`.
 */
export async function sendContactEmail(
  input: ContactEmailInput
): Promise<ContactEmailResult> {
  if (!isEmailEnabled()) {
    console.info(
      `[email] RESEND_API_KEY absent — envoi simulé à ${input.to} de la part de ${input.data.email}`
    );
    return { id: null };
  }

  const subjectLine = input.data.subject
    ? `[Portfolio] ${input.data.subject}`
    : "[Portfolio] Nouveau message";

  const textBody = [
    `Nouveau message reçu via le portfolio.`,
    ``,
    `Nom : ${input.data.name}`,
    `E-mail : ${input.data.email}`,
    input.data.subject ? `Sujet : ${input.data.subject}` : "",
    ``,
    `Message :`,
    input.data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      reply_to: input.data.email,
      subject: subjectLine,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Échec de l'envoi de l'e-mail (HTTP ${res.status}). ${detail}`.trim()
    );
  }

  const json = (await res.json().catch(() => ({}))) as { id?: string };
  return { id: json.id ?? null };
}