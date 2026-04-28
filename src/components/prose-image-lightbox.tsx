"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";

type Locale = "pt" | "en";

type LightboxImage = {
  alt: string;
  caption: string;
  src: string;
};

type GalleryState = {
  activeIndex: number;
  images: LightboxImage[];
};

type ProseImageLightboxProps = {
  locale: Locale;
  rootId: string;
};

const labels = {
  pt: {
    close: "Fechar imagem",
    dialog: "Visualização em tela cheia",
    image: "Abrir imagem em tela cheia",
    next: "Próxima imagem",
    previous: "Imagem anterior",
    resetZoom: "Redefinir zoom",
    zoomIn: "Aumentar zoom",
    zoomOut: "Diminuir zoom",
  },
  en: {
    close: "Close image",
    dialog: "Fullscreen image view",
    image: "Open image fullscreen",
    next: "Next image",
    previous: "Previous image",
    resetZoom: "Reset zoom",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
  },
} as const;

function normalizeImage(image: HTMLImageElement): LightboxImage {
  const caption =
    image.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ??
    "";

  return {
    alt: image.alt,
    caption,
    src: image.currentSrc || image.src,
  };
}

export function ProseImageLightbox({
  locale,
  rootId,
}: ProseImageLightboxProps) {
  const copy = labels[locale];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [zoom, setZoom] = useState(1);
  const imageCount = gallery?.images.length ?? 0;
  const activeImage = gallery ? gallery.images[gallery.activeIndex] : null;
  const hasMultipleImages = imageCount > 1;
  const imageCounter = gallery ? `${gallery.activeIndex + 1} / ${imageCount}` : "";

  useEffect(() => {
    const root = document.getElementById(rootId);

    if (!root) {
      return;
    }

    const openImage = (image: HTMLImageElement) => {
      const proseImages = Array.from(root.querySelectorAll("img"));
      const index = proseImages.indexOf(image);

      if (index >= 0) {
        setGallery({
          activeIndex: index,
          images: proseImages.map(normalizeImage),
        });
        setZoom(1);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof HTMLImageElement) {
        openImage(target);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLImageElement &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        openImage(target);
      }
    };

    const proseImages = Array.from(root.querySelectorAll("img"));

    proseImages.forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", copy.image);
    });

    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeyDown);

    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeyDown);
    };
  }, [copy.image, rootId]);

  useEffect(() => {
    if (!gallery) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGallery(null);
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setGallery((current) =>
          current
            ? {
                ...current,
                activeIndex:
                  (current.activeIndex - 1 + current.images.length) %
                  current.images.length,
              }
            : current,
        );
        setZoom(1);
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        setGallery((current) =>
          current
            ? {
                ...current,
                activeIndex: (current.activeIndex + 1) % current.images.length,
              }
            : current,
        );
        setZoom(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery, hasMultipleImages]);

  if (!activeImage) {
    return null;
  }

  const showPrevious = () => {
    setGallery((current) =>
      current
        ? {
            ...current,
            activeIndex:
              (current.activeIndex - 1 + current.images.length) %
              current.images.length,
          }
        : current,
    );
    setZoom(1);
  };

  const showNext = () => {
    setGallery((current) =>
      current
        ? {
            ...current,
            activeIndex: (current.activeIndex + 1) % current.images.length,
          }
        : current,
    );
    setZoom(1);
  };

  return (
    <div
      aria-label={copy.dialog}
      aria-modal="true"
      className="image-lightbox"
      role="dialog"
    >
      <div className="image-lightbox__topbar">
        <p>{imageCounter}</p>
        <div className="image-lightbox__controls">
          <button
            aria-label={copy.zoomOut}
            disabled={zoom <= 1}
            onClick={() => setZoom((current) => Math.max(1, current - 0.25))}
            type="button"
          >
            <Minus aria-hidden size={18} />
          </button>
          <button
            aria-label={copy.resetZoom}
            onClick={() => setZoom(1)}
            type="button"
          >
            <RotateCcw aria-hidden size={18} />
          </button>
          <button
            aria-label={copy.zoomIn}
            disabled={zoom >= 3}
            onClick={() => setZoom((current) => Math.min(3, current + 0.25))}
            type="button"
          >
            <Plus aria-hidden size={18} />
          </button>
          <button
            aria-label={copy.close}
            onClick={() => setGallery(null)}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden size={20} />
          </button>
        </div>
      </div>

      {hasMultipleImages ? (
        <button
          aria-label={copy.previous}
          className="image-lightbox__nav image-lightbox__nav--previous"
          onClick={showPrevious}
          type="button"
        >
          <ChevronLeft aria-hidden size={32} />
        </button>
      ) : null}

      <div
        className="image-lightbox__stage"
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            setGallery(null);
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={activeImage.alt}
          className={zoom > 1 ? "is-zoomed" : undefined}
          src={activeImage.src}
          style={{ "--image-zoom": zoom } as CSSProperties}
        />
      </div>

      {hasMultipleImages ? (
        <button
          aria-label={copy.next}
          className="image-lightbox__nav image-lightbox__nav--next"
          onClick={showNext}
          type="button"
        >
          <ChevronRight aria-hidden size={32} />
        </button>
      ) : null}

      {activeImage.caption ? (
        <p className="image-lightbox__caption">{activeImage.caption}</p>
      ) : null}
    </div>
  );
}
