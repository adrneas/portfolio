"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { FunCategory } from "@/lib/i18n";

export type FunHubEntry = {
  cover: string;
  href: string;
  minimal: boolean;
  summary: string;
  tags: string[];
  title: string;
  type: string;
  year: number;
};

export type FunHubCategory = {
  description: string;
  entries: FunHubEntry[];
  label: string;
  slug: FunCategory;
  title: string;
};

type FunHubProps = {
  basePath: string;
  categories: FunHubCategory[];
  defaultCategory: FunCategory;
  emptyMessage: string;
  viewLabel: string;
};

function isFunCategory(value: string | null): value is FunCategory {
  return (
    value === "travel" ||
    value === "writing" ||
    value === "drawings" ||
    value === "dev"
  );
}

export function FunHub({
  basePath,
  categories,
  defaultCategory,
  emptyMessage,
  viewLabel,
}: FunHubProps) {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const requestedCategory = searchParams.get("category");
  const activeSlug = isFunCategory(requestedCategory)
    ? requestedCategory
    : defaultCategory;
  const activeCategory =
    categories.find((category) => category.slug === activeSlug) ?? categories[0];

  return (
    <div className="fun-hub">
      <div className="fun-tabs" aria-label="Fun categories">
        {categories.map((category) => {
          const isActive = category.slug === activeCategory.slug;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className="fun-tab"
              href={`${basePath}?category=${category.slug}`}
              key={category.slug}
            >
              <span>{category.label}</span>
              <strong>{category.entries.length}</strong>
              {isActive ? (
                <motion.span
                  className="fun-tab__indicator"
                  layoutId="fun-tab-indicator"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                />
              ) : null}
            </Link>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="fun-panel"
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          key={activeCategory.slug}
          transition={{ duration: 0.24 }}
        >
          <div className="fun-panel__heading">
            <p className="eyebrow">{activeCategory.label}</p>
            <h2>{activeCategory.title}</h2>
            <p>{activeCategory.description}</p>
          </div>

          {activeCategory.entries.length > 0 ? (
            <motion.div className="fun-card-grid" layout>
              {activeCategory.entries.map((entry) => (
                <motion.article
                  className={`fun-card${entry.minimal ? " fun-card--minimal" : ""}`}
                  key={entry.href}
                  layout
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                >
                  <Link href={entry.href}>
                    <span className="fun-card__cover" aria-hidden>
                      <Image
                        src={entry.cover}
                        alt=""
                        width={640}
                        height={440}
                        sizes="(max-width: 900px) 100vw, 33vw"
                      />
                    </span>
                    <span className="fun-card__body">
                      {!entry.minimal ? (
                        <span className="meta-line">
                          {entry.year} / {entry.type}
                        </span>
                      ) : null}
                      <h3>{entry.title}</h3>
                      {!entry.minimal && entry.summary ? (
                        <p>{entry.summary}</p>
                      ) : null}
                      {!entry.minimal ? (
                        <span className="fun-card__footer">
                          <span>{viewLabel}</span>
                          <span>{entry.tags.slice(0, 2).join(" / ")}</span>
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="fun-empty">
              <p>{emptyMessage}</p>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
