import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import {
  collectionPath,
  collections,
  funEntryPath,
  funCategorySlugs,
  getCollectionFromFunCategory,
  getFunCategoryFromCollection,
  type Collection,
  type FunCategory,
  type Locale,
} from "@/lib/i18n";

export type EntryFrontmatter = {
  title: string;
  slug: string;
  locale: Locale;
  year: number;
  type: string;
  summary: string;
  cover: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  minimal: boolean;
  role?: string;
  discipline?: string[];
  client?: string;
  collaborators?: string[];
  outcome?: string;
  location?: string;
  externalUrl?: string;
};

export type ContentEntry = {
  collection: Collection;
  locale: Locale;
  slug: string;
  body: string;
  frontmatter: EntryFrontmatter;
  href: string;
};

const contentRoot = path.join(process.cwd(), "content");

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readEntryFile(
  collection: Collection,
  locale: Locale,
  fileName: string,
): ContentEntry {
  const filePath = path.join(contentRoot, collection, locale, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const fileSlug = fileName.replace(/\.mdx$/, "");
  const slug = toString(data.slug, fileSlug);

  const frontmatter: EntryFrontmatter = {
    title: toString(data.title, slug),
    slug,
    locale,
    year:
      typeof data.year === "number"
        ? data.year
        : Number.parseInt(String(data.year), 10) || new Date().getFullYear(),
    type: toString(data.type, collection),
    summary: toString(data.summary, ""),
    cover: toString(data.cover, "/covers/default.svg"),
    tags: toStringArray(data.tags),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    minimal: Boolean(data.minimal),
    role: toString(data.role, ""),
    discipline: toStringArray(data.discipline),
    client: toString(data.client, ""),
    collaborators: toStringArray(data.collaborators),
    outcome: toString(data.outcome, ""),
    location: toString(data.location, ""),
    externalUrl: toString(data.externalUrl, ""),
  };

  return {
    collection,
    locale,
    slug,
    body: content,
    frontmatter,
    href: entryPath(locale, collection, slug),
  };
}

function getCollectionDirectory(collection: Collection, locale: Locale) {
  return path.join(contentRoot, collection, locale);
}

export function entryPath(
  locale: Locale,
  collection: Collection,
  slug: string,
) {
  const funCategory = getFunCategoryFromCollection(collection);

  if (funCategory) {
    return funEntryPath(locale, funCategory, slug);
  }

  return `${collectionPath(locale, collection)}/${slug}`;
}

export const getEntries = cache(
  (collection: Collection, locale: Locale): ContentEntry[] => {
    const directory = getCollectionDirectory(collection, locale);

    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs
      .readdirSync(directory)
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => readEntryFile(collection, locale, fileName))
      .filter((entry) => !entry.frontmatter.draft)
      .sort((a, b) => {
        if (a.frontmatter.featured !== b.frontmatter.featured) {
          return Number(b.frontmatter.featured) - Number(a.frontmatter.featured);
        }

        if (a.frontmatter.year !== b.frontmatter.year) {
          return b.frontmatter.year - a.frontmatter.year;
        }

        return a.frontmatter.title.localeCompare(b.frontmatter.title);
      });
  },
);

export function getEntry(
  collection: Collection,
  locale: Locale,
  slug: string,
) {
  return getEntries(collection, locale).find((entry) => entry.slug === slug);
}

export function getAllEntries(locale: Locale) {
  return collections.flatMap((collection) => getEntries(collection, locale));
}

export function getEntryStaticParams(collection: Collection, locale: Locale) {
  return getEntries(collection, locale).map((entry) => ({ slug: entry.slug }));
}

export function getFunEntryStaticParams(locale: Locale) {
  return funCategorySlugs.flatMap((category) => {
    const collection = getCollectionFromFunCategory(category);

    return getEntries(collection, locale).map((entry) => ({
      category,
      slug: entry.slug,
    }));
  });
}

export function getFunEntry(
  category: FunCategory,
  locale: Locale,
  slug: string,
) {
  return getEntry(getCollectionFromFunCategory(category), locale, slug);
}

export function getCollectionTags(collection: Collection, locale: Locale) {
  const values = new Set<string>();

  for (const entry of getEntries(collection, locale)) {
    for (const tag of entry.frontmatter.tags) {
      values.add(tag);
    }

    if (collection === "work") {
      for (const discipline of entry.frontmatter.discipline ?? []) {
        values.add(discipline);
      }
    }
  }

  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

export function entryMatchesTag(entry: ContentEntry, selectedTag?: string) {
  if (!selectedTag) {
    return true;
  }

  const normalized = selectedTag.toLowerCase();
  const values = [
    ...entry.frontmatter.tags,
    ...(entry.frontmatter.discipline ?? []),
  ].map((value) => value.toLowerCase());

  return values.includes(normalized);
}
