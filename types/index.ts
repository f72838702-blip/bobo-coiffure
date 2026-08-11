/**
 * Types centraux du site vitrine BOBO Coiffure — coiffeuse professionnelle
 * à domicile (Mariama Bobo Diallo), Maryland, États-Unis.
 *
 * Le contenu (identité, produits, atouts, témoignages, etc.) vit dans
 * `data/portfolio.ts` et est consommé par les composants et la route API.
 */

/* -------------------------------------------------------------------------- */
/*  Identité & navigation                                                        */
/* -------------------------------------------------------------------------- */

/** Identité du commerçant affichée dans le hero et l'en-tête. */
export interface Profile {
  /** Nom commercial / raison sociale. */
  name: string;
  /** Initiales du monogramme affiché en logo liquide (ex. "DA"). */
  monogram: string;
  /** Activité affichée sous le nom (ex. "Commerçant professionnel"). */
  role: string;
  /** Phrase d'accroche courte. */
  tagline: string;
  /** Présentation longue pour la section "À propos". */
  bio: string;
  /** Localisation ou zone d'activité. */
  location: string;
  /** Adresse e-mail de contact. */
  email: string;
  /** Téléphone optionnel. */
  phone?: string;
  /** Indique si le commerçant accepte de nouveaux clients / commandes. */
  available: boolean;
}

/** Élément du menu de navigation principal. */
export interface NavItem {
  /** Libellé affiché. */
  label: string;
  /** Ancre vers une section de la page (ex. "#produits"). */
  href: string;
}

/* -------------------------------------------------------------------------- */
/*  Hero : gradient 3D (ShaderGradient)                                          */
/* -------------------------------------------------------------------------- */

/** Configuration du gradient 3D animé du Hero. */
export interface HeroGradient {
  type: "plane" | "sphere" | "waterPlane";
  color1: string;
  color2: string;
  color3: string;
  uSpeed: number;
  uStrength: number;
  uFrequency: number;
  cPolarAngle: number;
  cDistance: number;
  lightType: "3d" | "env";
  envPreset?: string;
  grain: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Chiffres clés & produits / domaines                                          */
/* -------------------------------------------------------------------------- */

/** Chiffre clé affiché dans la barre de réassurance. */
export interface Stat {
  /** Identifiant stable. */
  id: string;
  /** Valeur affichée (ex. "15+", "2 500", "98%"). */
  value: string;
  /** Libellé sous la valeur. */
  label: string;
}

/** Domaine d'activité / catégorie de produits, affiché en carte. */
export interface Product {
  /** Identifiant stable (slug). */
  id: string;
  /** Icône Lucide référencée par nom. */
  icon: string;
  /** Titre de la catégorie. */
  title: string;
  /** Description courte. */
  description: string;
  /** Mot-clés / exemples affichés en badges. */
  tags: string[];
}

/* -------------------------------------------------------------------------- */
/*  Atouts, process, témoignages, FAQ                                            */
/* -------------------------------------------------------------------------- */

/** Atout différenciant (« Pourquoi me choisir »). */
export interface WhyItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/** Étape du processus de collaboration. */
export interface Step {
  id: string;
  /** Numéro d'étape affiché (ex. "01"). */
  step: string;
  title: string;
  description: string;
}

/** Témoignage client. */
export interface Testimonial {
  id: string;
  /** Citation. */
  quote: string;
  /** Nom du client. */
  author: string;
  /** Fonction / entreprise. */
  role: string;
  /** Initiales pour l'avatar. */
  initials: string;
}

/** Question / réponse de la FAQ. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/* -------------------------------------------------------------------------- */
/*  Réseaux sociaux                                                              */
/* -------------------------------------------------------------------------- */

/** Lien vers un profil sur un réseau ou une plateforme. */
export interface SocialLink {
  label: string;
  url: string;
  type: "github" | "linkedin" | "twitter" | "facebook" | "tiktok" | "email" | "website" | "whatsapp" | "other";
}

/* -------------------------------------------------------------------------- */
/*  Formulaire de contact (UI + route API)                                        */
/* -------------------------------------------------------------------------- */

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  token?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactPayload, string>>;
}

/* -------------------------------------------------------------------------- */
/*  Type agrégé                                                                  */
/* -------------------------------------------------------------------------- */

/** Structure de données complète du site, exportée par `data/portfolio.ts`. */
export interface SiteData {
  profile: Profile;
  heroGradient: HeroGradient;
  nav: NavItem[];
  stats: Stat[];
  products: Product[];
  why: WhyItem[];
  steps: Step[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  socials: SocialLink[];
}