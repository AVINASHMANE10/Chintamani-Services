'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Users, Camera, Clock } from 'lucide-react';
import { SITE } from '@/lib/utils';

type Dict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pointsTitle: string[];
  pointsBody: string[];
};

const icons = [ShieldCheck, Users, Camera, Clock];

export default function WhyChooseUs({ dict }: { dict: Dict }) {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      {/* Background water droplets */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[15%] h-24 w-24 rounded-full bg-aqua-100/60 blur-2xl float-slow" />
        <div className="absolute left-[8%] bottom-[15%] h-32 w-32 rounded-full bg-aqua-200/40 blur-2xl float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-x relative">
        <div className="mb-10 text-center md:mb-14">
          <div className="eyebrow">{dict.eyebrow}</div>
          <h2 className="display-lg mt-3 text-balance">{dict.title}</h2>
          <p className="body-lg mx-auto mt-4 max-w-2xl text-pretty">{dict.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {dict.pointsTitle.map((title, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-3xl bg-aqua-50/50 p-6 ring-1 ring-aqua-100 transition-all hover:bg-white hover:ring-aqua-300 hover:shadow-lg md:p-7"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-700 text-white shadow-md shadow-aqua-700/30 md:h-14 md:w-14">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold leading-tight text-ink-900 md:text-xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 md:text-base">
                  {dict.pointsBody[i]}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-500 md:mt-14 md:text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-500" />
            {SITE.iso}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-500" />
            GSTIN: {SITE.gstin}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-500" />
            Est. {SITE.foundedYear}
          </span>
        </div>
      </div>
    </section>
  );
}
