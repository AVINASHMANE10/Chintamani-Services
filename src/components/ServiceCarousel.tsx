"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/locales";
import { cn, SITE } from "@/lib/utils";

type CarouselDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewService: string;
  callNow: string;
  prev: string;
  next: string;
};

type ServicesMap = Record<
  string,
  {
    name: string;
    short: string;
    tagline: string;
    overview: string;
    features: string[];
  }
>;

const AUTOPLAY_MS = 5500;

export default function ServiceCarousel({
  locale,
  dict,
  servicesDict,
}: {
  locale: Locale;
  dict: CarouselDict;
  servicesDict: ServicesMap;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % services.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + services.length) % services.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const active = services[index];
  const content = servicesDict[active.slug];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">{dict.eyebrow}</span>
            <h2 className="display-lg mt-4 text-balance">{dict.title}</h2>
            <p className="body-lg mt-5 text-pretty">{dict.subtitle}</p>
          </div>

          {/* Carousel controls — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => {
                setPaused(true);
                goPrev();
              }}
              aria-label={dict.prev}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => {
                setPaused(true);
                goNext();
              }}
              aria-label={dict.next}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div
          className="relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-950 shadow-[0_40px_80px_-30px_rgba(10,22,40,0.35)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div className="relative aspect-[16/10] md:aspect-[16/8] lg:aspect-[21/9]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={content.name}
                  fill
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />
                {/* Dark overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/60 to-ink-950/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slide content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="w-full px-6 py-10 md:px-12 md:py-12 lg:px-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug + "-text"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="max-w-2xl text-white"
                  >
                    {/* Icon + number + tagline */}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg",
                        )}
                      >
                        <ActiveIcon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-aqua-200">
                        {active.number} · {content.tagline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display mt-6 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.01em]">
                      {content.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-100 md:text-base">
                      {content.short}
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/services/${active.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:bg-aqua-100"
                      >
                        {dict.viewService}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </Link>
                      <a
                        href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/20"
                      >
                        <Phone className="h-4 w-4" strokeWidth={1.75} />
                        {dict.callNow}
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile controls — bottom corners */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => {
                  setPaused(true);
                  goPrev();
                }}
                aria-label={dict.prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-all active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaused(true);
                  goNext();
                }}
                aria-label={dict.next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-all active:scale-95"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* Progress bar at bottom */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/10">
              <motion.div
                key={active.slug + "-bar"}
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{
                  duration: paused ? 0.3 : AUTOPLAY_MS / 1000,
                  ease: "linear",
                }}
                className="h-full bg-aqua-400"
              />
            </div>
          </div>
        </div>

        {/* Dot/tab indicators */}
        <div className="mt-6 grid grid-cols-4 gap-2 md:mt-8 md:gap-3">
          {services.map((s, i) => {
            const sContent = servicesDict[s.slug];
            const isActive = i === index;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => {
                  setPaused(true);
                  goTo(i);
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-white px-3 py-3 text-left transition-all duration-300 md:px-5 md:py-4",
                  isActive
                    ? "border-ink-900 shadow-md"
                    : "border-ink-100 hover:border-ink-300",
                )}
                aria-label={`${dict.viewService}: ${sContent.name}`}
              >
                {/* Active indicator bar */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 transition-all",
                    isActive ? "bg-aqua-500" : "bg-transparent",
                  )}
                />
                <div className="font-display text-xs text-aqua-700 md:text-sm">
                  {s.number}
                </div>
                <div className="mt-1 line-clamp-2 text-[11px] font-medium leading-tight text-ink-900 md:text-sm md:leading-snug">
                  {sContent.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
