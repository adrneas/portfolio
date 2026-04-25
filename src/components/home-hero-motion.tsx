"use client";

import { Camera, Link2, Newspaper } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type HomeHeroMotionProps = {
  children: ReactNode;
  phrases: readonly string[];
  profile: {
    description: string;
    imageAlt: string;
    imageSrc: string;
    socialLabel: string;
    socials: {
      instagram: string;
      linkedin: string;
      substack: string;
    };
  };
  title: string;
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function HomeHeroMotion({
  children,
  phrases,
  profile,
  title,
}: HomeHeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePhrase, setActivePhrase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || phrases.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActivePhrase((current) => (current + 1) % phrases.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [phrases.length, shouldReduceMotion]);

  return (
    <section className="home-hero" aria-labelledby="home-title">
      <motion.div
        animate="visible"
        className="home-hero__main"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={container}
      >
        <motion.div className="home-title-stack" variants={item}>
          <h1 id="home-title">
            {title}
            <span className="home-title-wave" aria-hidden="true">
              👋
            </span>
          </h1>
        </motion.div>
        <motion.div
          className="home-rotator"
          aria-label={phrases[activePhrase]}
          aria-live="polite"
          variants={item}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="home-rotator__phrase"
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -14, filter: "blur(4px)" }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, filter: "blur(4px)" }
              }
              key={phrases[activePhrase]}
              transition={{ duration: 0.32 }}
            >
              {phrases[activePhrase]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>

      <motion.aside
        animate="visible"
        className="home-hero__aside"
        initial={shouldReduceMotion ? false : "hidden"}
        transition={{ delay: 0.14 }}
        variants={container}
      >
        <motion.div className="home-profile-card" variants={item}>
          <div className="home-profile-card__photo">
            <Image
              src={profile.imageSrc}
              alt={profile.imageAlt}
              width={720}
              height={900}
              sizes="(max-width: 900px) 100vw, 360px"
              priority
            />
          </div>
          <div className="home-profile-card__content">
            <p>{profile.description}</p>
            <nav
              className="home-profile-card__links"
              aria-label={profile.socialLabel}
            >
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                <Link2 aria-hidden size={18} />
                LinkedIn
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer">
                <Camera aria-hidden size={18} />
                Instagram
              </a>
              <a href={profile.socials.substack} target="_blank" rel="noreferrer">
                <Newspaper aria-hidden size={18} />
                Substack
              </a>
            </nav>
          </div>
        </motion.div>
      </motion.aside>
    </section>
  );
}
