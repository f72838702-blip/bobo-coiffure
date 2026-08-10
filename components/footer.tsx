"use client";

import * as React from "react";
import { Globe, Mail, ExternalLink, type LucideIcon } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import type { SocialLink } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Icônes de marque (SVG inline — lucide a retiré les icônes de marque)       */
/* -------------------------------------------------------------------------- */

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const GithubIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.37.5 0 5.78 0 11.29c0 4.76 3.13 8.8 7.48 10.23.55.1.75-.23.75-.52 0-.26-.01-.95-.02-1.87-3.04.64-3.68-1.43-3-1.43-.4-.2-.83-.95-1.43-1.84-.6-.9-1.27-.8-1.6-1.28-.13-.16.05-.62.46-.62.4 0 .9.3 1.2.66.7.9 1.34 1.06 1.7.7.04-.4.2-.7.36-.86-2.45-.27-4.5-1.2-4.5-4.9 0-1.07.4-1.95 1.06-2.64-.1-.27-.46-1.27.1-2.64 0 0 .85-.27 2.78 1.01a9.7 9.7 0 0 1 5.04 0c1.93-1.28 2.78-1.01 2.78-1.01.56 1.37.2 2.37.1 2.64.66.69 1.06 1.57 1.06 2.64 0 3.7-2.05 4.62-4.5 4.88.27.24.5.7.5 1.42 0 1.03-.01 1.86-.01 2.11 0 .29.2.63.76.52A11.27 11.27 0 0 0 24 11.29C24 5.78 18.63.5 12 .5z" />
  </svg>
);

const LinkedinIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const TwitterIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.24 2.25h3.3l-7.2 8.23L23 21.75h-6.63l-5.2-6.79-5.94 6.79H1.93l7.7-8.79L1.5 2.25h6.8l4.7 6.21 5.24-6.21zm-1.16 17.5h1.83L7.01 4.13H5.05l12.03 15.62z" />
  </svg>
);

const FacebookIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.12 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z" />
  </svg>
);

const TiktokIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.1v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.5 2.59 2.59 0 0 1 2.59-2.59c.27 0 .53.04.78.12v-3.1a5.67 5.67 0 0 0-.78-.05 5.69 5.69 0 1 0 5.69 5.69V9.01a7.34 7.34 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48z" />
  </svg>
);

const WhatsappIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.623 5.319l-.999 3.648 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const SOCIAL_ICONS: Record<SocialLink["type"], IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  website: Globe as unknown as IconComponent,
  whatsapp: WhatsappIcon,
  email: Mail as unknown as IconComponent,
  other: ExternalLink as unknown as IconComponent,
};

function SocialItem({ social }: { social: SocialLink }) {
  const Icon = SOCIAL_ICONS[social.type] ?? ExternalLink;
  const isEmail = social.type === "email";
  const href = isEmail ? `mailto:${social.url.replace(/^mailto:/, "")}` : social.url;

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-black/5 hover:text-[var(--accent-ink)] dark:hover:bg-white/10"
      aria-label={social.label}
      title={social.label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function Footer() {
  const { site, ui } = useLocale();
  const { profile, socials } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Identité */}
          <div className="text-center sm:text-left">
            <p className="font-display text-base font-semibold text-[var(--foreground)]">
              {profile.name}
            </p>
            <p className="text-xs text-[var(--muted)]">{profile.role}</p>
          </div>

          {/* Réseaux sociaux */}
          <nav aria-label={ui.footer.socialsAria}>
            <ul className="flex items-center gap-1">
              {socials.map((social) => (
                <li key={social.label}>
                  <SocialItem social={social} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mention de copyright */}
        <div className="mt-8 border-t border-[var(--surface-border)] pt-6 text-center">
          <p className="text-xs text-[var(--muted)]">
            &copy; {year} {profile.name}. {ui.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;