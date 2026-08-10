"use client";

import * as React from "react";

import { useLocale } from "@/lib/i18n";

/**
 * Bouton flottant WhatsApp — accès direct au PDG (Ismael Barry).
 *
 * Collé en bas à droite, au-dessus du contenu (z-50). Pulse discret sauf si
 * `prefers-reduced-motion` (respect de l'accessibilité).
 *
 * Le numéro WhatsApp provient de `profile.phone` (format international). La
 * cible `wa.me` n'accepte que les chiffres (indicatif + numéro, sans + ni
 * espaces).
 */

function WhatsappGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.623 5.319l-.999 3.648 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  );
}

export function WhatsappFab() {
  const { site, ui } = useLocale();
  const { profile } = site;
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (!profile.phone) return null;

  const waNumber = profile.phone.replace(/[^\d]/g, "");
  const href = `https://wa.me/${waNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.whatsapp.aria}
      className="fixed right-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
    >
      <span className="sr-only">{ui.whatsapp.sr}</span>
      <WhatsappGlyph className="h-7 w-7" />
      {!reduced && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export default WhatsappFab;