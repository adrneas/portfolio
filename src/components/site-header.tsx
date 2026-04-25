import { Languages } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  collectionPath,
  funPath,
  getDictionary,
  localizedRoute,
  type Locale,
  type Section,
} from "@/lib/i18n";

type SiteHeaderProps = {
  activeSection: Section;
  languageHref: string;
  locale: Locale;
};

export function SiteHeader({
  activeSection,
  languageHref,
  locale,
}: SiteHeaderProps) {
  const dictionary = getDictionary(locale);
  const navItems: Array<{ section: Section; href: string; label: string }> = [
    {
      section: "work",
      href: collectionPath(locale, "work"),
      label: dictionary.nav.work,
    },
    {
      section: "fun",
      href: funPath(locale),
      label: dictionary.nav.fun,
    },
    {
      section: "about",
      href: localizedRoute(locale, "/about"),
      label: dictionary.nav.about,
    },
  ];

  return (
    <header className="site-header">
      <Link className="site-mark" href={localizedRoute(locale)}>
        <span className="site-mark__symbol" aria-hidden>
          A
        </span>
        <span>
          <span className="site-mark__name">{siteConfig.name}</span>
          <span className="site-mark__role">{siteConfig.role}</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {navItems.map((item) => (
          <Link
            aria-current={activeSection === item.section ? "page" : undefined}
            href={item.href}
            key={item.section}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="language-link" href={languageHref}>
        <Languages aria-hidden size={16} />
        {dictionary.switchLabel}
      </Link>
    </header>
  );
}
