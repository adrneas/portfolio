import Link from "next/link";
import { ContactStrip } from "@/components/contact-strip";
import { EntryList } from "@/components/entry-list";
import { HomeHeroMotion } from "@/components/home-hero-motion";
import { HomePreviewCard } from "@/components/home-preview-card";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/config/site";
import { getEntries } from "@/lib/content";
import {
  collectionPath,
  funPath,
  getDictionary,
  getOppositeLocale,
  localizedRoute,
  type Locale,
} from "@/lib/i18n";

type HomeViewProps = {
  locale: Locale;
};

export function HomeView({ locale }: HomeViewProps) {
  const dictionary = getDictionary(locale);
  const otherLocale = getOppositeLocale(locale);
  const featuredWork = getEntries("work", locale)
    .filter((entry) => entry.frontmatter.featured)
    .slice(0, 3);
  const workEntries = getEntries("work", locale);
  const funEntries = [
    ...getEntries("notes", locale),
    ...getEntries("art", locale),
    ...getEntries("lab", locale),
  ];

  return (
    <SiteShell
      activeSection="home"
      languageHref={localizedRoute(otherLocale)}
      locale={locale}
    >
      <HomeHeroMotion
        phrases={dictionary.home.rotatingPhrases}
        profile={{
          ...dictionary.home.profile,
          imageSrc: siteConfig.profileImage,
          socials: siteConfig.socials,
        }}
        title={dictionary.home.title}
      >
        <ContactStrip locale={locale} />
      </HomeHeroMotion>

      <MotionReveal className="section-block home-preview-section" delay={0.05}>
        <div className="section-heading">
          <div>
            <h2>{dictionary.home.otherRooms}</h2>
          </div>
        </div>

        <div className="home-preview-grid" id="fun-preview">
          <HomePreviewCard
            accent="warm"
            cta={dictionary.home.workPreview.cta}
            description={dictionary.home.workPreview.description}
            href={collectionPath(locale, "work")}
            label={dictionary.home.workPreview.label}
            meta={`${workEntries.length} ${dictionary.home.workPreview.meta}`}
            title={dictionary.home.workPreview.title}
          />
          <HomePreviewCard
            accent="cool"
            cta={dictionary.home.funPreview.cta}
            description={dictionary.home.funPreview.description}
            href={funPath(locale)}
            label={dictionary.home.funPreview.label}
            meta={`${funEntries.length} ${dictionary.home.funPreview.meta}`}
            title={dictionary.home.funPreview.title}
          />
        </div>
      </MotionReveal>

      <MotionReveal className="section-block" delay={0.08}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dictionary.nav.work}</p>
            <h2>{dictionary.home.featuredWork}</h2>
          </div>
          <Link className="text-link" href={collectionPath(locale, "work")}>
            {dictionary.home.viewAll}
          </Link>
        </div>
        <EntryList entries={featuredWork} locale={locale} />
      </MotionReveal>
    </SiteShell>
  );
}
