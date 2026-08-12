"use client";

/**
 * Corps de la page d'accueil, rendu côté client pour consommer la langue
 * courante (`useLocale`). Les métadonnées SEO restent dans `app/page.tsx`
 * (serveur, français canonique).
 *
 * Layout « Quiet Luxury éditorial » : palette ivoire / soft black / rose-gold,
 * typo serif display (Fraunces) + sans (Inter), whitespace généreux, galerie
 * avant / après. Aucune dépendance 3D / WebGL. Esthétique distincte du bento
 * coloré de dalmitty-mode.
 */

import {
  ArrowDown,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Quote,
  Star,
  Check,
  ChevronDown,
  Package,
  Scissors,
  Palette,
  Layers,
  Crown,
  Wind,
  Home,
  Award,
  Leaf,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

import { useLocale } from "@/lib/i18n";
import { galleryImages } from "@/data/portfolio";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { StatCounter } from "@/components/stat-counter";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { HeroPortrait } from "@/components/hero-portrait";

/* -------------------------------------------------------------------------- */
/*  Tables d'icônes (nom stocké en données -> composant Lucide)                */
/* -------------------------------------------------------------------------- */

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Scissors,
  Palette,
  Sparkles,
  Layers,
  Crown,
  Wind,
  Package,
};

const WHY_ICONS: Record<string, LucideIcon> = {
  Home,
  Award,
  Leaf,
  CalendarClock,
};

// Icônes des pastilles de confiance (ordre fixe : domicile, expert, flexibilité).
const TRUST_ICONS: LucideIcon[] = [Home, Sparkles, CalendarClock];

/* -------------------------------------------------------------------------- */
/*  Sous-composant : en-tête de section éditorial                                */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto mb-12 max-w-2xl text-center" : "mb-10 max-w-2xl"}>
      <p className="eyebrow mb-3 inline-flex items-center gap-2">
        <span className="h-px w-6 bg-[var(--accent)]" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="scroll-mt-24 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--muted)]">{subtitle}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                        */
/* -------------------------------------------------------------------------- */

export function HomeContent() {
  const { site, ui } = useLocale();
  const { profile, stats, products, why, steps, testimonials, faq } = site;

  const trustPills = ui.trust.map((t, i) => ({
    icon: TRUST_ICONS[i] ?? Star,
    label: t.label,
  }));

  return (
    <>
      <Header />

      <main id="apropos">
        {/* HERO — éditorial : texte à gauche, portrait / monogramme à droite */}
        <section className="relative isolate overflow-hidden">
          <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />

          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Colonne texte */}
              <div className="reveal-up">
                {profile.available && (
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--accent-ink)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                    </span>
                    {ui.hero.available}
                  </span>
                )}

                <p className="eyebrow mb-4">{ui.about.eyebrow}</p>

                <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-4 text-lg font-medium text-[var(--accent-ink)]">
                  {profile.role}
                </p>
                <hr className="hairline my-6 max-w-xs" />
                <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
                  {profile.tagline}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#contact" className="btn-primary">
                    {ui.hero.ctaSecondary}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#produits" className="btn-outline">
                    {ui.hero.ctaPrimary}
                  </a>
                </div>

                {/* Pastilles de confiance */}
                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {trustPills.map((pill) => (
                    <li
                      key={pill.label}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]"
                    >
                      <pill.icon className="h-4 w-4 text-[var(--accent-ink)]" aria-hidden="true" />
                      {pill.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne portrait — photo de Mariama (fallback monogramme MB) */}
              <div className="reveal-up">
                <HeroPortrait
                  src="/mariama.jpg"
                  name={profile.name}
                  role={profile.role}
                  monogram={profile.monogram}
                />
                <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <a
              href="#chiffres"
              className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              aria-label={ui.hero.scrollAria}
            >
              <ArrowDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* CHIFFRES CLÉS */}
        <section
          id="chiffres"
          aria-label="Key figures"
          className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <dl className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="editorial-card p-6 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter
                    value={stat.value}
                    className="font-display block text-4xl font-semibold tracking-tight text-[var(--accent-ink)] sm:text-5xl"
                  />
                  <span className="mt-2 block text-sm text-[var(--muted)]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* À PROPOS */}
        <section className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow={ui.about.eyebrow} title={ui.about.title} />
          <div className="editorial-card p-6 text-base leading-relaxed text-[var(--foreground)] sm:p-8">
            <p>{profile.bio}</p>
            <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-[var(--accent-ink)]">
              <span className="monogram-badge h-9 w-9 text-xs font-semibold">
                {profile.monogram}
              </span>
              {ui.about.ceoLine}
            </p>
          </div>
        </section>

        {/* SERVICES / PRESTATIONS */}
        <section
          id="produits"
          aria-labelledby="produits-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            id="produits-title"
            eyebrow={ui.products.eyebrow}
            title={ui.products.title}
            subtitle={ui.products.subtitle}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => {
              const Icon = PRODUCT_ICONS[product.icon] ?? Package;
              const featured = i === 0;
              return (
                <article
                  key={product.id}
                  className={`editorial-card flex flex-col p-6 sm:p-7 ${featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent-ink)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {product.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {product.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--surface-border)] px-3 py-1 text-xs font-medium text-[var(--foreground)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* GALERIE AVANT / APRÈS (placeholders élégants, prêts à remplacer) */}
        <section
          id="galerie"
          aria-labelledby="galerie-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            id="galerie-title"
            eyebrow={ui.gallery.eyebrow}
            title={ui.gallery.title}
            subtitle={ui.gallery.subtitle}
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {products.map((product) => {
              const imgs = galleryImages[product.id];
              if (imgs) {
                return (
                  <BeforeAfterSlider
                    key={`g-${product.id}`}
                    before={imgs.before}
                    after={imgs.after}
                    beforeLabel={ui.gallery.beforeLabel}
                    afterLabel={ui.gallery.afterLabel}
                    title={product.title}
                    captionLabel={ui.gallery.beforeAfterLabel}
                  />
                );
              }
              // Pas encore de photos pour cette prestation : placeholder dégradé.
              return (
                <figure key={`g-${product.id}`} className="gallery-tile aspect-[4/5]">
                  <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4">
                    <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-[#f2ede4]">
                      {ui.gallery.beforeAfterLabel}
                    </span>
                    <span className="block font-display text-lg font-semibold text-[#fffdf9]">
                      {product.title}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* ATOUTS */}
        <section
          id="atouts"
          aria-labelledby="atouts-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading id="atouts-title" eyebrow={ui.why.eyebrow} title={ui.why.title} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((item) => {
              const Icon = WHY_ICONS[item.icon] ?? Check;
              return (
                <article key={item.id} className="editorial-card p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent-ink)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* DÉROULÉ / PROCESS */}
        <section
          id="process"
          aria-labelledby="process-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            id="process-title"
            eyebrow={ui.process.eyebrow}
            title={ui.process.title}
            subtitle={ui.process.subtitle}
          />
          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50 lg:block"
              aria-hidden="true"
            />
            {steps.map((step) => (
              <li key={step.id} className="editorial-card relative p-6">
                <span className="font-display inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--surface)] text-base font-semibold text-[var(--accent-ink)]">
                  {step.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* TÉMOIGNAGES */}
        <section
          id="temoignages"
          aria-labelledby="temoignages-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            id="temoignages-title"
            eyebrow={ui.testimonials.eyebrow}
            title={ui.testimonials.title}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="editorial-card flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-[var(--accent)]" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--foreground)]">
                  {t.quote}
                </blockquote>
                <div
                  className="mt-5 flex items-center gap-1 text-[var(--accent-ink)]"
                  aria-label={ui.testimonials.ratingAria}
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="monogram-badge h-10 w-10 text-sm font-semibold">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--foreground)]">
                      {t.author}
                    </span>
                    <span className="block text-xs text-[var(--muted)]">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="mx-auto max-w-3xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading id="faq-title" eyebrow={ui.faq.eyebrow} title={ui.faq.title} />
          <div className="space-y-3">
            {faq.map((item) => (
              <details key={item.id} className="editorial-card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--foreground)]">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-[var(--accent-ink)] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BANDE CTA */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="cta-band px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#fffdf9] sm:text-4xl">
                {ui.cta.title}
              </h2>
              <p className="mt-3 text-[#e9ddc9]">{ui.cta.text}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fffdf9] px-7 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1a1a]"
                >
                  {ui.cta.button}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                {profile.phone && (
                  <a
                    href={`https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#fffdf9]/40 px-7 py-3 text-sm font-semibold text-[#fffdf9] transition-colors hover:bg-[#fffdf9]/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {ui.cta.whatsapp}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default HomeContent;