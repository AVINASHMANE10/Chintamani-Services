'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/lib/utils';

type Dict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewAll: string;
};

type ServicesMap = Record<
  string,
  { name: string; short: string; tagline: string; overview: string; features: string[] }
>;

export default function ServicesGrid({
  locale,
  dict,
  servicesDict,
}: {
  locale: Locale;
  dict: Dict;
  servicesDict: ServicesMap;
}) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        {/* Section header */}
        <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">{dict.eyebrow}</span>
            <h2 className="display-lg mt-4 text-balance">{dict.title}</h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="body-lg text-pretty">{dict.subtitle}</p>
          </div>
        </div>

        {/* Grid — asymmetric: first and fourth cards span 4 cols (wide), others span 2 (tall) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const content = servicesDict[service.slug];
            const wide = i === 0 || i === 3;
            const span = wide ? 'md:col-span-4' : 'md:col-span-2';

            // Stp/Fire and Cooling Tower have dark illustrations — use light text
            const darkIllustration = service.slug === 'stp-fire-tank' || service.slug === 'industrial-cooling-tower';

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={span}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className={cn(
                    'group relative block h-full overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500',
                    'hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_30px_80px_-20px_rgba(10,22,40,0.25)]'
                  )}
                >
                  {/* Illustration container — fills top 60-65% of card */}
                  <div
                    className={cn(
                      'relative overflow-hidden bg-gradient-to-br',
                      service.cardBg,
                      wide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    )}
                  >
                    {/* Subtle grain/noise overlay */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                      }}
                    />

                    {/* Number watermark — top right of illustration */}
                    <span
                      className={cn(
                        'absolute right-5 top-5 font-display text-6xl italic leading-none transition-all duration-700 md:text-7xl',
                        darkIllustration
                          ? 'text-white/20 group-hover:text-white/40'
                          : 'text-ink-900/10 group-hover:text-ink-900/25'
                      )}
                    >
                      {service.number}
                    </span>

                    {/* The illustration itself */}
                    <Image
                      src={service.image}
                      alt={content.name}
                      fill
                      sizes={wide ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                      className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      priority={i < 2}
                    />

                    {/* Bottom gradient for legibility */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent"
                    />
                  </div>

                  {/* Content block */}
                  <div className="relative p-7 md:p-9">
                    {/* Icon + tagline */}
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className={cn(
                          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                          service.accent
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400">
                        {content.tagline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl leading-[1.1] text-ink-900 md:text-[28px]">
                      {content.name}
                    </h3>

                    {/* Short description (only on wide cards to keep tall cards crisp) */}
                    {wide && (
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
                        {content.short}
                      </p>
                    )}

                    {/* Learn-more row */}
                    <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
                      <span className="text-xs font-medium text-ink-700">
                        Learn more
                      </span>
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-ink-50 transition-colors group-hover:bg-ink-900">
                        <ArrowUpRight
                          className="absolute inset-0 m-auto h-4 w-4 text-ink-900 transition-all duration-500 group-hover:-translate-y-8 group-hover:translate-x-8"
                          strokeWidth={1.75}
                        />
                        <ArrowUpRight
                          className="absolute inset-0 m-auto h-4 w-4 -translate-x-8 translate-y-8 text-white transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-14 flex justify-center">
          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900 link-underline"
          >
            {dict.viewAll}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
