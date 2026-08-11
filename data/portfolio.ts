/**
 * Source de données unique du site vitrine de Mariama Bobo Diallo —
 * coiffeuse professionnelle à domicile (Maryland, États-Unis).
 *
 * IMPORTANT : ce site (BOBO Coiffure) est indépendant du projet « Dalmitty
 * néobanque », du portefeuille électronique « Dalmitty Market Solution »
 * (dalmitty-2) et du portefeuille mode « Dalmitty Commercial EI »
 * (dalmitty-mode). Ici, c'est la marque personnelle de Mariama Bobo Diallo
 * (dite « BOBO ») : coiffure de luxe à domicile — coupe, couleur, balayage,
 * soins, tresses protectrices, mariage & événementiel — déplacement dans
 * tout le Maryland.
 *
 * Toute modification de contenu se fait ici, sans toucher aux composants.
 */

import type {
  SiteData,
  Profile,
  HeroGradient,
  NavItem,
  Stat,
  Product,
  WhyItem,
  Step,
  Testimonial,
  FaqItem,
  SocialLink,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*  Identité                                                                     */
/* -------------------------------------------------------------------------- */

const profile: Profile = {
  name: "Mariama Bobo Diallo",
  monogram: "MB",
  role: "Coiffeuse professionnelle à domicile",
  tagline:
    "Coiffure de luxe qui vient à vous — coupe, couleur, balayage et coiffure événementielle, à domicile partout dans le Maryland.",
  bio: "Mariama Bobo Diallo — dite « BOBO » — est coiffeuse professionnelle. Depuis son studio mobile, elle se déplace à domicile dans tout le Maryland et offre une expérience salon haut de gamme dans le confort de votre maison. Spécialiste reconnue des cheveux texturés et de la coiffure événementielle — mariages, shootings, cérémonies — elle conjugue technique, douceur et sens du détail pour révéler la beauté de chaque chevelure.",
  location: "Maryland, États-Unis — Coiffure à domicile dans tout l'État",
  email: "mariambobodiallo61@gmail.com",
  phone: "+1 240 795 2141",
  available: true,
};

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                   */
/* -------------------------------------------------------------------------- */

const nav: NavItem[] = [
  { label: "À propos", href: "#apropos" },
  { label: "Services", href: "#produits" },
  { label: "Galerie", href: "#galerie" },
  { label: "Atouts", href: "#atouts" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------------------------------------------------- */
/*  Hero : palette warm (ivoire / rose-gold) — non animée (éditorial)            */
/* -------------------------------------------------------------------------- */

const heroGradient: HeroGradient = {
  type: "plane",
  color1: "#f7f3ec", // ivoire chaud
  color2: "#e2d3bd", // sable
  color3: "#c9a27a", // rose-gold
  uSpeed: 0,
  uStrength: 0,
  uFrequency: 0,
  cPolarAngle: 90,
  cDistance: 3.4,
  lightType: "3d",
  grain: false,
};

/* -------------------------------------------------------------------------- */
/*  Chiffres clés                                                                */
/* -------------------------------------------------------------------------- */

const stats: Stat[] = [
  { id: "experience", value: "10+", label: "Ans d'expérience" },
  { id: "clients", value: "500+", label: "Clientes satisfaites" },
  { id: "domicile", value: "100%", label: "À domicile" },
  { id: "villes", value: "15+", label: "Villes desservies" },
];

/* -------------------------------------------------------------------------- */
/*  Prestations / services                                                       */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    id: "coupe",
    icon: "Scissors",
    title: "Coupe & brushing",
    description:
      "Coupe femme, homme et enfant, mise en forme et brushing adaptés à la nature et à la texture de vos cheveux.",
    tags: ["Coupe", "Brushing", "Tous types"],
  },
  {
    id: "couleur",
    icon: "Palette",
    title: "Couleur & balayage",
    description:
      "Coloration, balayage, mèches et patine pour un rendu lumineux, des reflets subtils et un cheveu respecté.",
    tags: ["Balayage", "Coloration", "Mèches"],
  },
  {
    id: "soins",
    icon: "Sparkles",
    title: "Soins profonds & protéines",
    description:
      "Soin profond, botox capillaire, kératine et protèines pour nourrir, lisser et réparer la fibre en profondeur.",
    tags: ["Soin", "Kératine", "Réparation"],
  },
  {
    id: "tresses",
    icon: "Layers",
    title: "Tresses & coiffure protectrice",
    description:
      "Vanilles, box braids, twists et coiffures protectrices réalisées avec soin, douceur et précision.",
    tags: ["Vanilles", "Box braids", "Protectrice"],
  },
  {
    id: "mariage",
    icon: "Crown",
    title: "Mariage & coiffure événementielle",
    description:
      "Chignons, updos et coiffures de cérémonie pour mariées et invitées — tenues toute la journée, sans retouche.",
    tags: ["Mariage", "Chignon", "Cérémonie"],
  },
  {
    id: "extensions",
    icon: "Wind",
    title: "Extensions & volume",
    description:
      "Pose d'extensions, rajouts et ajout de volume pour une chevelure pleine, longue et naturelle.",
    tags: ["Extensions", "Rajouts", "Volume"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Atouts différenciants                                                        */
/* -------------------------------------------------------------------------- */

const why: WhyItem[] = [
  {
    id: "confort",
    icon: "Home",
    title: "Le salon vient à vous",
    description:
      "Plus de déplacement ni d'attente : je m'installe chez vous, avec mon matériel professionnel, pour une prestation 100% sur-mesure.",
  },
  {
    id: "expert",
    icon: "Award",
    title: "Spécialiste cheveux texturés",
    description:
      "Plus de 10 ans d'expérience sur cheveux afro, mixtes et texturés : je connais chaque nature de cheveu et ses besoins.",
  },
  {
    id: "produits",
    icon: "Leaf",
    title: "Produits premium & doux",
    description:
      "Des marques sélectionnées, sans sulfates agressifs, qui respectent le cuir chevelu et préservent la fibre.",
  },
  {
    id: "flexibilite",
    icon: "CalendarClock",
    title: "Sur RDV, 7j/7",
    description:
      "Horaires flexibles, soirées et week-ends compris : je m'adapte à votre agenda, pas l'inverse.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Déroulé d'un rendez-vous                                                      */
/* -------------------------------------------------------------------------- */

const steps: Step[] = [
  {
    id: "contact",
    step: "01",
    title: "Prise de contact",
    description:
      "Vous m'écrivez sur WhatsApp ou via le formulaire : je réponds rapidement et identifie votre besoin.",
  },
  {
    id: "consultation",
    step: "02",
    title: "Consultation & devis",
    description:
      "On échange sur la prestation souhaitée, la nature de vos cheveux et le tarif. Aucune mauvaise surprise.",
  },
  {
    id: "rdv",
    step: "03",
    title: "RDV à domicile",
    description:
      "Je me déplace à l'heure convenue, avec mon matériel, et réalise la prestation chez vous.",
  },
  {
    id: "suivi",
    step: "04",
    title: "Après-soin & suivi",
    description:
      "Conseils d'entretien personnalisés et suivi : votre satisfaction reste ma priorité après le rendez-vous.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Témoignages (clientes Maryland)                                              */
/* -------------------------------------------------------------------------- */

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "BOBO est venue chez moi pour un balayage et un brushing. Résultat magnifique, et tout cela sans bouger de chez moi. Je recommande à 100%.",
    author: "Aïcha T.",
    role: "Cliente — Silver Spring, Maryland",
    initials: "AT",
  },
  {
    id: "t2",
    quote:
      "Coiffure de mariée à domicile le jour J : chignon parfait, tenu toute la journée. Mariama a su me mettre en confiance.",
    author: "Ndèye F.",
    role: "Mariée — Baltimore, Maryland",
    initials: "NF",
  },
  {
    id: "t3",
    quote:
      "Mes tresses protectrices réalisées avec douceur et précision. Travail soigné et cheveux respectés. Une vraie professionnelle.",
    author: "Kadiatou S.",
    role: "Cliente — Rockville, Maryland",
    initials: "KS",
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                          */
/* -------------------------------------------------------------------------- */

const faq: FaqItem[] = [
  {
    id: "q1",
    question: "Quelles villes du Maryland desservez-vous ?",
    answer:
      "Je me déplace dans tout le Maryland : Baltimore, Silver Spring, Rockville, Columbia, Gaithersburg, Frederick et les alentours. Pour une demande hors zone, contactez-moi : on trouvera une solution.",
  },
  {
    id: "q2",
    question: "Comment réserver un rendez-vous ?",
    answer:
      "Le plus simple est WhatsApp (+1 240 795 2141) ou le formulaire de contact. On confirme la prestation, la date et le tarif avant le rendez-vous.",
  },
  {
    id: "q3",
    question: "Quels sont vos tarifs ?",
    answer:
      "Les tarifs dépendent de la prestation, de la longueur et de l'épaisseur de vos cheveux. Un devis clair vous est donné après consultation, avant toute prestation.",
  },
  {
    id: "q4",
    question: "Faut-il fournir quelque chose ?",
    answer:
      "Non. Je viens avec tout mon matériel professionnel et mes produits. Vous n'avez qu'à vous détendre et profiter.",
  },
  {
    id: "q5",
    question: "Proposez-vous les coiffures de mariage ?",
    answer:
      "Oui. Mariées, demoiselles d'honneur et invitées : un essai préalable est possible, et la coiffure tient toute la journée, à domicile.",
  },
  {
    id: "q6",
    question: "Comment annuler ou reporter un rendez-vous ?",
    answer:
      "Prévenez-moi au moins 24 h à l'avance sur WhatsApp. Je m'adapte à votre emploi du temps avec plaisir.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Réseaux / contact                                                            */
/* -------------------------------------------------------------------------- */

const socials: SocialLink[] = [
  {
    label: "WhatsApp (Mariama Bobo Diallo)",
    url: "https://wa.me/12407952141",
    type: "whatsapp",
  },
  {
    label: "TikTok",
    url: "https://vm.tiktok.com/ZS9how6aQDTbu-bvcpg/",
    type: "tiktok",
  },
  {
    label: "E-mail",
    url: "mariambobodiallo61@gmail.com",
    type: "email",
  },
  { label: "Site web", url: "https://bobo-coiffure.vercel.app", type: "website" },
];

/* -------------------------------------------------------------------------- */
/*  Galerie Avant / Après — photos par prestation                              */
/* -------------------------------------------------------------------------- */
/*  Déposez les photos dans `public/gallery/` avec ces noms exacts :
 *      <id>-avant.jpg   (avant la prestation)
 *      <id>-apres.jpg   (après la prestation)
 *  Format conseillé : portrait 4:5 (ex. 1000×1250 px), JPG ou WebP.
 *  Tant qu'une paire est absente du dossier, la tuile affiche
 *  automatiquement le placeholder dégradé (fallback sur erreur d'image).       */
export const galleryImages: Record<string, { before: string; after: string }> = {
  coupe:      { before: "/gallery/coupe-avant.jpg",      after: "/gallery/coupe-apres.jpg" },
  couleur:    { before: "/gallery/couleur-avant.jpg",    after: "/gallery/couleur-apres.jpg" },
  soins:      { before: "/gallery/soins-avant.jpg",      after: "/gallery/soins-apres.jpg" },
  tresses:    { before: "/gallery/tresses-avant.jpg",    after: "/gallery/tresses-apres.jpg" },
  mariage:    { before: "/gallery/mariage-avant.jpg",    after: "/gallery/mariage-apres.jpg" },
  extensions: { before: "/gallery/extensions-avant.jpg", after: "/gallery/extensions-apres.jpg" },
};

/* -------------------------------------------------------------------------- */
/*  Export agrégé                                                                */
/* -------------------------------------------------------------------------- */

export const portfolio: SiteData = {
  profile,
  heroGradient,
  nav,
  stats,
  products,
  why,
  steps,
  testimonials,
  faq,
  socials,
};

/** Accès rapides typés (utilisés par les composants partagés). */
export {
  profile,
  heroGradient,
  nav,
  stats,
  products,
  why,
  steps,
  testimonials,
  faq,
  socials,
};