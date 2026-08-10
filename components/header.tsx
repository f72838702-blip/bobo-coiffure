"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

/**
 * En-tête sticky éditorial :
 * - monogramme + nom (serif) à gauche
 * - navigation principale (desktop)
 * - menu hamburger révélateur (mobile)
 * - sélecteur de langue + bouton CTA + toggle de thème
 */
export function Header() {
  const { site, ui } = useLocale();
  const { profile, nav } = site;
  const [open, setOpen] = React.useState(false);

  const close = () => setOpen(false);

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#apropos"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-[var(--foreground)]"
        >
          <span className="monogram-badge h-8 w-8 text-sm font-semibold">
            {profile.monogram}
          </span>
          <span className="font-display hidden text-lg sm:inline">{profile.name}</span>
        </a>

        {/* Navigation desktop */}
        <nav aria-label="Navigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions desktop : langue + toggle thème + CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a href="#contact" className="btn-primary">
            {ui.header.cta}
          </a>
        </div>

        {/* Actions mobile : langue + toggle thème + bouton menu */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.header.closeMenu : ui.header.openMenu}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile révélateur */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigation"
          className="border-t border-[var(--surface-border)] bg-[var(--background)] md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#contact"
                onClick={close}
                className="btn-primary mt-2 w-full"
              >
                {ui.header.cta}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;