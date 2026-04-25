import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getEntry } from "@/lib/content";
import {
  collectionPath,
  funPath,
  getDictionary,
  getOppositeLocale,
  localizedRoute,
  type Collection,
  type Locale,
} from "@/lib/i18n";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function localeCode(locale: Locale) {
  return locale === "pt" ? "pt_BR" : "en_US";
}

export function homeMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const path = localizedRoute(locale);

  return {
    title: dictionary.home.title,
    description: dictionary.home.intro,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "pt-BR": absoluteUrl("/"),
        en: absoluteUrl("/en"),
      },
    },
    openGraph: {
      title: dictionary.home.title,
      description: dictionary.home.intro,
      url: absoluteUrl(path),
      locale: localeCode(locale),
      type: "website",
    },
  };
}

export function funMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const path = funPath(locale);

  return {
    title: dictionary.fun.title,
    description: dictionary.fun.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "pt-BR": absoluteUrl(funPath("pt")),
        en: absoluteUrl(funPath("en")),
      },
    },
    openGraph: {
      title: dictionary.fun.title,
      description: dictionary.fun.description,
      url: absoluteUrl(path),
      locale: localeCode(locale),
      type: "website",
    },
  };
}

export function collectionMetadata(
  locale: Locale,
  collection: Collection,
): Metadata {
  const dictionary = getDictionary(locale);
  const copy = dictionary.collection[collection];
  const path = collectionPath(locale, collection);

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "pt-BR": absoluteUrl(collectionPath("pt", collection)),
        en: absoluteUrl(collectionPath("en", collection)),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(path),
      locale: localeCode(locale),
      type: "website",
    },
  };
}

export function aboutMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const path = localizedRoute(locale, "/about");

  return {
    title: dictionary.about.title,
    description: dictionary.about.intro,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "pt-BR": absoluteUrl("/about"),
        en: absoluteUrl("/en/about"),
      },
    },
  };
}

export function entryMetadata(
  locale: Locale,
  collection: Collection,
  slug: string,
): Metadata {
  const entry = getEntry(collection, locale, slug);

  if (!entry) {
    return {
      title: "Not found",
    };
  }

  const otherLocale = getOppositeLocale(locale);
  const alternateEntry = getEntry(collection, otherLocale, slug);

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    alternates: {
      canonical: absoluteUrl(entry.href),
      languages: {
        [locale === "pt" ? "pt-BR" : "en"]: absoluteUrl(entry.href),
        ...(alternateEntry
          ? {
              [otherLocale === "pt" ? "pt-BR" : "en"]: absoluteUrl(
                alternateEntry.href,
              ),
            }
          : {}),
      },
    },
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.summary,
      url: absoluteUrl(entry.href),
      locale: localeCode(locale),
      type: "article",
      images: [entry.frontmatter.cover],
    },
  };
}
