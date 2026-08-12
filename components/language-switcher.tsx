"use client";

/**
 * Sélecteur de langue (EN / FR / ES) affiché dans l'en-tête.
 *
 * Petit dropdown compact, aligné visuellement sur le `ThemeToggle` (h-9).
 * La langue courante est pilotée par le contexte `useLocale()`.
 */

import * as React from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

import { LOCALES, useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, ui } = useLocale();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Ferme le menu au clic extérieur ou à la touche Échap.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ui.language.aria}
        title={ui.language.label}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-amber-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-amber-400"
      >
        <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
        <span aria-hidden="true">{current.flag}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={ui.language.label}
          className="glass absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-slate-200 p-1 shadow-lg dark:border-slate-700"
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-amber-50 font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true">{l.flag}</span>
                    {l.label}
                  </span>
                  {active && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;