'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Locale } from '@/i18n/locales';

type HeroDict = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
};

export default function Hero({ locale, dict }: { locale: Locale; dict: HeroDict }) {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-28">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-radial from-aqua-200/60 via-aqua-100/30 to-transparent blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-aqua-400/10 blur-3xl" />
        <div className="absolute left-10 top-60 h-48 w-48 rounded-full bg-ink-900/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] dots opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-x relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-600 backdrop-blur">
            <Sparkles className="h-3 w-3 text-aqua-600" strokeWidth={2.25} />
            {dict.eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl mx-auto max-w-5xl text-center text-balance text-ink-900"
        >
          {dict.title}
          <br />
          <span className="italic text-aqua-700">{dict.titleAccent}</span>
          <br />
          {dict.titleEnd}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="body-lg mx-auto mt-8 max-w-2xl text-center text-pretty"
        >
          {dict.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href={`/${locale}/contact`} className="btn-primary group">
            {dict.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
          <Link href={`/${locale}/services`} className="btn-ghost">
            {dict.ctaSecondary}
          </Link>
        </motion.div>

        {/* Hero visual — SVG illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <HeroVisual />
        </motion.div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 border-t border-ink-100 pt-10 md:mt-24"
        >
          {[
            [dict.stat1Value, dict.stat1Label],
            [dict.stat2Value, dict.stat2Label],
            [dict.stat3Value, dict.stat3Label],
          ].map(([value, label], i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl leading-none text-ink-900 md:text-5xl">
                {value}
              </div>
              <div className="mt-2 text-xs text-ink-500 md:text-sm">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-ink-900 via-ink-800 to-aqua-900 shadow-[0_40px_80px_-20px_rgba(10,22,40,0.4)]">
      {/* SVG water scene */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#48BFFF" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#48BFFF" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#48BFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#48BFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Ambient glow */}
        <rect width="1200" height="675" fill="url(#glow)" />

        {/* Concentric ripple rings */}
        {[120, 200, 290, 400].map((r, i) => (
          <circle
            key={r}
            cx="600"
            cy="340"
            r={r}
            fill="none"
            stroke="#48BFFF"
            strokeOpacity={0.18 - i * 0.04}
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              from={r}
              to={r + 40}
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              from={0.18 - i * 0.04}
              to="0"
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Central water droplet */}
        <g transform="translate(600 340)">
          <path
            d="M0 -90 C0 -90, -60 -30, -60 20 C-60 53.14, -33.14 80, 0 80 C33.14 80, 60 53.14, 60 20 C60 -30, 0 -90, 0 -90 Z"
            fill="url(#water)"
            stroke="#B5E7FF"
            strokeWidth="2"
            strokeOpacity="0.7"
          />
          <circle cx="-20" cy="0" r="3" fill="#FFFFFF" opacity="0.8" />
          <path
            d="M-25 -10 C-20 -20, -8 -25, 0 -25"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Bubbles */}
        {[
          { x: 200, y: 500, r: 8, d: 4 },
          { x: 320, y: 580, r: 5, d: 5 },
          { x: 900, y: 520, r: 10, d: 4.5 },
          { x: 1050, y: 600, r: 6, d: 5.5 },
          { x: 150, y: 620, r: 4, d: 6 },
        ].map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#48BFFF" opacity="0.35">
            <animate attributeName="cy" from={b.y} to={b.y - 100} dur={`${b.d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.35" to="0" dur={`${b.d}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Wave at bottom */}
        <path
          d="M0 550 Q 300 520 600 550 T 1200 550 L 1200 675 L 0 675 Z"
          fill="#0D4987"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            values="M0 550 Q 300 520 600 550 T 1200 550 L 1200 675 L 0 675 Z;
                    M0 550 Q 300 580 600 550 T 1200 550 L 1200 675 L 0 675 Z;
                    M0 550 Q 300 520 600 550 T 1200 550 L 1200 675 L 0 675 Z"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Bottom label overlay */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-ink-950/80 to-transparent p-8 md:p-10">
        <div className="font-display text-3xl italic text-white md:text-4xl">
          Precision. Hygiene. Trust.
        </div>
        <div className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur md:block">
          Since 2008
        </div>
      </div>
    </div>
  );
}
