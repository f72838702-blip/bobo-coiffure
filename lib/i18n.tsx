"use client";

/**
 * Internationalisation côté client (FR / EN / PT).
 *
 * Le choix de langue est persisté dans `localStorage` et reflété sur
 * `<html lang>`. Aucun routage par langue : le site est une page unique et
 * le contenu provient de `data/locales.ts` (une structure `SiteData` par
 * langue + un jeu de chaînes UI).
 */

import * as React from "react";

import {
  getSiteData,
  getUiStrings,
  LOCALES,
  type Locale,
} from "@/data/locales";
import type { SiteData } from "@/types";
import type { UIStrings } from "@/data/locales";

const STORAGE_KEY = "locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  site: SiteData;
  ui: UIStrings;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/** Détecte la langue préférée : localStorage > navigateur > français. */
function detectLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en" || stored === "pt") return stored;
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "en") return "en";
    if (nav === "pt") return "pt";
  } catch {
    /* localStorage indisposable — on garde le défaut. */
  }
  return "fr";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Rendu serveur et premier rendu client : français (évite tout décalage
  // d'hydratation). La langue réelle est appliquée après le montage.
  const [locale, setLocaleState] = React.useState<Locale>("fr");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      site: getSiteData(locale),
      ui: getUiStrings(locale),
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Accès au contexte de langue. Doit être utilisé sous <LocaleProvider>. */
export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale doit être utilisé dans un <LocaleProvider>.");
  }
  return ctx;
}

export { LOCALES, type Locale };