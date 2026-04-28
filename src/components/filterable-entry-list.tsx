"use client";

import { useSearchParams } from "next/navigation";
import { EntryList, type EntryListItem } from "@/components/entry-list";
import { FilterBar } from "@/components/filter-bar";
import type { Locale } from "@/lib/i18n";

type FilterableEntryListProps = {
  basePath: string;
  entries: EntryListItem[];
  filters: string[];
  locale: Locale;
};

function matchesActiveTag(entry: EntryListItem, activeTag?: string) {
  if (!activeTag) {
    return true;
  }

  const normalized = activeTag.toLowerCase();
  const values = entry.frontmatter.tags.map((value) => value.toLowerCase());

  return values.includes(normalized);
}

export function FilterableEntryList({
  basePath,
  entries,
  filters,
  locale,
}: FilterableEntryListProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") ?? undefined;
  const filteredEntries = entries.filter((entry) =>
    matchesActiveTag(entry, activeTag),
  );

  return (
    <>
      <FilterBar
        activeTag={activeTag}
        basePath={basePath}
        filters={filters}
        locale={locale}
      />
      <EntryList entries={filteredEntries} locale={locale} />
    </>
  );
}
