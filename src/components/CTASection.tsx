'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';

type Dict = { title: string; subtitle: string; button: string };

export default function CTASection({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="pb-24 md:pb-36">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aqua-800 via-aqua-700 to-aqua-600 px-8 py-20 md:px-16 md:py-28"
        >
          {/* Water wave background */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="ctaWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#B5E7FF" stopOpacity="0.25" />
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
              <circle
                key={i}
                cx={x}
                cy={450 + i * 10}
                r={3 + i}
                fill="white"
                opacity="0.3"
              >
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
            <h2 className="display-lg text-white text-balance">{dict.title}</h2>
            <p className="mt-6 text-lg text-aqua-50/90 text-pretty md:text-xl">
              {dict.subtitle}
            </p>
            <div className="mt-10 flex justify-center">
              <Link href={`/${locale}/contact`} className="btn-white group">
                {dict.button}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
