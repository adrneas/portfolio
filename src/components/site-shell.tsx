import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale, Section } from "@/lib/i18n";

type SiteShellProps = {
  activeSection: Section;
  children: ReactNode;
  languageHref: string;
  locale: Locale;
};

export function SiteShell({
  activeSection,
  children,
  languageHref,
  locale,
}: SiteShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader
        activeSection={activeSection}
        languageHref={languageHref}
        locale={locale}
      />
      <main className="page-main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
