'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { SITE } from '@/lib/utils';

type Dict = { title: string; subtitle: string; button: string };

export default function CTASection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const phone = SITE.phones[0].replace(/\s/g, '');
  const whatsapp = SITE.whatsapp.replace(/[^\d]/g, '');

  return (
    <section className="pb-14 pt-4 md:pb-20 md:pt-8">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aqua-800 via-aqua-700 to-aqua-600 px-6 py-12 shadow-2xl shadow-aqua-700/30 md:px-12 md:py-16"
        >
          {/* Animated water bubbles bg */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <linearGradient id="ctaWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#B5E7FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0A2E57" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 300 Q 300 200 600 280 T 1200 260 L 1200 600 L 0 600 Z"
              fill="url(#ctaWave)"
            >
              <animate
                attributeName="d"
                values="M0 300 Q 300 200 600 280 T 1200 260 L 1200 600 L 0 600 Z;
                        M0 320 Q 300 260 600 300 T 1200 240 L 1200 600 L 0 600 Z;
                        M0 300 Q 300 200 600 280 T 1200 260 L 1200 600 L 0 600 Z"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            {[150, 300, 500, 800, 1000].map((x, i) => (
              <circle key={i} cx={x} cy={450 + i * 10} r={3 + i} fill="white" opacity="0.3">
                <animate
                  attributeName="cy"
                  from={450 + i * 10}
                  to={200}
                  dur={`${5 + i}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.3"
                  to="0"
                  dur={`${5 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white md:text-4xl">
              {dict.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-aqua-50/95 md:mt-4 md:text-lg">
              {dict.subtitle}
            </p>

            {/* Big call CTA */}
            <a
              href={`tel:${phone}`}
              className="mx-auto mt-8 inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-xl transition-all hover:scale-[1.02] md:gap-5 md:px-8 md:py-5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-aqua-700 text-white md:h-14 md:w-14">
                <Phone className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} fill="currentColor" />
              </span>
              <span className="text-left">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-aqua-700 md:text-xs">
                  {dict.button}
                </span>
                <span className="block font-display text-xl font-extrabold leading-none text-ink-900 md:text-3xl">
                  {SITE.phones[0]}
                </span>
              </span>
            </a>

            {/* WhatsApp */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
                WhatsApp
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                Send Message
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
