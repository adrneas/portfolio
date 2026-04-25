import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

type FilterBarProps = {
  activeTag?: string;
  basePath: string;
  filters: string[];
  locale: Locale;
};

export function FilterBar({
  activeTag,
  basePath,
  filters,
  locale,
}: FilterBarProps) {
  const dictionary = getDictionary(locale);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="filter-bar" aria-label={dictionary.filters.label}>
      <span className="filter-label">{dictionary.filters.label}</span>
      <Link
        className="filter-link"
        href={basePath}
        aria-current={!activeTag ? "true" : undefined}
      >
        {dictionary.filters.all}
      </Link>
      {filters.map((filter) => (
        <Link
          aria-current={activeTag === filter ? "true" : undefined}
          className="filter-link"
          href={`${basePath}?tag=${encodeURIComponent(filter)}`}
          key={filter}
        >
          {filter}
        </Link>
      ))}
    </div>
  );
}
