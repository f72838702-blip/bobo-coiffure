import { NextResponse } from "next/server";

import type { ContactPayload, ContactResponse } from "@/types";
import { sendContactEmail } from "@/lib/email";
import { profile } from "@/data/portfolio";

/* -------------------------------------------------------------------------- */
/*  Configuration & sécurité                                                    */
/* -------------------------------------------------------------------------- */

// Désactive la mise en cache de cette route : chaque POST doit être traité.
export const dynamic = "force-dynamic";

/** Limites appliquées aux champs (protection anti-abus / DoS). */
const LIMITS = {
  name: 100,
  email: 254, // RFC 5321
  subject: 200,
  message: 5000,
} as const;

/** Fenêtre de rate limiting (par IP) — store en mémoire, par instance. */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requêtes / minute / IP
const rateLimitMap = new Map<string, { count: number; firstAt: number }>();

/** Regex e-mail RFC 5322 simplifiée mais robuste. */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/* -------------------------------------------------------------------------- */
/*  Validation serveur (source de vérité)                                        */
/* -------------------------------------------------------------------------- */

/**
 * Valide la charge utile reçue. Renvoie un objet `errors` vide si tout est OK.
 * Aucune dépendance externe (zod etc.) : validation manuelle et minimaliste.
 */
function validatePayload(
  payload: Partial<ContactPayload>
): Partial<Record<keyof ContactPayload, string>> {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  const name = (payload.name ?? "").trim();
  if (name.length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Le nom ne doit pas dépasser ${LIMITS.name} caractères.`;
  }

  const email = (payload.email ?? "").trim();
  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Adresse e-mail invalide.";
  } else if (email.length > LIMITS.email) {
    errors.email = "Adresse e-mail trop longue.";
  }

  const subject = (payload.subject ?? "").trim();
  if (subject && subject.length > LIMITS.subject) {
    errors.subject = `Le sujet ne doit pas dépasser ${LIMITS.subject} caractères.`;
  }

  const message = (payload.message ?? "").trim();
  if (message.length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  } else if (message.length > LIMITS.message) {
    errors.message = `Le message ne doit pas dépasser ${LIMITS.message} caractères.`;
  }

  return errors;
}

/** Rate limiting basique par IP (store mémoire, suffisant en mono-instance). */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstAt: now });
    return true;
  }

  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}

/** Échappe le HTML pour un affichage sûr dans d'éventuels logs/rendus. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Récupère l'IP cliente depuis les en-têtes communs (proxys inclus). */
function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Réponse JSON normalisée. */
function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/* -------------------------------------------------------------------------- */
/*  Handler POST                                                                */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request): Promise<NextResponse> {
  const ip = getClientIp(req);

  // 1. Rate limiting
  if (!checkRateLimit(ip)) {
    return json(
      {
        success: false,
        message: "Trop de requêtes. Veuillez réessayer dans une minute.",
      },
      429
    );
  }

  // 2. Parse + Content-Type check
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json(
      { success: false, message: "Type de contenu non supporté." },
      415
    );
  }

  let payload: Partial<ContactPayload>;
  try {
    payload = (await req.json()) as Partial<ContactPayload>;
  } catch {
    return json({ success: false, message: "Payload JSON invalide." }, 400);
  }

  // 3. Honeypot anti-spam : un champ `website` vide côté client,
  //    rempli automatiquement par les bots → on ignore silencieusement.
  const honeypot = (payload as Record<string, unknown>).website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    // Réponse 200 feintée pour ne pas alerter le bot.
    return json(
      { success: true, message: "Message envoyé avec succès." },
      200
    );
  }

  // 4. Validation serveur
  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return json(
      {
        success: false,
        message: "Le formulaire contient des erreurs.",
        errors,
      },
      422
    );
  }

  // 5. Traitement métier : log sécurisé puis envoi de l'e-mail (Resend).
  const clean = {
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    subject: payload.subject ? payload.subject.trim() : undefined,
    message: payload.message!.trim(),
  };

  // Log échapé (jamais de HTML brut en sortie console).
  console.info(
    `[contact] Nouveau message de ${escapeHtml(clean.name)} <${escapeHtml(clean.email)}> — sujet: "${escapeHtml(clean.subject ?? "(aucun)")}"`
  );

  const to = process.env.CONTACT_EMAIL ?? profile.email;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!to) {
    console.error("[contact] CONTACT_EMAIL non défini — message ignoré.");
    return json(
      {
        success: false,
        message: "Service de contact non configuré. Réessayez plus tard.",
      },
      503
    );
  }

  try {
    await sendContactEmail({ to, from, data: clean });
  } catch (err) {
    console.error("[contact] Échec de l'envoi :", err);
    return json(
      {
        success: false,
        message: "Impossible d'envoyer le message pour le moment. Réessayez.",
      },
      502
    );
  }

  // 6. Succès
  return json(
    {
      success: true,
      message: "Merci ! Votre message a bien été envoyé.",
    },
    200
  );
}

/* -------------------------------------------------------------------------- */
/*  Handler GET — bloque l'accès direct à la route                              */
/* -------------------------------------------------------------------------- */

export function GET(): NextResponse {
  return json({ success: false, message: "Méthode non autorisée." }, 405);
}