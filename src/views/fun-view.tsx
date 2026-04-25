import { Suspense } from "react";
import { FunHub, type FunHubCategory } from "@/components/fun-hub";
import { SiteShell } from "@/components/site-shell";
import { getEntries } from "@/lib/content";
import {
  funCategorySlugs,
  funPath,
  getCollectionFromFunCategory,
  getDictionary,
  getOppositeLocale,
  type FunCategory,
  type Locale,
} from "@/lib/i18n";

type FunViewProps = {
  locale: Locale;
};

function getDefaultCategory(categories: FunHubCategory[]): FunCategory {
  return (
    categories.find((category) => category.entries.length > 0)?.slug ??
    categories[0].slug
  );
}

export function FunView({ locale }: FunViewProps) {
  const dictionary = getDictionary(locale);
  const otherLocale = getOppositeLocale(locale);
  const categories: FunHubCategory[] = funCategorySlugs.map((category) => {
    const collection = getCollectionFromFunCategory(category);
    const copy = dictionary.fun.categories[category];
    const entries = getEntries(collection, locale).map((entry) => ({
      cover: entry.frontmatter.cover,
      href: entry.href,
      minimal: entry.frontmatter.minimal,
      summary: entry.frontmatter.summary,
      tags: entry.frontmatter.tags,
      title: entry.frontmatter.title,
      type: entry.frontmatter.type,
      year: entry.frontmatter.year,
    }));

    return {
      description: copy.description,
      descriptionLink:
        locale === "pt" && category === "drawings"
          ? {
              href: "https://www.instagram.com/adrneas/reels/",
              label: "instagram",
            }
          : undefined,
      entries,
      label: copy.label,
      slug: category,
      title: copy.title,
    };
  });

  return (
    <SiteShell
      activeSection="fun"
      languageHref={funPath(otherLocale)}
      locale={locale}
    >
      <section className="page-title fun-title">
        <div>
          {dictionary.fun.eyebrow ? (
            <p className="eyebrow">{dictionary.fun.eyebrow}</p>
          ) : null}
          <h1>{dictionary.fun.title}</h1>
          <p>{dictionary.fun.description}</p>
        </div>
      </section>

      <Suspense>
        <FunHub
          basePath={funPath(locale)}
          categories={categories}
          defaultCategory={getDefaultCategory(categories)}
          emptyMessage={dictionary.fun.empty}
          viewLabel={dictionary.fun.view}
        />
      </Suspense>
    </SiteShell>
  );
}
