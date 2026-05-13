'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/locales';
import { cn, SITE } from '@/lib/utils';

type CarouselDict = {
  badge: string;
  callNow: string;
  whatsapp: string;
  viewService: string;
  hoursShort: string;
};

type ServicesMap = Record<
  string,
  { name: string; short: string }
>;

const AUTOPLAY_MS = 5500;

export default function HeroCarousel({
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

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const active = services[index];
  const content = servicesDict[active.slug];
  const ActiveIcon = active.icon;
  const phone = SITE.phones[0].replace(/\s/g, '');
  const whatsapp = SITE.whatsapp.replace(/[^\d]/g, '');

  return (
    <section
      className="relative overflow-hidden water-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      {/* Floating water droplets in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[15%] h-3 w-3 rounded-full bg-aqua-300/40 float-slow" />
        <div className="absolute right-[12%] top-[22%] h-4 w-4 rounded-full bg-aqua-400/40 float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute left-[15%] bottom-[25%] h-2 w-2 rounded-full bg-aqua-500/50 float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute right-[8%] bottom-[18%] h-3 w-3 rounded-full bg-aqua-300/40 float-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute left-[45%] top-[8%] h-2 w-2 rounded-full bg-aqua-400/50 float-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container-x relative pt-6 pb-12 md:pt-10 md:pb-20">
        {/* Top badge row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-aqua-800 ring-1 ring-aqua-200 backdrop-blur md:px-4 md:text-xs">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
            {dict.badge}
          </div>
          <a
            href={`tel:${phone}`}
            className="hidden items-center gap-2 text-sm font-semibold text-aqua-800 hover:text-aqua-900 md:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
            {SITE.phones[0]}
          </a>
        </div>

        {/* Carousel main */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aqua-900 via-aqua-800 to-ink-900 shadow-2xl shadow-aqua-900/30 md:rounded-[2rem]">
          {/* Slide */}
          <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[16/8]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-aqua-900/95 via-aqua-900/60 to-aqua-900/20 md:bg-gradient-to-r md:from-aqua-900/95 md:via-aqua-900/70 md:to-aqua-900/20" />

                {/* Water wave SVG overlay at bottom for theme */}
                <svg
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full"
                  viewBox="0 0 1440 80"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0,40 Q360,0 720,40 T1440,40 L1440,80 L0,80 Z"
                    fill="rgba(255,255,255,0.08)"
                  />
                  <path
                    d="M0,55 Q360,15 720,55 T1440,55 L1440,80 L0,80 Z"
                    fill="rgba(255,255,255,0.05)"
                  />
                </svg>
              </motion.div>
            </AnimatePresence>

            {/* Slide content */}
            <div className="absolute inset-0 z-10 flex items-end md:items-center">
              <div className="w-full px-5 py-7 md:px-10 md:py-10 lg:px-16 lg:py-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug + '-text'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl text-white"
                  >
                    {/* Icon + service number */}
                    <div className="mb-4 inline-flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-aqua-200 ring-1 ring-white/20 backdrop-blur md:h-12 md:w-12">
                        <ActiveIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-aqua-200 md:text-xs">
                        {active.number} / 0{services.length}
                      </span>
                    </div>

                    {/* Title - bold sans, no italics */}
                    <h1 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
                      {content.name}
                    </h1>

                    {/* Short description */}
                    <p className="mt-4 max-w-xl text-base text-white/85 md:mt-5 md:text-lg">
                      {content.short}
                    </p>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-wrap gap-2.5 md:mt-8">
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-aqua-900 transition-all hover:scale-[1.02] hover:bg-aqua-50 md:px-6 md:py-3.5 md:text-base"
                      >
                        <Phone className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
                        {dict.callNow}
                      </a>
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-emerald-600 md:px-6 md:py-3.5 md:text-base"
                      >
                        <MessageCircle className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
                        {dict.whatsapp}
                      </a>
                      <Link
                        href={`/${locale}/services/${active.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 md:px-6 md:py-3.5 md:text-base"
                      >
                        {dict.viewService}
                      </Link>
                    </div>

                    {/* Hours mini-info */}
                    <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/70 md:text-sm">
                      <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                      {dict.hoursShort}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Side arrows - desktop only */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 lg:flex"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 lg:flex"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {/* Progress bar */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/10">
              <motion.div
                key={active.slug + '-bar'}
                initial={{ width: '0%' }}
                animate={{ width: paused ? '0%' : '100%' }}
                transition={{
                  duration: paused ? 0.3 : AUTOPLAY_MS / 1000,
                  ease: 'linear',
                }}
                className="h-full bg-aqua-300"
              />
            </div>
          </div>
        </div>

        {/* Slide indicators / dots */}
        <div className="mt-6 flex items-center justify-center gap-3 md:mt-8">
          {services.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative h-10 px-1"
              >
                <div
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-500',
                    isActive
                      ? 'w-12 bg-aqua-700'
                      : 'w-2.5 bg-aqua-200 group-hover:bg-aqua-300'
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Water wave divider at bottom */}
      <svg
        className="block w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        height="80"
        aria-hidden
      >
        <path
          d="M0,40 Q360,0 720,40 T1440,40 L1440,80 L0,80 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}
