"use client";

import * as React from "react";

/**
 * Compteur animé : fait défiler la valeur numérique de 0 à sa cible quand
 * l'élément entre dans le viewport (IntersectionObserver), puis affiche la
 * valeur finale formatée (séparateur de milliers fr-FR) + suffixe (+, %, etc.).
 *
 * `prefers-reduced-motion` ou absence d'IntersectionObserver → valeur finale
 * immédiate, sans animation.
 *
 * Exemples : "2 500+" -> 2 500 + "+", "98%" -> 98 + "%", "10+" -> 10 + "+".
 */

interface StatCounterProps {
  /** Valeur affichée brute (ex. "2 500+", "98%"). */
  value: string;
  className?: string;
}

/** Extrait la cible numérique et le suffixe d'une chaîne d'affichage. */
function parseValue(value: string): { target: number; suffix: string } {
  const digits = value.replace(/[^\d]/g, "");
  const target = digits ? parseInt(digits, 10) : 0;
  // Suffixe = tout ce qui n'est ni chiffre ni espace (ex. "+", "%").
  const suffix = value.replace(/[\d\s]/g, "");
  return { target, suffix };
}

/** Formate un entier avec séparateur de milliers fr-FR (espace insécable). */
function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export function StatCounter({ value, className = "" }: StatCounterProps) {
  const { target, suffix } = React.useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pas d'animation si reduced-motion ou pas d'IntersectionObserver.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate(target, setDisplay);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(display)}
      {suffix}
    </span>
  );
}

/** Animation d'accélération/décélération (easeOut) sur ~1,4 s. */
function animate(
  target: number,
  setDisplay: (n: number) => void
): void {
  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    setDisplay(Math.round(eased * target));
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export default StatCounter;