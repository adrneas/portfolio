"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  descriptionLink?: {
    href: string;
    label: string;
  };
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
  const minimalEntries = useMemo(
    () => activeCategory.entries.filter((entry) => entry.minimal),
    [activeCategory.entries],
  );
  const [activeOverlayHref, setActiveOverlayHref] = useState<string | null>(null);
  const activeOverlayIndex = activeOverlayHref
    ? minimalEntries.findIndex((entry) => entry.href === activeOverlayHref)
    : -1;
  const activeOverlayEntry =
    activeOverlayIndex >= 0 ? minimalEntries[activeOverlayIndex] : null;

  function openOverlay(entry: FunHubEntry) {
    setActiveOverlayHref(entry.href);
  }

  function closeOverlay() {
    setActiveOverlayHref(null);
  }

  const showImage = useCallback((direction: -1 | 1) => {
    setActiveOverlayHref((currentHref) => {
      const currentIndex = minimalEntries.findIndex(
        (entry) => entry.href === currentHref,
      );

      if (currentIndex < 0 || minimalEntries.length === 0) {
        return currentHref;
      }

      const nextIndex =
        (currentIndex + direction + minimalEntries.length) %
        minimalEntries.length;

      return minimalEntries[nextIndex].href;
    });
  }, [minimalEntries]);

  useEffect(() => {
    if (!activeOverlayEntry) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeOverlay();
      }

      if (event.key === "ArrowLeft") {
        showImage(-1);
      }

      if (event.key === "ArrowRight") {
        showImage(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOverlayEntry, showImage]);

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
            <h2>{activeCategory.title}</h2>
            <p>
              {activeCategory.descriptionLink ? (
                <>
                  {
                    activeCategory.description.split(
                      activeCategory.descriptionLink.label,
                    )[0]
                  }
                  <a
                    href={activeCategory.descriptionLink.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {activeCategory.descriptionLink.label}
                  </a>
                  {
                    activeCategory.description.split(
                      activeCategory.descriptionLink.label,
                    )[1]
                  }
                </>
              ) : (
                activeCategory.description
              )}
            </p>
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
                  {entry.minimal ? (
                    <button
                      aria-label={entry.title}
                      className="fun-card__button"
                      onClick={() => openOverlay(entry)}
                      type="button"
                    >
                      <span className="fun-card__cover" aria-hidden>
                        <Image
                          src={entry.cover}
                          alt=""
                          width={720}
                          height={960}
                          sizes="(max-width: 900px) 100vw, 33vw"
                        />
                      </span>
                    </button>
                  ) : (
                    <Link href={entry.href} aria-label={entry.title}>
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
                        <span className="meta-line">
                          {entry.year} / {entry.type}
                        </span>
                        <h3>{entry.title}</h3>
                        {entry.summary ? <p>{entry.summary}</p> : null}
                        <span className="fun-card__footer">
                          <span>{viewLabel}</span>
                          <span>{entry.tags.slice(0, 2).join(" / ")}</span>
                        </span>
                      </span>
                    </Link>
                  )}
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

      <AnimatePresence>
        {activeOverlayEntry ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label={activeOverlayEntry.title}
            aria-modal="true"
            className="drawing-overlay"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeOverlay}
            role="dialog"
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <button
              aria-label="Imagem anterior"
              className="drawing-overlay__nav drawing-overlay__nav--previous"
              onClick={(event) => {
                event.stopPropagation();
                showImage(-1);
              }}
              type="button"
            >
              {"<"}
            </button>
            <motion.div
              animate={shouldReduceMotion ? undefined : { scale: 1 }}
              className="drawing-overlay__image"
              exit={shouldReduceMotion ? undefined : { scale: 0.985 }}
              initial={shouldReduceMotion ? undefined : { scale: 0.985 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={activeOverlayEntry.cover}
                alt={activeOverlayEntry.title}
                width={1400}
                height={1867}
                sizes="100vw"
                priority
              />
            </motion.div>
            <button
              aria-label="Próxima imagem"
              className="drawing-overlay__nav drawing-overlay__nav--next"
              onClick={(event) => {
                event.stopPropagation();
                showImage(1);
              }}
              type="button"
            >
              {">"}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
