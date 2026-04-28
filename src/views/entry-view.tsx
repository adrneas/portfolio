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
  const coverId = `entry-cover-${locale}-${collection}-${slug}`;
  const proseId = `entry-prose-${locale}-${collection}-${slug}`;
  const coverAlt =
    locale === "pt"
      ? `Capa do projeto ${entry.frontmatter.title}`
      : `Project cover for ${entry.frontmatter.title}`;
  const coverCaption =
    locale === "pt" ? "Imagem de capa do projeto." : "Project cover image.";
  const lightboxRootIds = entry.body.trim() ? [coverId, proseId] : [coverId];

  const caseMeta = [
    [dictionary.detail.role, entry.frontmatter.role],
    [dictionary.detail.discipline, entry.frontmatter.discipline?.join(", ")],
    [dictionary.detail.client, entry.frontmatter.client],
    [dictionary.detail.collaborators, entry.frontmatter.collaborators?.join(", ")],
    [dictionary.detail.outcome, entry.frontmatter.outcome],
  ].filter((item): item is [string, string] => Boolean(item[1]));
  const caseMetaIllustrationSpan = 4 - (caseMeta.length % 4);
  const hasCaseMetaIllustration =
    collection === "work" &&
    caseMeta.length > 0 &&
    caseMetaIllustrationSpan > 0 &&
    caseMetaIllustrationSpan < 4;

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
          <div className="detail-cover" id={coverId}>
            <Image
              src={entry.frontmatter.cover}
              alt={coverAlt}
              data-lightbox-caption={coverCaption}
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
            {hasCaseMetaIllustration ? (
              <div
                aria-hidden="true"
                className={`case-meta__illustration case-meta__illustration--span-${caseMetaIllustrationSpan}`}
              >
                <svg viewBox="0 0 560 180" role="presentation">
                  <path
                    d="M48 128C112 66 173 146 236 86C300 25 354 102 420 66C469 39 507 55 534 74"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M69 50H202V150H69z"
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    d="M358 30H503V132H358z"
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="248" cy="94" r="50" fill="var(--accent)" />
                  <circle cx="424" cy="80" r="24" fill="var(--accent-strong)" />
                  <path
                    d="M100 80H170M100 106H150M393 62H468M393 89H448M393 116H434"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M251 60L286 94L251 128M227 94H286"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <circle cx="48" cy="128" r="10" fill="var(--blue)" />
                  <circle cx="534" cy="74" r="10" fill="var(--blue)" />
                </svg>
              </div>
            ) : null}
          </dl>
        ) : null}

        {!isMinimal && entry.body.trim() ? (
          <div className={`prose prose--${slug}`} id={proseId}>
            <MDXRemote components={mdxComponents} source={entry.body} />
          </div>
        ) : null}
        <ProseImageLightbox locale={locale} rootIds={lightboxRootIds} />
      </article>
    </SiteShell>
  );
}
