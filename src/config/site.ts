export const siteConfig = {
  name: "Andreas",
  role: "Designer visual e de produto",
  title: "Andreas - Portfolio editorial",
  description:
    "Portfolio editorial bilingue de design, arte, textos e projetos autorais.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-mois.es",
  contact: {
    email: "hello@moises.design",
    whatsapp: "5511999999999",
    cvUrl: "/cv-placeholder.pdf",
  },
  profileImage: "/profile.png",
  socials: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    substack: "https://substack.com/",
  },
} as const;

export function getEmailHref() {
  return `mailto:${siteConfig.contact.email}`;
}

export function getWhatsappHref() {
  return `https://wa.me/${siteConfig.contact.whatsapp}`;
}
