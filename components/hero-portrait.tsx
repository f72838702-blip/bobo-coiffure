"use client";

import * as React from "react";

/**
 * Portrait éditorial de la section hero.
 *
 * Affiche la photo de Mariama (`/mariama.jpg`) dans la zone portrait 4:5.
 * Tant que la photo n'est pas chargée — ou si elle manque / se casse — la
 * tuile se rabat sur le monogramme « MB » (placeholder élégant). Ainsi,
 * déposer la photo active automatiquement le portrait, et aucune image
 * cassée n'apparaît jamais en production.
 */
interface HeroPortraitProps {
  src: string;
  name: string;
  role: string;
  monogram: string;
}

export function HeroPortrait({ src, name, role, monogram }: HeroPortraitProps) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="gallery-tile mx-auto aspect-[4/5] max-w-sm overflow-hidden">
      {/* Couche fallback permanente : monogramme + rôle (sous la photo) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="font-display text-7xl font-semibold text-[#3a2f22] sm:text-8xl">
          {monogram}
        </span>
        <span className="text-sm uppercase tracking-[0.22em] text-[#6b5d47]">
          {role}
        </span>
      </div>

      {/* Photo — recouvre le monogramme une fois chargée ; masquée en cas d'erreur */}
      {!failed && (
        <img
          src={src}
          alt={`${name} — ${role}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms ease" }}
        />
      )}
    </div>
  );
}

export default HeroPortrait;