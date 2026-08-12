"use client";

/**
 * Internationalisation côté client (EN / FR / ES).
 *
 * L'anglais est la langue par défaut (site destiné au Maryland, États-Unis).
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

/** Détecte la langue préférée : localStorage > navigateur > anglais (défaut US). */
function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr" || stored === "es") return stored;
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "fr") return "fr";
    if (nav === "es") return "es";
    // Tout le reste (y compris navigateurs en) → anglais, langue par défaut.
  } catch {
    /* localStorage indisposable — on garde le défaut. */
  }
  return "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Rendu serveur et premier rendu client : anglais (évite tout décalage
  // d'hydratation). La langue réelle est appliquée après le montage.
  const [locale, setLocaleState] = React.useState<Locale>("en");
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