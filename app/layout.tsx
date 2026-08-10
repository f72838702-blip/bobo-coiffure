import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";

import { profile } from "@/data/portfolio";
import { LocaleProvider } from "@/lib/i18n";
import { WhatsappFab } from "@/components/whatsapp-fab";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

// Viewport mobile : largeur device + themeColor adapté au mode clair/sombre
// (coloration de la barre du navigateur mobile) + viewportFit "cover" pour
// étendre le contenu sous les encoches (active env(safe-area-inset-*)).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" }, // ivoire chaud
    { media: "(prefers-color-scheme: dark)", color: "#15120e" }, // charbon chaud
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.bio,
  metadataBase: new URL("https://dalmitty-coiffure.vercel.app"),
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#f7f3ec] font-sans text-[#1a1a1a] antialiased dark:bg-[#15120e] dark:text-[#f2ede4]">
        {/* Script anti-flash : applique le thème avant hydration pour éviter
            tout scintillement. Lit `localStorage.theme`, sinon suit la
            préférence système. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <LocaleProvider>
          {children}
          <WhatsappFab />
        </LocaleProvider>
      </body>
    </html>
  );
}