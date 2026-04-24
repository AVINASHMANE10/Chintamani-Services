'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Users, Leaf, FileCheck } from 'lucide-react';

type Dict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pointsTitle: string[];
  pointsBody: string[];
};

const icons = [ShieldCheck, Users, Leaf, FileCheck];

export default function WhyChooseUs({ dict }: { dict: Dict }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      {/* Atmospheric gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-aqua-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-aqua-400/5 blur-3xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(72,191,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <div className="container-x relative">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          {/* Left — heading sticks */}
          <div className="md:col-span-5 lg:sticky lg:top-28 lg:h-fit">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.22em] text-aqua-300">
              {dict.eyebrow}
            </span>
            <h2 className="display-lg mt-4 text-balance">{dict.title}</h2>
            <p className="mt-6 max-w-sm text-lg text-ink-200 text-pretty">{dict.subtitle}</p>

            {/* Decorative element */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-12 bg-aqua-400" />
              <span className="font-display text-2xl italic text-aqua-300">est. 2008</span>
            </div>
          </div>

          {/* Right — 4 cards stacked */}
          <div className="md:col-span-7">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {dict.pointsTitle.map((title, i) => {
                const Icon = icons[i];
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group flex gap-5 py-8 md:gap-8 md:py-10"
                  >
                    <div className="shrink-0">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-aqua-300 transition-colors group-hover:border-aqua-400/40 group-hover:bg-aqua-500/10">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-white md:text-[28px]">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-ink-300">
                        {dict.pointsBody[i]}
                      </p>
                    </div>
                    <span className="ml-auto hidden self-start pt-2 text-xs text-ink-400 md:block">
                      0{i + 1} / 0{dict.pointsTitle.length}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
