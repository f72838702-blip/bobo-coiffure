import type { Metadata } from "next";

import { profile } from "@/data/portfolio";
import { HomeContent } from "@/components/home-content";

// Métadonnées SEO canoniques (français). Le contenu affiché, lui, suit la
// langue choisie par le visiteur via le sélecteur (contexte client).
export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function HomePage() {
  return <HomeContent />;
}