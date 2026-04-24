import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { services, getService } from '@/data/services';
import CTASection from '@/components/CTASection';
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

  const Icon = service.icon;

  // Related services (next 3 in list)
  const idx = services.findIndex((s) => s.slug === slug);
  const related = [...services.slice(idx + 1), ...services.slice(0, idx)].slice(0, 3);

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section className="relative overflow-hidden pt-16 md:pt-20">
        <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${service.accent} opacity-[0.08]`} />

        <div className="container-x">
          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-xs text-ink-500">
            <Link href={`/${locale}`} className="hover:text-ink-900">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/services`} className="hover:text-ink-900">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink-900">{content.name}</span>
          </nav>

          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="flex items-center gap-4">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${service.accent}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-500">
                  {service.number} · {content.tagline}
                </span>
              </div>
              <h1 className="display-lg mt-8 max-w-3xl text-balance">{content.name}</h1>
              <p className="body-lg mt-8 max-w-2xl text-pretty">{content.overview}</p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary group">
                  {dict.cta.button}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <a href={`tel:+917030020076`} className="btn-ghost">
                  Call +91 70300 20076
                </a>
              </div>
            </div>

            {/* Sidebar card */}
            <aside className="md:col-span-5 lg:col-span-4">
              <div className="rounded-3xl border border-ink-100 bg-white p-8">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400">
                  Quick facts
                </div>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-ink-400">Certification</dt>
                    <dd className="mt-1 text-ink-900">ISO 9001:2015</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Service area</dt>
                    <dd className="mt-1 text-ink-900">Pune & wider Maharashtra</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Response time</dt>
                    <dd className="mt-1 text-ink-900">Within 24 hours</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Site visit</dt>
                    <dd className="mt-1 text-ink-900">Free, no obligation</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">What's included</span>
              <h2 className="display-md mt-4 text-balance">Methodical. Measurable. Documented.</h2>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {content.features.map((f: string, i: number) => (
                  <li key={i} className="flex gap-5 py-6">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aqua-100 text-aqua-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                    <p className="text-base leading-relaxed text-ink-700 md:text-lg">{f}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="border-t border-ink-100 py-24">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="display-md">Explore other services</h2>
            <Link
              href={`/${locale}/services`}
              className="hidden text-sm font-medium text-ink-900 link-underline md:block"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              const rContent = (dict.services as any)[r.slug];
              return (
                <Link
                  key={r.slug}
                  href={`/${locale}/services/${r.slug}`}
                  className="group flex flex-col justify-between rounded-3xl border border-ink-100 bg-white p-7 transition-all hover:border-ink-900"
                >
                  <div>
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white ${r.accent}`}
                    >
                      <RIcon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-ink-900">{rContent.name}</h3>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-ink-500">{rContent.tagline}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900"
                      strokeWidth={1.75}
                    />
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
