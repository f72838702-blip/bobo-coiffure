import type { Metadata } from "next";

import { profile } from "@/data/portfolio";
import { HomeContent } from "@/components/home-content";

// Métadonnées SEO canoniques en anglais (langue par défaut — Maryland, USA).
// Le contenu affiché suit la langue choisie par le visiteur via le sélecteur.
export const metadata: Metadata = {
  title: `${profile.name} — Mobile professional hairdresser`,
  description:
    "Luxury hairdressing that comes to you — cut, color, balayage and event styling, at home throughout Maryland.",
};

export default function HomePage() {
  return <HomeContent />;
}