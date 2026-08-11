"use client";

import * as React from "react";

/**
 * Curseur glissant « Avant / Après ».
 *
 * Affiche deux photos superposées : l'image « après » en fond, l'image
 * « avant » découpée selon la position du curseur (de 0 à 100 %). Un
 * `<input type="range">` invisible recouvre la tuile : il rend le contrôle
 * accessible au clavier et gère le glisser-déposer à la souris/toucher.
 *
 * Les images sont préchargées (effet de bord) avant d'afficher le curseur :
 * tant qu'elles ne sont pas chargées — ou si l'une d'elles manque — la tuile
 * affiche le placeholder dégradé `.gallery-tile`. Ainsi, déposer les photos
 * avec les bons noms active automatiquement le slider, et aucune image
 * cassée n'apparaît jamais en production.
 */
interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
  captionLabel: string;
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  title,
  captionLabel,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = React.useState(50);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const rangeId = React.useId();

  React.useEffect(() => {
    let cancelled = false;
    let beforeLoaded = false;
    let afterLoaded = false;

    const markReadyIfDone = () => {
      if (cancelled) return;
      if (beforeLoaded && afterLoaded) setReady(true);
    };

    const handleError = () => {
      if (!cancelled) setFailed(true);
    };

    const beforeImg = new Image();
    const afterImg = new Image();
    beforeImg.onload = () => {
      beforeLoaded = true;
      markReadyIfDone();
    };
    afterImg.onload = () => {
      afterLoaded = true;
      markReadyIfDone();
    };
    beforeImg.onerror = handleError;
    afterImg.onerror = handleError;
    beforeImg.src = before;
    afterImg.src = after;

    return () => {
      cancelled = true;
    };
  }, [before, after]);

  // Placeholder tant que les photos ne sont pas chargées (ou si elles manquent).
  if (!ready || failed) {
    return (
      <figure className="gallery-tile aspect-[4/5]">
        <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4">
          <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-[#f2ede4]">
            {captionLabel}
          </span>
          <span className="block font-display text-lg font-semibold text-[#fffdf9]">
            {title}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className="gallery-tile group aspect-[4/5] select-none"
      aria-label={`${title} — ${captionLabel}`}
    >
      {/* Photo APRÈS (pleine) */}
      <img
        src={after}
        alt={`${title} — ${afterLabel}`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Photo AVANT (découpée selon la position du curseur) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={before}
          alt={`${title} — ${beforeLabel}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Étiquettes Avant / Après */}
      <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Ligne de séparation + poignée */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 7-4 5 4 5" />
            <path d="m15 7 4 5-4 5" />
          </svg>
        </span>
      </div>

      {/* Curseur accessible (recouvre la tuile, invisible) */}
      <input
        id={rangeId}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${title} — ${beforeLabel} / ${afterLabel}`}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />

      {/* Légende basse */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
        <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-[#f2ede4]">
          {captionLabel}
        </span>
        <span className="block font-display text-lg font-semibold text-[#fffdf9]">
          {title}
        </span>
      </figcaption>
    </figure>
  );
}

export default BeforeAfterSlider;