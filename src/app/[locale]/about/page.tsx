import { getDictionary, type Locale } from '@/i18n/config';
import CTASection from '@/components/CTASection';
import { SITE } from '@/lib/utils';
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
      <section className="relative overflow-hidden pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-radial from-aqua-100/60 to-transparent blur-3xl" />
        </div>
        <div className="container-x">
          <div className="max-w-4xl">
            <span className="eyebrow">{about.eyebrow}</span>
            <h1 className="display-xl mt-6 text-balance">{about.title}</h1>
            <p className="body-lg mt-8 max-w-2xl text-pretty">{about.intro}</p>
          </div>
        </div>
      </section>

      {/* Mission + Vision split */}
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2 md:gap-8">
          {[
            { title: about.missionTitle, body: about.missionBody, theme: 'light' as const },
            { title: about.visionTitle, body: about.visionBody, theme: 'dark' as const },
          ].map((card, i) => (
            <div
              key={i}
              className={
                card.theme === 'dark'
                  ? 'rounded-3xl bg-ink-950 p-10 text-white md:p-14'
                  : 'rounded-3xl border border-ink-100 bg-aqua-50/50 p-10 text-ink-900 md:p-14'
              }
            >
              <div
                className={
                  'mb-4 text-[11px] font-medium uppercase tracking-[0.22em] ' +
                  (card.theme === 'dark' ? 'text-aqua-300' : 'text-aqua-700')
                }
              >
                {card.title}
              </div>
              <h2
                className={
                  'font-display leading-[1.1] text-balance text-[clamp(2rem,3.5vw,3rem)] ' +
                  (card.theme === 'dark' ? 'text-white' : 'text-ink-900')
                }
              >
                {card.body}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <h2 className="display-lg text-balance">{about.valuesTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v: { title: string; body: string }, i: number) => (
              <div
                key={i}
                className="group rounded-2xl border border-ink-100 bg-white p-8 transition-colors hover:border-ink-900"
              >
                <div className="font-display text-3xl text-aqua-700">0{i + 1}</div>
                <h3 className="mt-4 font-display text-2xl text-ink-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials band */}
      <section className="bg-ink-50 py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="font-display text-5xl text-ink-900">ISO</div>
              <div className="mt-2 text-sm text-ink-500">9001:2015 · QMS230893</div>
            </div>
            <div>
              <div className="font-display text-5xl text-ink-900">GST</div>
              <div className="mt-2 text-sm text-ink-500 break-all">{SITE.gstin}</div>
            </div>
            <div>
              <div className="font-display text-5xl text-ink-900">Pune</div>
              <div className="mt-2 text-sm text-ink-500">
                Serving Pimpri-Chinchwad and wider Maharashtra
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
