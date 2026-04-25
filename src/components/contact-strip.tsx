import { FileDown, Mail, MessageCircle } from "lucide-react";
import { getEmailHref, getWhatsappHref, siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/lib/i18n";

type ContactStripProps = {
  locale: Locale;
};

export function ContactStrip({ locale }: ContactStripProps) {
  const dictionary = getDictionary(locale);

  return (
    <div className="contact-strip" aria-label="Contact links">
      <a className="button-link accent" href={getEmailHref()}>
        <Mail aria-hidden size={17} />
        {dictionary.cta.email}
      </a>
      <a
        className="button-link secondary"
        href={getWhatsappHref()}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle aria-hidden size={17} />
        {dictionary.cta.whatsapp}
      </a>
      <a className="button-link" href={siteConfig.contact.cvUrl}>
        <FileDown aria-hidden size={17} />
        {dictionary.cta.cv}
      </a>
    </div>
  );
}
