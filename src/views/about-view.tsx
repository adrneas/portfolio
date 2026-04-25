import { ContactStrip } from "@/components/contact-strip";
import { SiteShell } from "@/components/site-shell";
import {
  getDictionary,
  getOppositeLocale,
  localizedRoute,
  type Locale,
} from "@/lib/i18n";

type AboutViewProps = {
  locale: Locale;
};

export function AboutView({ locale }: AboutViewProps) {
  const dictionary = getDictionary(locale);
  const otherLocale = getOppositeLocale(locale);

  return (
    <SiteShell
      activeSection="about"
      languageHref={localizedRoute(otherLocale, "/about")}
      locale={locale}
    >
      <section className="page-title">
        <div>
          <p className="eyebrow">{dictionary.nav.about}</p>
          <h1>{dictionary.about.title}</h1>
          <p>{dictionary.about.intro}</p>
        </div>
      </section>

      <section className="about-grid">
        <div className="prose">
          <p>{dictionary.about.bio}</p>
          <h2>{dictionary.about.practiceTitle}</h2>
          <ul>
            {dictionary.about.practice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="about-panel">
          <h2>{dictionary.about.contactTitle}</h2>
          <p>
            {locale === "pt"
              ? "Para convites, freelas, oportunidades em estudio ou conversas sobre projetos em andamento."
              : "For collaborations, studio opportunities, freelance work, or conversations about projects in progress."}
          </p>
          <ContactStrip locale={locale} />
        </aside>
      </section>
    </SiteShell>
  );
}
