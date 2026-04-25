import Link from "next/link";
import { getEmailHref, getWhatsappHref, siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="site-footer">
      <span>
        {siteConfig.name} / {siteConfig.role}
      </span>
      <nav className="footer-links" aria-label="Footer">
        <a href={getEmailHref()}>{dictionary.cta.email}</a>
        <a href={getWhatsappHref()} target="_blank" rel="noreferrer">
          {dictionary.cta.whatsapp}
        </a>
        <Link href={siteConfig.contact.cvUrl}>{dictionary.cta.cv}</Link>
      </nav>
    </footer>
  );
}
