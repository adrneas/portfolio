"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

type HomePreviewCardProps = {
  accent?: "warm" | "cool";
  cta: string;
  description: string;
  href: string;
  label: string;
  meta: string;
  title: string;
};

export function HomePreviewCard({
  accent = "warm",
  cta,
  description,
  href,
  label,
  meta,
  title,
}: HomePreviewCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="home-preview-card-shell"
      whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.22 }}
    >
      <Link className={`home-preview-card ${accent}`} href={href}>
        <span className="home-preview-card__top">
          <span className="meta-line">{label}</span>
          <span className="pill">{meta}</span>
        </span>
        <span className="home-preview-card__body">
          <h3>{title}</h3>
          <p>{description}</p>
        </span>
        <span className="home-preview-card__cta">{cta}</span>
      </Link>
    </motion.div>
  );
}
