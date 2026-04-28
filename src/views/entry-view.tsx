import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { ProseImageLightbox } from "@/components/prose-image-lightbox";
import { SiteShell } from "@/components/site-shell";
import { getEntry } from "@/lib/content";
import {
  collectionPath,
  funPath,
  getDictionary,
  getFunCategoryFromCollection,
  getOppositeLocale,
  localizedRoute,
  type Collection,
  type Locale,
} from "@/lib/i18n";

type EntryViewProps = {
  collection: Collection;
  locale: Locale;
  slug: string;
};

export function EntryView({ collection, locale, slug }: EntryViewProps) {
  const entry = getEntry(collection, locale, slug);

  if (!entry) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const otherLocale = getOppositeLocale(locale);
  const translatedEntry = getEntry(collection, otherLocale, slug);
  const languageHref = translatedEntry
    ? translatedEntry.href
    : localizedRoute(otherLocale);
  const funCategory = getFunCategoryFromCollection(collection);
  const parentHref = funCategory ? funPath(locale) : collectionPath(locale, collection);
  const activeSection = funCategory ? "fun" : "work";
  const isMinimal = entry.frontmatter.minimal;
  const proseId = `entry-prose-${locale}-${collection}-${slug}`;

  const caseMeta = [
    [dictionary.detail.role, entry.frontmatter.role],
    [dictionary.detail.discipline, entry.frontmatter.discipline?.join(", ")],
    [dictionary.detail.client, entry.frontmatter.client],
    [dictionary.detail.collaborators, entry.frontmatter.collaborators?.join(", ")],
    [dictionary.detail.outcome, entry.frontmatter.outcome],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <SiteShell
      activeSection={activeSection}
      languageHref={languageHref}
      locale={locale}
    >
      <article>
        <Link className="text-link" href={parentHref}>
          {dictionary.detail.back}
        </Link>

        <header
          className={`detail-hero${isMinimal ? " detail-hero--minimal" : ""}`}
        >
          {!isMinimal ? (
            <div>
              <p className="detail-kicker">
                {entry.frontmatter.year} / {entry.frontmatter.type}
              </p>
              <h1>{entry.frontmatter.title}</h1>
              {entry.frontmatter.summary ? (
                <p>{entry.frontmatter.summary}</p>
              ) : null}
              {entry.frontmatter.tags.length > 0 ? (
                <div className="entry-meta">
                  {entry.frontmatter.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {entry.frontmatter.externalUrl ? (
                <div className="detail-actions">
                  <a
                    className="button-link accent"
                    href={entry.frontmatter.externalUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden size={18} />
                    {dictionary.detail.externalProject}
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="detail-cover" aria-hidden>
            <Image
              src={entry.frontmatter.cover}
              alt=""
              width={isMinimal ? 1400 : 840}
              height={isMinimal ? 1400 : 560}
              sizes={isMinimal ? "100vw" : "(max-width: 900px) 100vw, 420px"}
              priority
            />
          </div>
        </header>

        {collection === "work" && caseMeta.length > 0 ? (
          <dl className="case-meta">
            {caseMeta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {!isMinimal && entry.body.trim() ? (
          <>
            <div className="prose" id={proseId}>
              <MDXRemote components={mdxComponents} source={entry.body} />
            </div>
            <ProseImageLightbox locale={locale} rootId={proseId} />
          </>
        ) : null}
      </article>
    </SiteShell>
  );
}
