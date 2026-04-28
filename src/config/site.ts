export const siteConfig = {
  name: "Andreas",
  role: "Product designer",
  title: "Andreas - Portfólio editorial",
  description:
    "Portfólio editorial bilíngue de design, arte, textos e projetos autorais.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-mois.es",
  contact: {
    email: "andreas.r.hennig@gmail.com",
    whatsapp: "5551997857796",
    cvUrl: "/CV_AndreasHennig.pdf",
  },
  profileImage: "/profile.png",
  socials: {
    linkedin: "https://www.linkedin.com/in/andreas-r-hennig/",
    instagram: "https://www.instagram.com/adrneas/",
    substack: "https://substack.com/@adrneas",
  },
} as const;

export function getEmailHref() {
  return `mailto:${siteConfig.contact.email}`;
}

export function getWhatsappHref() {
  return `https://wa.me/${siteConfig.contact.whatsapp}`;
}
