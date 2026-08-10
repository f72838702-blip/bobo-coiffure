"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Bouton de bascule clair/sombre.
 * - Lit l'état initial depuis la classe `.dark` posée par le script anti-flash
 *   du layout (donc cohérent avant hydration, sans scintillement).
 * - Persiste le choix dans `localStorage` sous la clé `theme`.
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage indisponible (mode privé) — on ignore silencieusement.
    }
  };

  // Placeholder de même gabarit avant montage pour éviter le saut de layout.
  if (!mounted) {
    return <span className="inline-block h-9 w-9" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      title={isDark ? "Thème clair" : "Thème sombre"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;