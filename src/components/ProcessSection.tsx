'use client';

import { motion } from 'motion/react';

type Step = { n: string; title: string; body: string };
type Dict = { eyebrow: string; title: string; steps: Step[] };

export default function ProcessSection({ dict }: { dict: Dict }) {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="display-lg mt-4 text-balance">{dict.title}</h2>
        </div>

        <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-ink-100 via-ink-200 to-ink-100 md:block" />

          {dict.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {/* Numbered node */}
              <div className="relative mb-8 flex h-[116px] items-end">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-ink-200 bg-white font-display text-2xl text-ink-900">
                  {step.n}
                  <span className="absolute inset-0 rounded-full border border-aqua-300/0 transition-all duration-500 group-hover:border-aqua-300" />
                </div>
                {i < dict.steps.length - 1 && (
                  <div className="absolute left-16 top-1/2 hidden h-px w-[calc(100%-64px)] bg-gradient-to-r from-ink-200 to-transparent md:block" />
                )}
              </div>

              <h3 className="font-display text-2xl leading-tight text-ink-900 md:text-[28px]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
