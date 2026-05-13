'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/locales';
import { SITE } from '@/lib/utils';

type Dict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewService: string;
};

type ServicesMap = Record<
  string,
  { name: string; short: string }
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
  const phone = SITE.phones[0].replace(/\s/g, '');

  return (
    <section className="relative water-bg py-14 md:py-20">
      {/* Wave divider at top */}
      <div className="absolute inset-x-0 top-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="h-12 w-full md:h-16"
          aria-hidden
        >
          <path
            d="M0,0 L0,30 Q360,55 720,30 T1440,30 L1440,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="container-x relative">
        <div className="mb-10 text-center md:mb-14">
          <div className="eyebrow">{dict.eyebrow}</div>
          <h2 className="display-lg mt-3 text-balance">{dict.title}</h2>
          <p className="body-lg mx-auto mt-4 max-w-2xl text-pretty">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map((service, i) => {
            const content = servicesDict[service.slug];
            const Icon = service.icon;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white ring-1 ring-aqua-100 transition-all duration-500 hover:ring-aqua-300 hover:shadow-xl hover:shadow-aqua-900/10">
                  {/* Image / illustration */}
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-aqua-50"
                  >
                    <Image
                      src={service.image}
                      alt={content.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      priority={i < 2}
                    />
                    {/* Subtle bottom gradient for legibility */}
                    {!service.illustrated && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-aqua-900/40 to-transparent" />
                    )}

                    {/* Number badge */}
                    <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-extrabold text-aqua-800 shadow-md md:h-10 md:w-10 md:text-sm">
                      {service.number}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-5 md:p-7">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-100 text-aqua-700 md:h-12 md:w-12">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-extrabold leading-tight text-ink-900 md:text-xl">
                          {content.name}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">
                      {content.short}
                    </p>

                    {/* CTAs */}
                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-aqua-700 hover:text-aqua-900"
                      >
                        {dict.viewService}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </Link>
                      <span className="text-ink-200">·</span>
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <Phone className="h-3.5 w-3.5" strokeWidth={2.5} fill="currentColor" />
                        {SITE.phones[0]}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
