import { Suspense } from "react";
import { EntryList } from "@/components/entry-list";
import { FilterableEntryList } from "@/components/filterable-entry-list";
import { FilterBar } from "@/components/filter-bar";
import { SiteShell } from "@/components/site-shell";
import { getCollectionTags, getEntries } from "@/lib/content";
import {
  collectionPath,
  getDictionary,
  getOppositeLocale,
  type Collection,
  type Locale,
} from "@/lib/i18n";

type CollectionViewProps = {
  collection: Collection;
  locale: Locale;
};

export function CollectionView({
  collection,
  locale,
}: CollectionViewProps) {
  const dictionary = getDictionary(locale);
  const otherLocale = getOppositeLocale(locale);
  const copy = dictionary.collection[collection];
  const entries = getEntries(collection, locale).map(
    ({ frontmatter, href }) => ({
      frontmatter,
      href,
    }),
  );
  const filters = getCollectionTags(collection, locale);
  const basePath = collectionPath(locale, collection);
  const activeSection = collection === "work" ? "work" : "fun";

  return (
    <SiteShell
      activeSection={activeSection}
      languageHref={collectionPath(otherLocale, collection)}
      locale={locale}
    >
      <section className="page-title">
        <div>
          <p className="eyebrow">{copy.title}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
      </section>

      <Suspense
        fallback={
          <>
            <FilterBar basePath={basePath} filters={filters} locale={locale} />
            <EntryList entries={entries} locale={locale} />
          </>
        }
      >
        <FilterableEntryList
          basePath={basePath}
          entries={entries}
          filters={filters}
          locale={locale}
        />
      </Suspense>
    </SiteShell>
  );
}
