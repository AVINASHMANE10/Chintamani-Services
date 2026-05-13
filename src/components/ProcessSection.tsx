'use client';

import { motion } from 'motion/react';

type Step = { n: string; title: string; body: string };
type Dict = { eyebrow: string; title: string; subtitle?: string; steps: Step[] };

export default function ProcessSection({ dict }: { dict: Dict }) {
  return (
    <section className="relative water-bg-deep py-14 md:py-20">
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
          {dict.subtitle && (
            <p className="body-lg mx-auto mt-4 max-w-2xl text-pretty">
              {dict.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {dict.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl bg-white p-6 ring-1 ring-aqua-100 transition-all hover:shadow-lg md:p-7"
            >
              {/* Droplet-shaped number */}
              <div className="relative">
                <svg
                  viewBox="0 0 80 100"
                  className="absolute -top-2 -left-2 h-16 w-12 md:h-20 md:w-16"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id={`drop-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#48BFFF" />
                      <stop offset="100%" stopColor="#0066D3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M40 5 C 60 35 75 55 75 70 A 35 35 0 1 1 5 70 C 5 55 20 35 40 5 Z"
                    fill={`url(#drop-grad-${i})`}
                  />
                </svg>
                <div className="relative pl-12 pt-3 md:pl-16 md:pt-4">
                  <span className="font-display text-lg font-extrabold text-white drop-shadow-md md:text-xl">
                    {step.n}
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-display text-lg font-extrabold leading-tight text-ink-900 md:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
