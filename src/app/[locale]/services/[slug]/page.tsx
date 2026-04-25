import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { services, getService } from '@/data/services';
import CTASection from '@/components/CTASection';
import { cn, SITE } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'hi', 'mr'];
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const content = (dict.services as any)[slug];
  if (!content) return {};
  return {
    title: content.name,
    description: content.short,
    openGraph: {
      title: content.name,
      description: content.short,
      images: [`/images/services/${slug}.svg`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const dict = await getDictionary(locale as Locale);
  const content = (dict.services as any)[slug];
  if (!content) notFound();

  // notFound() throws, so past this point service is defined. TS doesn't infer this.
  const s = service!;
  const Icon = s.icon;
  const darkIllustration =
    s.slug === 'stp-fire-tank' || s.slug === 'industrial-cooling-tower';

  // Related services — next 3 in the list, wrapping around
  const idx = services.findIndex((r) => r.slug === slug);
  const related = [...services.slice(idx + 1), ...services.slice(0, idx)].slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pb-12 pt-10 md:pb-20 md:pt-16">
        <div className="container-x">
          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-xs text-ink-500">
            <Link href={`/${locale}`} className="hover:text-ink-900">
              Home
            </Link>
            <span className="text-ink-300">/</span>
            <Link href={`/${locale}/services`} className="hover:text-ink-900">
              Services
            </Link>
            <span className="text-ink-300">/</span>
            <span className="text-ink-900">{content.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left — text */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                      s.accent
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-500">
                    {s.number} · {content.tagline}
                  </span>
                </div>

                <h1 className="display-lg mt-8 text-balance">{content.name}</h1>
                <p className="body-lg mt-8 max-w-xl text-pretty">{content.overview}</p>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary group">
                  {dict.cta.button}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`} className="btn-ghost">
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  {SITE.phones[0]}
                </a>
              </div>
            </div>

            {/* Right — the illustration is the hero */}
            <div className="lg:col-span-7">
              <div
                className={cn(
                  'relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br shadow-[0_30px_80px_-20px_rgba(10,22,40,0.25)]',
                  s.cardBg
                )}
              >
                {/* Subtle grain */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />

                {/* Large number watermark */}
                <span
                  className={cn(
                    'pointer-events-none absolute left-8 top-6 font-display text-[120px] italic leading-none md:text-[160px]',
                    darkIllustration ? 'text-white/15' : 'text-ink-900/10'
                  )}
                >
                  {s.number}
                </span>

                {/* The SVG illustration */}
                <Image
                  src={s.image}
                  alt={content.name}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center"
                  priority
                />

                {/* Floating quick-fact pill, bottom-right */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-medium text-ink-900 backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  ISO 9001:2015 certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="border-y border-ink-100 bg-ink-50/50 py-8">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
                Service area
              </div>
              <div className="mt-2 font-display text-xl text-ink-900 md:text-2xl">
                Pune & Maharashtra
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
                Response
              </div>
              <div className="mt-2 font-display text-xl text-ink-900 md:text-2xl">
                Within 24 hours
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
                Site visit
              </div>
              <div className="mt-2 font-display text-xl text-ink-900 md:text-2xl">
                Free, no obligation
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
                Documentation
              </div>
              <div className="mt-2 font-display text-xl text-ink-900 md:text-2xl">
                Photo + digital report
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">What's included</span>
              <h2 className="display-md mt-4 text-balance">
                Methodical.
                <br />
                <span className="italic text-aqua-700">Measurable.</span>
                <br />
                Documented.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-500">
                Every job follows the same structured approach — nothing skipped, nothing
                improvised. Here's exactly what you get.
              </p>
            </div>

            <div className="md:col-span-8">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {content.features.map((feature: string, i: number) => (
                  <li key={i} className="group flex gap-5 py-6 md:gap-8 md:py-8">
                    <div className="shrink-0">
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-sm transition-transform duration-500 group-hover:scale-110',
                          s.accent
                        )}
                      >
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-base leading-relaxed text-ink-700 md:text-lg">
                        {feature}
                      </p>
                    </div>
                    <span className="hidden self-start pt-2 text-xs text-ink-400 md:block">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RELATED SERVICES ===== */}
      <section className="border-t border-ink-100 bg-ink-50/50 py-24">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow">More services</span>
              <h2 className="display-md mt-4">Explore other offerings</h2>
            </div>
            <Link
              href={`/${locale}/services`}
              className="hidden text-sm font-medium text-ink-900 link-underline md:inline-flex md:items-center md:gap-1.5"
            >
              View all
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {related.map((r) => {
              const RIcon = r.icon;
              const rContent = (dict.services as any)[r.slug];
              return (
                <Link
                  key={r.slug}
                  href={`/${locale}/services/${r.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(10,22,40,0.2)]"
                >
                  <div
                    className={cn(
                      'relative aspect-[4/3] overflow-hidden bg-gradient-to-br',
                      r.cardBg
                    )}
                  >
                    <Image
                      src={r.image}
                      alt={rContent.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                          r.accent
                        )}
                      >
                        <RIcon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400">
                        {rContent.tagline}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-tight text-ink-900 md:text-2xl">
                      {rContent.name}
                    </h3>
                    <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                      <span className="text-xs text-ink-500">Learn more</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
