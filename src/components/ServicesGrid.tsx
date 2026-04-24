'use client';

import Link from 'next/link';
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

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const content = servicesDict[service.slug];
            // Asymmetric pattern — first and fourth cards span 4 cols, others span 2
            const wide = i === 0 || i === 3;
            const span = wide ? 'md:col-span-4' : 'md:col-span-2';

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={span}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className={cn(
                    'group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:border-ink-900 hover:shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)] md:p-9',
                    wide ? 'min-h-[280px]' : 'min-h-[240px]'
                  )}
                >
                  {/* Background accent */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
                      service.accent
                    )}
                  />

                  {/* Number watermark */}
                  <span className="pointer-events-none absolute right-6 top-6 font-display text-5xl italic text-ink-100 transition-colors duration-500 group-hover:text-aqua-100">
                    {service.number}
                  </span>

                  <div className="relative">
                    <div
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm',
                        service.accent
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-ink-900 md:text-[26px]">
                      {content.name}
                    </h3>
                    {wide && (
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
                        {content.short}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-6 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                      {content.tagline}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-ink-400 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900"
                      strokeWidth={1.5}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900 link-underline"
          >
            {dict.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
