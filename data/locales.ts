/**
 * Contenu traduit du site vitrine de Mariama Bobo Diallo (EN / FR / ES).
 *
 * L'anglais est la langue par défaut (site destiné au marché du Maryland,
 * États-Unis). Le français et l'espagnol sont disponibles via le sélecteur.
 *
 * Toute la donnée « métier » (identité, prestations, atouts, témoignages,
 * FAQ…) et toutes les chaînes UI vivent ici, par langue. Les composants
 * consomment la langue courante via `useLocale()` (voir `lib/i18n.tsx`).
 *
 * Ce qui NE change pas selon la langue : la palette `heroGradient`
 * (réutilisée depuis `data/portfolio.ts`), les coordonnées `phone`/`email`,
 * le nom `name` et les URLs des réseaux sociaux.
 *
 * Ce site est dédié à l'activité de coiffure à domicile de Mariama Bobo
 * Diallo (dite « BOBO »), Maryland, États-Unis — distinct des portefeuilles
 * Dalmitty (néobanque, électronique, mode).
 */

import { heroGradient } from "@/data/portfolio";
import type { SiteData, SocialLink } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Langues disponibles                                                        */
/* -------------------------------------------------------------------------- */

export type Locale = "en" | "fr" | "es";

export interface LocaleMeta {
  code: Locale;
  label: string;
  flag: string;
}

// Ordre = priorité : l'anglais (États-Unis) est la langue par défaut.
export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

/* -------------------------------------------------------------------------- */
/*  Chaînes UI (hors données métier)                                           */
/* -------------------------------------------------------------------------- */

export interface UIStrings {
  trust: { label: string }[]; // pastilles de confiance (libellé seul)
  hero: {
    available: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollAria: string;
  };
  about: { eyebrow: string; title: string; ceoLine: string };
  products: { eyebrow: string; title: string; subtitle: string };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    beforeAfterLabel: string;
    beforeLabel: string;
    afterLabel: string;
  };
  why: { eyebrow: string; title: string };
  process: { eyebrow: string; title: string; subtitle: string };
  testimonials: { eyebrow: string; title: string; ratingAria: string };
  faq: { eyebrow: string; title: string };
  cta: { title: string; text: string; button: string; whatsapp: string };
  contact: { title: string; subtitle: string; whatsapp: string };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    honeypotAria: string;
    submit: string;
    sending: string;
    errors: { name: string; email: string; message: string };
    fallbackError: string;
    fallbackSuccess: string;
  };
  header: { cta: string; openMenu: string; closeMenu: string };
  footer: { socialsAria: string; rights: string };
  whatsapp: { aria: string; sr: string };
  language: { aria: string; label: string };
}

/* -------------------------------------------------------------------------- */
/*  Données métier, par langue                                                 */
/* -------------------------------------------------------------------------- */

const PHONE = "+1 240 795 2141";
const EMAIL = "mariambobodiallo61@gmail.com";
const NAME = "Mariama Bobo Diallo";
const MONOGRAM = "MB";

const SOCIALS_FR: SocialLink[] = [
  { label: "WhatsApp (Mariama Bobo Diallo)", url: "https://wa.me/12407952141", type: "whatsapp" },
  { label: "TikTok", url: "https://vm.tiktok.com/ZS9how6aQDTbu-bvcpg/", type: "tiktok" },
  { label: "E-mail", url: "mariambobodiallo61@gmail.com", type: "email" },
  { label: "Site web", url: "https://bobo-coiffure.vercel.app", type: "website" },
];
const SOCIALS_EN: SocialLink[] = [
  { label: "WhatsApp (Mariama Bobo Diallo)", url: "https://wa.me/12407952141", type: "whatsapp" },
  { label: "TikTok", url: "https://vm.tiktok.com/ZS9how6aQDTbu-bvcpg/", type: "tiktok" },
  { label: "Email", url: "mariambobodiallo61@gmail.com", type: "email" },
  { label: "Website", url: "https://bobo-coiffure.vercel.app", type: "website" },
];
const SOCIALS_ES: SocialLink[] = [
  { label: "WhatsApp (Mariama Bobo Diallo)", url: "https://wa.me/12407952141", type: "whatsapp" },
  { label: "TikTok", url: "https://vm.tiktok.com/ZS9how6aQDTbu-bvcpg/", type: "tiktok" },
  { label: "Correo", url: "mariambobodiallo61@gmail.com", type: "email" },
  { label: "Sitio web", url: "https://bobo-coiffure.vercel.app", type: "website" },
];

/* ---------------------------- FRANÇAIS ------------------------------------- */

const SITE_FR: SiteData = {
  heroGradient,
  profile: {
    name: NAME,
    monogram: MONOGRAM,
    role: "Coiffeuse professionnelle à domicile",
    tagline:
      "Coiffure de luxe qui vient à vous — coupe, couleur, balayage et coiffure événementielle, à domicile partout dans le Maryland.",
    bio: "Mariama Bobo Diallo — dite « BOBO » — est coiffeuse professionnelle. Depuis son studio mobile, elle se déplace à domicile dans tout le Maryland et offre une expérience salon haut de gamme dans le confort de votre maison. Spécialiste reconnue des cheveux texturés et de la coiffure événementielle — mariages, shootings, cérémonies — elle conjugue technique, douceur et sens du détail pour révéler la beauté de chaque chevelure.",
    location: "Maryland, États-Unis — Coiffure à domicile dans tout l'État",
    email: EMAIL,
    phone: PHONE,
    available: true,
  },
  nav: [
    { label: "À propos", href: "#apropos" },
    { label: "Services", href: "#produits" },
    { label: "Galerie", href: "#galerie" },
    { label: "Atouts", href: "#atouts" },
    { label: "Témoignages", href: "#temoignages" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { id: "experience", value: "10+", label: "Ans d'expérience" },
    { id: "clients", value: "500+", label: "Clientes satisfaites" },
    { id: "domicile", value: "100%", label: "À domicile" },
    { id: "villes", value: "15+", label: "Villes desservies" },
  ],
  products: [
    { id: "coupe", icon: "Scissors", title: "Coupe & brushing", description: "Coupe femme, homme et enfant, mise en forme et brushing adaptés à la nature et à la texture de vos cheveux.", tags: ["Coupe", "Brushing", "Tous types"] },
    { id: "couleur", icon: "Palette", title: "Couleur & balayage", description: "Coloration, balayage, mèches et patine pour un rendu lumineux, des reflets subtils et un cheveu respecté.", tags: ["Balayage", "Coloration", "Mèches"] },
    { id: "soins", icon: "Sparkles", title: "Soins profonds & protéines", description: "Soin profond, botox capillaire, kératine et protéines pour nourrir, lisser et réparer la fibre en profondeur.", tags: ["Soin", "Kératine", "Réparation"] },
    { id: "tresses", icon: "Layers", title: "Tresses & coiffure protectrice", description: "Vanilles, box braids, twists et coiffures protectrices réalisées avec soin, douceur et précision.", tags: ["Vanilles", "Box braids", "Protectrice"] },
    { id: "mariage", icon: "Crown", title: "Mariage & coiffure événementielle", description: "Chignons, updos et coiffures de cérémonie pour mariées et invitées — tenues toute la journée, sans retouche.", tags: ["Mariage", "Chignon", "Cérémonie"] },
    { id: "extensions", icon: "Wind", title: "Extensions & volume", description: "Pose d'extensions, rajouts et ajout de volume pour une chevelure pleine, longue et naturelle.", tags: ["Extensions", "Rajouts", "Volume"] },
  ],
  why: [
    { id: "confort", icon: "Home", title: "Le salon vient à vous", description: "Plus de déplacement ni d'attente : je m'installe chez vous, avec mon matériel professionnel, pour une prestation 100% sur-mesure." },
    { id: "expert", icon: "Award", title: "Spécialiste cheveux texturés", description: "Plus de 10 ans d'expérience sur cheveux afro, mixtes et texturés : je connais chaque nature de cheveu et ses besoins." },
    { id: "produits", icon: "Leaf", title: "Produits premium & doux", description: "Des marques sélectionnées, sans sulfates agressifs, qui respectent le cuir chevelu et préservent la fibre." },
    { id: "flexibilite", icon: "CalendarClock", title: "Sur RDV, 7j/7", description: "Horaires flexibles, soirées et week-ends compris : je m'adapte à votre agenda, pas l'inverse." },
  ],
  steps: [
    { id: "contact", step: "01", title: "Prise de contact", description: "Vous m'écrivez sur WhatsApp ou via le formulaire : je réponds rapidement et identifie votre besoin." },
    { id: "consultation", step: "02", title: "Consultation & devis", description: "On échange sur la prestation souhaitée, la nature de vos cheveux et le tarif. Aucune mauvaise surprise." },
    { id: "rdv", step: "03", title: "RDV à domicile", description: "Je me déplace à l'heure convenue, avec mon matériel, et réalise la prestation chez vous." },
    { id: "suivi", step: "04", title: "Après-soin & suivi", description: "Conseils d'entretien personnalisés et suivi : votre satisfaction reste ma priorité après le rendez-vous." },
  ],
  testimonials: [
    { id: "t1", quote: "BOBO est venue chez moi pour un balayage et un brushing. Résultat magnifique, et tout cela sans bouger de chez moi. Je recommande à 100%.", author: "Aïcha T.", role: "Cliente — Silver Spring, Maryland", initials: "AT" },
    { id: "t2", quote: "Coiffure de mariée à domicile le jour J : chignon parfait, tenu toute la journée. Mariama a su me mettre en confiance.", author: "Ndèye F.", role: "Mariée — Baltimore, Maryland", initials: "NF" },
    { id: "t3", quote: "Mes tresses protectrices réalisées avec douceur et précision. Travail soigné et cheveux respectés. Une vraie professionnelle.", author: "Kadiatou S.", role: "Cliente — Rockville, Maryland", initials: "KS" },
  ],
  faq: [
    { id: "q1", question: "Quelles villes du Maryland desservez-vous ?", answer: "Je me déplace dans tout le Maryland : Baltimore, Silver Spring, Rockville, Columbia, Gaithersburg, Frederick et les alentours. Pour une demande hors zone, contactez-moi : on trouvera une solution." },
    { id: "q2", question: "Comment réserver un rendez-vous ?", answer: "Le plus simple est WhatsApp (+1 240 795 2141) ou le formulaire de contact. On confirme la prestation, la date et le tarif avant le rendez-vous." },
    { id: "q3", question: "Quels sont vos tarifs ?", answer: "Les tarifs dépendent de la prestation, de la longueur et de l'épaisseur de vos cheveux. Un devis clair vous est donné après consultation, avant toute prestation." },
    { id: "q4", question: "Faut-il fournir quelque chose ?", answer: "Non. Je viens avec tout mon matériel professionnel et mes produits. Vous n'avez qu'à vous détendre et profiter." },
    { id: "q5", question: "Proposez-vous les coiffures de mariage ?", answer: "Oui. Mariées, demoiselles d'honneur et invitées : un essai préalable est possible, et la coiffure tient toute la journée, à domicile." },
    { id: "q6", question: "Comment annuler ou reporter un rendez-vous ?", answer: "Prévenez-moi au moins 24 h à l'avance sur WhatsApp. Je m'adapte à votre emploi du temps avec plaisir." },
  ],
  socials: SOCIALS_FR,
};

const UI_FR: UIStrings = {
  trust: [
    { label: "Coiffure à domicile" },
    { label: "Cheveux texturés expert" },
    { label: "RDV 7j/7" },
  ],
  hero: {
    available: "Disponible pour de nouveaux rendez-vous",
    ctaPrimary: "Voir mes prestations",
    ctaSecondary: "Prendre rendez-vous",
    scrollAria: "Faire défiler vers les chiffres clés",
  },
  about: { eyebrow: "À propos", title: "L'élégance capillaire qui vient à vous", ceoLine: "Mariama Bobo Diallo — Coiffeuse professionnelle" },
  products: { eyebrow: "Prestations", title: "Mes services", subtitle: "Une expérience salon complète, chez vous — de la coupe à la coiffure de mariage." },
  gallery: { eyebrow: "Galerie", title: "Avant / Après", subtitle: "Un aperçu de mes réalisations, par prestation.", beforeAfterLabel: "Avant — Après", beforeLabel: "Avant", afterLabel: "Après" },
  why: { eyebrow: "Pourquoi me choisir", title: "Ce qui me différencie" },
  process: { eyebrow: "Comment ça marche", title: "Votre rendez-vous en 4 étapes", subtitle: "Simple, flexible et sans fausse note." },
  testimonials: { eyebrow: "Témoignages", title: "Elles me font confiance", ratingAria: "Note 5 sur 5" },
  faq: { eyebrow: "FAQ", title: "Questions fréquentes" },
  cta: { title: "Prête pour un nouveau look ?", text: "Écrivez-moi : je vous réponds rapidement et on fixe votre rendez-vous à domicile.", button: "Prendre rendez-vous", whatsapp: "WhatsApp direct" },
  contact: { title: "Prendre rendez-vous", subtitle: "Une prestation, un conseil ou une question ? Écrivez-moi, je réponds vite.", whatsapp: "Me contacter sur WhatsApp" },
  form: {
    name: "Nom", namePlaceholder: "Votre nom",
    email: "E-mail", emailPlaceholder: "vous@exemple.com",
    subject: "Sujet (optionnel)", subjectPlaceholder: "Objet de votre message",
    message: "Message", messagePlaceholder: "Décrivez la prestation souhaitée, votre type de cheveux et votre ville...",
    honeypotAria: "Champ anti-spam, laissez vide",
    submit: "Envoyer ma demande", sending: "Envoi en cours...",
    errors: { name: "Veuillez saisir au moins 2 caractères.", email: "Adresse e-mail invalide.", message: "Votre message doit contenir au moins 10 caractères." },
    fallbackError: "Impossible d'envoyer le message. Vérifiez votre connexion.", fallbackSuccess: "Message envoyé avec succès.",
  },
  header: { cta: "Prendre RDV", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
  footer: { socialsAria: "Réseaux sociaux", rights: "Tous droits réservés." },
  whatsapp: { aria: "Contacter Mariama sur WhatsApp", sr: "WhatsApp" },
  language: { aria: "Changer de langue", label: "Langue" },
};

/* ---------------------------- ANGLAIS -------------------------------------- */

const SITE_EN: SiteData = {
  heroGradient,
  profile: {
    name: NAME,
    monogram: MONOGRAM,
    role: "Mobile professional hairdresser",
    tagline: "Luxury hairdressing that comes to you — cut, color, balayage and event styling, at home throughout Maryland.",
    bio: "Mariama Bobo Diallo — known as “BOBO” — is a professional hairdresser. From her mobile studio, she travels to homes across Maryland, offering a high-end salon experience in the comfort of your own home. A recognized specialist in textured hair and event styling — weddings, photo shoots, ceremonies — she blends technique, gentleness and an eye for detail to reveal the beauty of every head of hair.",
    location: "Maryland, United States — At-home hairdressing across the state",
    email: EMAIL,
    phone: PHONE,
    available: true,
  },
  nav: [
    { label: "About", href: "#apropos" },
    { label: "Services", href: "#produits" },
    { label: "Gallery", href: "#galerie" },
    { label: "Why me", href: "#atouts" },
    { label: "Reviews", href: "#temoignages" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { id: "experience", value: "10+", label: "Years of experience" },
    { id: "clients", value: "500+", label: "Happy clients" },
    { id: "domicile", value: "100%", label: "At home" },
    { id: "villes", value: "15+", label: "Cities served" },
  ],
  products: [
    { id: "coupe", icon: "Scissors", title: "Cut & blow-dry", description: "Women's, men's and children's cuts, shaping and blow-dry tailored to the nature and texture of your hair.", tags: ["Cut", "Blow-dry", "All types"] },
    { id: "couleur", icon: "Palette", title: "Color & balayage", description: "Coloring, balayage, highlights and toner for a luminous result, subtle reflections and well-respected hair.", tags: ["Balayage", "Color", "Highlights"] },
    { id: "soins", icon: "Sparkles", title: "Deep treatments & proteins", description: "Deep conditioning, hair botox, keratin and proteins to nourish, smooth and repair the fiber from within.", tags: ["Treatment", "Keratin", "Repair"] },
    { id: "tresses", icon: "Layers", title: "Braids & protective styling", description: "Cornrows, box braids, twists and protective styles crafted with care, gentleness and precision.", tags: ["Cornrows", "Box braids", "Protective"] },
    { id: "mariage", icon: "Crown", title: "Wedding & event styling", description: "Updos, buns and ceremony styling for brides and guests — held all day, no touch-ups.", tags: ["Wedding", "Updo", "Ceremony"] },
    { id: "extensions", icon: "Wind", title: "Extensions & volume", description: "Extension installation, add-ons and added volume for a full, long and natural-looking mane.", tags: ["Extensions", "Add-ons", "Volume"] },
  ],
  why: [
    { id: "confort", icon: "Home", title: "The salon comes to you", description: "No travel, no waiting: I set up at your place, with my professional equipment, for a 100% bespoke service." },
    { id: "expert", icon: "Award", title: "Textured-hair specialist", description: "Over 10 years of experience with afro, mixed and textured hair: I know every hair type and its needs." },
    { id: "produits", icon: "Leaf", title: "Premium, gentle products", description: "Selected brands, free of harsh sulfates, that respect the scalp and preserve the fiber." },
    { id: "flexibilite", icon: "CalendarClock", title: "By appointment, 7 days a week", description: "Flexible hours, evenings and weekends included: I adapt to your schedule, not the other way around." },
  ],
  steps: [
    { id: "contact", step: "01", title: "Get in touch", description: "You message me on WhatsApp or via the contact form: I reply quickly and identify your need." },
    { id: "consultation", step: "02", title: "Consultation & quote", description: "We discuss the desired service, your hair type and the price. No surprises." },
    { id: "rdv", step: "03", title: "At-home appointment", description: "I arrive at the agreed time, with my equipment, and deliver the service at your home." },
    { id: "suivi", step: "04", title: "Aftercare & follow-up", description: "Personalized maintenance tips and follow-up: your satisfaction stays my priority after the appointment." },
  ],
  testimonials: [
    { id: "t1", quote: "BOBO came to my home for a balayage and blow-dry. Gorgeous result, all without leaving my house. I recommend her 100%.", author: "Aïcha T.", role: "Client — Silver Spring, Maryland", initials: "AT" },
    { id: "t2", quote: "At-home bridal hair on the big day: a perfect updo, held all day. Mariama put me right at ease.", author: "Ndèye F.", role: "Bride — Baltimore, Maryland", initials: "NF" },
    { id: "t3", quote: "My protective braids done gently and precisely. Neat work and well-cared-for hair. A true professional.", author: "Kadiatou S.", role: "Client — Rockville, Maryland", initials: "KS" },
  ],
  faq: [
    { id: "q1", question: "Which Maryland cities do you serve?", answer: "I travel throughout Maryland: Baltimore, Silver Spring, Rockville, Columbia, Gaithersburg, Frederick and the surrounding areas. For an out-of-area request, contact me and we'll find a solution." },
    { id: "q2", question: "How do I book an appointment?", answer: "The easiest way is WhatsApp (+1 240 795 2141) or the contact form. We confirm the service, date and price before the appointment." },
    { id: "q3", question: "What are your prices?", answer: "Prices depend on the service and the length and thickness of your hair. A clear quote is given after consultation, before any service." },
    { id: "q4", question: "Do I need to provide anything?", answer: "No. I bring all my professional equipment and products. You just relax and enjoy." },
    { id: "q5", question: "Do you do wedding hair?", answer: "Yes. Brides, bridesmaids and guests: a trial run is possible, and the style holds all day, at home." },
    { id: "q6", question: "How do I cancel or reschedule?", answer: "Let me know at least 24 hours in advance on WhatsApp. I'm happy to adapt to your schedule." },
  ],
  socials: SOCIALS_EN,
};

const UI_EN: UIStrings = {
  trust: [
    { label: "At-home hairdressing" },
    { label: "Textured-hair expert" },
    { label: "7 days a week" },
  ],
  hero: {
    available: "Available for new appointments",
    ctaPrimary: "View my services",
    ctaSecondary: "Book an appointment",
    scrollAria: "Scroll down to the key figures",
  },
  about: { eyebrow: "About", title: "Hair elegance that comes to you", ceoLine: "Mariama Bobo Diallo — Professional hairdresser" },
  products: { eyebrow: "Services", title: "What I offer", subtitle: "A complete salon experience, at home — from a cut to wedding styling." },
  gallery: { eyebrow: "Gallery", title: "Before / After", subtitle: "A glimpse of my work, by service.", beforeAfterLabel: "Before — After", beforeLabel: "Before", afterLabel: "After" },
  why: { eyebrow: "Why choose me", title: "What sets me apart" },
  process: { eyebrow: "How it works", title: "Your appointment in 4 steps", subtitle: "Simple, flexible and seamless." },
  testimonials: { eyebrow: "Reviews", title: "They trust me", ratingAria: "Rated 5 out of 5" },
  faq: { eyebrow: "FAQ", title: "Frequently asked questions" },
  cta: { title: "Ready for a new look?", text: "Message me: I reply quickly and we'll set your at-home appointment.", button: "Book an appointment", whatsapp: "WhatsApp direct" },
  contact: { title: "Book an appointment", subtitle: "A service, a tip or a question? Write to me, I reply fast.", whatsapp: "Contact me on WhatsApp" },
  form: {
    name: "Name", namePlaceholder: "Your name",
    email: "Email", emailPlaceholder: "you@example.com",
    subject: "Subject (optional)", subjectPlaceholder: "Subject of your message",
    message: "Message", messagePlaceholder: "Describe the service you'd like, your hair type and your city...",
    honeypotAria: "Anti-spam field, leave empty",
    submit: "Send my request", sending: "Sending...",
    errors: { name: "Please enter at least 2 characters.", email: "Invalid email address.", message: "Your message must contain at least 10 characters." },
    fallbackError: "Unable to send the message. Check your connection.", fallbackSuccess: "Message sent successfully.",
  },
  header: { cta: "Book now", openMenu: "Open menu", closeMenu: "Close menu" },
  footer: { socialsAria: "Social media", rights: "All rights reserved." },
  whatsapp: { aria: "Contact Mariama on WhatsApp", sr: "WhatsApp" },
  language: { aria: "Change language", label: "Language" },
};

/* ---------------------------- ESPAÑOL ------------------------------------ */

const SITE_ES: SiteData = {
  heroGradient,
  profile: {
    name: NAME,
    monogram: MONOGRAM,
    role: "Peluquera profesional a domicilio",
    tagline: "Peluquería de lujo que va a usted — corte, color, balayage y peinado de evento, en casa, por todo Maryland.",
    bio: "Mariama Bobo Diallo — conocida como «BOBO»— es peluquera profesional. Desde su estudio móvil, se desplaza a domicilio por todo Maryland y ofrece una experiencia de salón de alta gama en la comodidad de su casa. Especialista reconocida en cabellos texturizados y peinados de evento — bodas, sesiones fotográficas, ceremonias — combina técnica, delicadeza y sentido del detalle para revelar la belleza de cada cabellera.",
    location: "Maryland, Estados Unidos — Peluquería a domicilio por todo el estado",
    email: EMAIL,
    phone: PHONE,
    available: true,
  },
  nav: [
    { label: "Acerca de", href: "#apropos" },
    { label: "Servicios", href: "#produits" },
    { label: "Galería", href: "#galerie" },
    { label: "Ventajas", href: "#atouts" },
    { label: "Testimonios", href: "#temoignages" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contact" },
  ],
  stats: [
    { id: "experience", value: "10+", label: "Años de experiencia" },
    { id: "clients", value: "500+", label: "Clientas satisfechas" },
    { id: "domicile", value: "100%", label: "A domicilio" },
    { id: "villes", value: "15+", label: "Ciudades atendidas" },
  ],
  products: [
    { id: "coupe", icon: "Scissors", title: "Corte & brushing", description: "Corte de mujer, hombre y niño, modelado y brushing adaptados a la naturaleza y textura de su cabello.", tags: ["Corte", "Brushing", "Todos los tipos"] },
    { id: "couleur", icon: "Palette", title: "Color & balayage", description: "Coloración, balayage, mechas y tónico para un resultado luminoso, reflejos sutiles y un cabello respetado.", tags: ["Balayage", "Coloración", "Mechas"] },
    { id: "soins", icon: "Sparkles", title: "Tratamientos & proteínas", description: "Tratamiento profundo, botox capilar, queratina y proteínas para nutrir, alisar y reparar la fibra.", tags: ["Tratamiento", "Queratina", "Reparación"] },
    { id: "tresses", icon: "Layers", title: "Trenzas & peinado protector", description: "Vanillas, box braids, twists y peinados protectores realizados con cuidado, delicadeza y precisión.", tags: ["Vanillas", "Box braids", "Protector"] },
    { id: "mariage", icon: "Crown", title: "Boda & peinado de evento", description: "Moños, updos y peinados de ceremonia para novias e invitadas — duran todo el día, sin retoques.", tags: ["Boda", "Moño", "Ceremonia"] },
    { id: "extensions", icon: "Wind", title: "Extensiones & volumen", description: "Aplicación de extensiones, postizos y volumen para una cabellera llena, larga y natural.", tags: ["Extensiones", "Postizos", "Volumen"] },
  ],
  why: [
    { id: "confort", icon: "Home", title: "El salón va a usted", description: "Sin desplazamientos ni esperas: me instalo en su casa, con mi material profesional, para un servicio 100% personalizado." },
    { id: "expert", icon: "Award", title: "Especialista en cabellos texturizados", description: "Más de 10 años de experiencia con cabellos afro, mixtos y texturizados: conozco cada tipo de cabello y sus necesidades." },
    { id: "produits", icon: "Leaf", title: "Productos premium y suaves", description: "Marcas seleccionadas, sin sulfatos agresivos, que respetan el cuero cabelludo y preservan la fibra." },
    { id: "flexibilite", icon: "CalendarClock", title: "Con cita, 7 días/semana", description: "Horarios flexibles, incluidas noches y fines de semana: me adapto a su agenda, no al revés." },
  ],
  steps: [
    { id: "contact", step: "01", title: "Primer contacto", description: "Me escribe por WhatsApp o mediante el formulario: respondo rápido e identifico su necesidad." },
    { id: "consultation", step: "02", title: "Consulta y presupuesto", description: "Hablamos del servicio deseado, su tipo de cabello y el precio. Sin sorpresas." },
    { id: "rdv", step: "03", title: "Cita a domicilio", description: "Me desplazo a la hora acordada, con mi material, y realizo el servicio en su casa." },
    { id: "suivi", step: "04", title: "Post-tratamiento y seguimiento", description: "Consejos de mantenimiento personalizados y seguimiento: su satisfacción sigue siendo mi prioridad después de la cita." },
  ],
  testimonials: [
    { id: "t1", quote: "BOBO vino a mi casa para un balayage y un brushing. Resultado precioso, y todo sin salir de casa. La recomiendo al 100%.", author: "Aïcha T.", role: "Clienta — Silver Spring, Maryland", initials: "AT" },
    { id: "t2", quote: "Peinado de novia a domicilio el gran día: un moño perfecto, aguantó todo el día. Mariama me dio confianza.", author: "Ndèye F.", role: "Novia — Baltimore, Maryland", initials: "NF" },
    { id: "t3", quote: "Mis trenzas protectoras hechas con delicadeza y precisión. Trabajo esmerado y cabello respetado. Una verdadera profesional.", author: "Kadiatou S.", role: "Clienta — Rockville, Maryland", initials: "KS" },
  ],
  faq: [
    { id: "q1", question: "¿Qué ciudades de Maryland atiende?", answer: "Me desplazo por todo Maryland: Baltimore, Silver Spring, Rockville, Columbia, Gaithersburg, Frederick y alrededores. Para una solicitud fuera de zona, contácteme: encontraremos una solución." },
    { id: "q2", question: "¿Cómo reservar una cita?", answer: "Lo más sencillo es WhatsApp (+1 240 795 2141) o el formulario de contacto. Confirmamos el servicio, la fecha y el precio antes de la cita." },
    { id: "q3", question: "¿Cuáles son sus precios?", answer: "Los precios dependen del servicio y de la longitud y grosor de su cabello. Se le da un presupuesto claro tras la consulta, antes de cualquier servicio." },
    { id: "q4", question: "¿Hay que proporcionar algo?", answer: "No. Traigo todo mi material profesional y mis productos. Solo tiene que relajarse y disfrutar." },
    { id: "q5", question: "¿Hace peinados de boda?", answer: "Sí. Novias, damas de honor e invitadas: es posible una prueba previa, y el peinado aguanta todo el día, a domicilio." },
    { id: "q6", question: "¿Cómo cancelar o reprogramar?", answer: "Avíseme con al menos 24 h de antelación por WhatsApp. Me adapto a su agenda con gusto." },
  ],
  socials: SOCIALS_ES,
};

const UI_ES: UIStrings = {
  trust: [
    { label: "Peluquería a domicilio" },
    { label: "Especialista en cabellos texturizados" },
    { label: "7 días/semana" },
  ],
  hero: {
    available: "Disponible para nuevas citas",
    ctaPrimary: "Ver mis servicios",
    ctaSecondary: "Reservar una cita",
    scrollAria: "Bajar a las cifras clave",
  },
  about: { eyebrow: "Acerca de", title: "La elegancia capilar que va a usted", ceoLine: "Mariama Bobo Diallo — Peluquera profesional" },
  products: { eyebrow: "Servicios", title: "Lo que ofrezco", subtitle: "Una experiencia de salón completa, en casa — del corte al peinado de boda." },
  gallery: { eyebrow: "Galería", title: "Antes / Después", subtitle: "Un vistazo a mi trabajo, por servicio.", beforeAfterLabel: "Antes — Después", beforeLabel: "Antes", afterLabel: "Después" },
  why: { eyebrow: "Por qué elegirme", title: "Lo que me distingue" },
  process: { eyebrow: "Cómo funciona", title: "Su cita en 4 pasos", subtitle: "Sencillo, flexible y sin fallos." },
  testimonials: { eyebrow: "Testimonios", title: "Confían en mí", ratingAria: "Valoración 5 de 5" },
  faq: { eyebrow: "FAQ", title: "Preguntas frecuentes" },
  cta: { title: "¿Lista para un nuevo look?", text: "Escríbame: respondo rápido y fijamos su cita a domicilio.", button: "Reservar una cita", whatsapp: "WhatsApp directo" },
  contact: { title: "Reservar una cita", subtitle: "¿Un servicio, un consejo o una pregunta? Escríbame, respondo rápido.", whatsapp: "Contactarme por WhatsApp" },
  form: {
    name: "Nombre", namePlaceholder: "Su nombre",
    email: "Correo", emailPlaceholder: "usted@ejemplo.com",
    subject: "Asunto (opcional)", subjectPlaceholder: "Asunto de su mensaje",
    message: "Mensaje", messagePlaceholder: "Describa el servicio que desea, su tipo de cabello y su ciudad...",
    honeypotAria: "Campo anti-spam, déjelo vacío",
    submit: "Enviar mi solicitud", sending: "Enviando...",
    errors: { name: "Introduzca al menos 2 caracteres.", email: "Dirección de correo inválida.", message: "Su mensaje debe contener al menos 10 caracteres." },
    fallbackError: "No se pudo enviar el mensaje. Compruebe su conexión.", fallbackSuccess: "Mensaje enviado con éxito.",
  },
  header: { cta: "Reservar", openMenu: "Abrir menú", closeMenu: "Cerrar menú" },
  footer: { socialsAria: "Redes sociales", rights: "Todos los derechos reservados." },
  whatsapp: { aria: "Contactar a Mariama por WhatsApp", sr: "WhatsApp" },
  language: { aria: "Cambiar de idioma", label: "Idioma" },
};

/* -------------------------------------------------------------------------- */
/*  Accès                                                                       */
/* -------------------------------------------------------------------------- */

const SITES: Record<Locale, SiteData> = { en: SITE_EN, fr: SITE_FR, es: SITE_ES };
const UIS: Record<Locale, UIStrings> = { en: UI_EN, fr: UI_FR, es: UI_ES };

export function getSiteData(locale: Locale): SiteData {
  return SITES[locale] ?? SITES.en;
}

export function getUiStrings(locale: Locale): UIStrings {
  return UIS[locale] ?? UIS.en;
}