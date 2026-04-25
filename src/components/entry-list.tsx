import Image from "next/image";
import Link from "next/link";
import type { ContentEntry } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export type EntryListItem = Pick<ContentEntry, "frontmatter" | "href">;

type EntryListProps = {
  entries: EntryListItem[];
  locale: Locale;
};

function getEntryMeta(entry: EntryListItem) {
  const discipline = entry.frontmatter.discipline ?? [];

  return [
    entry.frontmatter.year.toString(),
    entry.frontmatter.type,
    ...discipline.slice(0, 2),
  ].filter(Boolean);
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <div className="entry-list">
      {entries.map((entry, index) => {
        const meta = getEntryMeta(entry);
        const isMinimal = entry.frontmatter.minimal;

        return (
          <Link
            className={`entry-row${isMinimal ? " entry-row--minimal" : ""}`}
            href={entry.href}
            key={entry.href}
          >
            <span className="entry-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="entry-body">
              {!isMinimal && meta.length > 0 ? (
                <span className="meta-line">{meta.join(" / ")}</span>
              ) : null}
              <h3>{entry.frontmatter.title}</h3>
              {!isMinimal && entry.frontmatter.summary ? (
                <p>{entry.frontmatter.summary}</p>
              ) : null}
              {!isMinimal && entry.frontmatter.tags.length > 0 ? (
                <span className="entry-meta">
                  {entry.frontmatter.tags.slice(0, 4).map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              ) : null}
            </span>
            <span className="entry-cover" aria-hidden>
              <Image
                src={entry.frontmatter.cover}
                alt=""
                width={620}
                height={420}
                sizes="(max-width: 900px) 100vw, 310px"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
