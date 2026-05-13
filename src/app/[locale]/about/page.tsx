import Image from 'next/image';
import { getDictionary, type Locale } from '@/i18n/config';
import CTASection from '@/components/CTASection';
import { SITE } from '@/lib/utils';
import { Award, ShieldCheck, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.about.title,
    description: dict.about.intro.slice(0, 160),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { about } = dict;

  return (
    <>
      {/* Hero */}
      <section className="relative water-bg pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">{about.eyebrow}</div>
            <h1 className="display-xl mt-3 text-balance">{about.title}</h1>
            <p className="body-lg mt-6 max-w-2xl text-pretty">{about.intro}</p>
          </div>

          {/* Quick stats band */}
          <div className="mt-10 grid grid-cols-3 gap-3 md:mt-12 md:gap-5">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-aqua-100 md:p-6">
              <Award className="h-5 w-5 text-aqua-600" strokeWidth={2} />
              <div className="mt-3 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
                {SITE.yearsInService}
              </div>
              <div className="mt-1 text-xs text-ink-500 md:text-sm">Years of work</div>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-aqua-100 md:p-6">
              <ShieldCheck className="h-5 w-5 text-aqua-600" strokeWidth={2} />
              <div className="mt-3 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
                ISO
              </div>
              <div className="mt-1 text-xs text-ink-500 md:text-sm">9001:2015</div>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-aqua-100 md:p-6">
              <MapPin className="h-5 w-5 text-aqua-600" strokeWidth={2} />
              <div className="mt-3 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
                {SITE.serviceAreas.length}+
              </div>
              <div className="mt-1 text-xs text-ink-500 md:text-sm">Areas served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-5 md:grid-cols-2 md:gap-6">
          <div className="rounded-3xl bg-aqua-50 p-7 ring-1 ring-aqua-100 md:p-10">
            <div className="eyebrow">{about.missionTitle}</div>
            <p className="mt-4 font-display text-xl font-bold leading-snug text-ink-900 md:text-2xl">
              {about.missionBody}
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-aqua-700 via-aqua-800 to-aqua-900 p-7 text-white md:p-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aqua-200">
              {about.visionTitle}
            </div>
            <p className="mt-4 font-display text-xl font-bold leading-snug md:text-2xl">
              {about.visionBody}
            </p>
          </div>
        </div>
      </section>

      {/* Values - simpler cards */}
      <section className="relative water-bg-deep py-14 md:py-20">
        {/* Wave divider at top */}
        <div className="absolute inset-x-0 top-0">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="h-12 w-full md:h-16"
            aria-hidden
          >
            <path d="M0,0 L0,30 Q360,55 720,30 T1440,30 L1440,0 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="container-x relative">
          <div className="mb-10 max-w-xl">
            <h2 className="display-lg text-balance">{about.valuesTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {about.values.map((v: { title: string; body: string }, i: number) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 ring-1 ring-aqua-100 transition-all hover:shadow-md"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-700 text-white">
                  <span className="font-display text-base font-extrabold">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-ink-900 md:text-xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="rounded-2xl bg-aqua-50 p-7 ring-1 ring-aqua-100">
              <div className="font-display text-4xl font-extrabold text-aqua-800">ISO</div>
              <div className="mt-2 text-sm text-ink-600">9001:2015 · QMS230893</div>
            </div>
            <div className="rounded-2xl bg-aqua-50 p-7 ring-1 ring-aqua-100">
              <div className="font-display text-4xl font-extrabold text-aqua-800">GST</div>
              <div className="mt-2 break-all text-sm text-ink-600">{SITE.gstin}</div>
            </div>
            <div className="rounded-2xl bg-aqua-50 p-7 ring-1 ring-aqua-100">
              <div className="font-display text-4xl font-extrabold text-aqua-800">Pune</div>
              <div className="mt-2 text-sm text-ink-600">
                Pimpri-Chinchwad & wider Maharashtra
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
