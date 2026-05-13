'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Shield, MapPin } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { SITE } from '@/lib/utils';

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
    <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24">
      {/* Atmospheric blue water background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-radial from-aqua-200/70 via-aqua-100/40 to-transparent blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-aqua-400/15 blur-3xl" />
        <div className="absolute left-10 top-80 h-56 w-56 rounded-full bg-aqua-600/10 blur-3xl" />
      </div>

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] dots opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-x relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-200 bg-white/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-aqua-800 backdrop-blur">
            <Shield className="h-3 w-3" strokeWidth={2.25} />
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
          {dict.title}{' '}
          <span className="italic text-aqua-700">{dict.titleAccent}</span>{' '}
          {dict.titleEnd}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="body-lg mx-auto mt-7 max-w-2xl text-center text-pretty"
        >
          {dict.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href={`/${locale}/contact`} className="btn-primary group">
            {dict.ctaPrimary}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
          <a
            href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}
            className="btn-ghost"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {SITE.phones[0]}
          </a>
        </motion.div>

        {/* Hero photo strip — real photos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-6xl md:mt-20"
        >
          <HeroPhotoStrip />
        </motion.div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-4 border-t border-ink-100 pt-10 md:mt-20"
        >
          {[
            [dict.stat1Value, dict.stat1Label],
            [dict.stat2Value, dict.stat2Label],
            [dict.stat3Value, dict.stat3Label],
          ].map(([value, label], i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl leading-none text-ink-900 md:text-5xl">
                {value}
              </div>
              <div className="mt-2 text-[11px] text-ink-500 md:text-sm">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex justify-center pb-6"
        >
          <a
            href={SITE.maps.listing}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-ink-500 hover:text-ink-900"
          >
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>Nakhate Vasti, Rahatani, Pimpri-Chinchwad · Open all 7 days</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Three real photos in an offset arrangement
function HeroPhotoStrip() {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-4">
      {/* Left tall — STP workers */}
      <div className="col-span-5 md:col-span-4">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink-100 shadow-lg md:rounded-3xl">
          <Image
            src="/images/services/stp-workers-1.jpg"
            alt="Shree Chintamani Services team cleaning an STP tank in Pune"
            fill
            sizes="(min-width: 768px) 33vw, 42vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-aqua-300 md:text-xs">
              STP CLEANING
            </div>
          </div>
        </div>
      </div>

      {/* Center — big hero, cooling tower */}
      <div className="col-span-7 md:col-span-5">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink-100 shadow-xl md:rounded-3xl">
          <Image
            src="/images/services/cooling-tower-1.jpg"
            alt="High-pressure cooling tower cleaning by Shree Chintamani Services"
            fill
            sizes="(min-width: 768px) 42vw, 58vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-aqua-300 md:text-xs">
              COOLING TOWER CLEANING
            </div>
            <div className="mt-1 font-display text-lg leading-tight text-white md:text-2xl">
              High-pressure. Properly done.
            </div>
          </div>
        </div>
      </div>

      {/* Right — STP truck (hidden on mobile to keep it clean) */}
      <div className="hidden md:col-span-3 md:block">
        <div className="grid h-full grid-rows-2 gap-4">
          <div className="relative overflow-hidden rounded-3xl border border-ink-100 shadow-lg">
            <Image
              src="/images/services/stp-truck.jpg"
              alt="Suction-cum-jetting truck used by Shree Chintamani Services"
              fill
              sizes="25vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-aqua-50 to-white shadow-lg">
            <div className="flex h-full flex-col justify-between p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-aqua-700">
                Available
              </div>
              <div>
                <div className="font-display text-2xl leading-none text-ink-900">
                  9 AM
                  <br />– 9 PM
                </div>
                <div className="mt-2 text-xs text-ink-500">
                  All 7 days · Pune
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
