import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Phone, MessageCircle, Check } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { services, getService } from '@/data/services';
import CTASection from '@/components/CTASection';
import { SITE } from '@/lib/utils';
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

  const service = getService(slug);
  const imagePath = service?.image || `/images/services/${slug}.jpg`;

  return {
    title: `${content.name} in Pune & Pimpri-Chinchwad`,
    description: content.short,
    alternates: { canonical: `/${locale}/services/${slug}` },
    openGraph: {
      title: content.name,
      description: content.short,
      images: [imagePath],
      type: 'website',
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
  const content = (dict.services as any)[slug] as {
    name: string;
    short: string;
    tagline: string;
    overview: string;
    features: string[];
  };
  if (!content) notFound();

  const phone = SITE.phones[0].replace(/\s/g, '');
  const whatsapp = SITE.whatsapp.replace(/[^\d]/g, '');

  // Related services
  const idx = services.findIndex((r) => r.slug === slug);
  const related = [...services.slice(idx + 1), ...services.slice(0, idx)].slice(0, 3);

  // SEO schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: content.name,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      telephone: SITE.phones[0],
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postal,
        addressCountry: 'IN',
      },
    },
    areaServed: SITE.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
    description: content.overview,
    url: `${SITE.url}/${locale}/services/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* HERO */}
      <section className="relative water-bg pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="container-x">
          {/* Breadcrumb */}
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm text-aqua-700 hover:text-aqua-900"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {dict.servicesSection.title}
          </Link>

          <div className="mt-8 grid gap-8 md:gap-12 lg:grid-cols-12">
            {/* Left - text */}
            <div className="lg:col-span-6">
              <div className="eyebrow">{content.tagline}</div>
              <h1 className="display-xl mt-3 text-balance">{content.name}</h1>
              <p className="body-lg mt-5 text-pretty">{content.overview}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`tel:${phone}`} className="btn-primary">
                  <Phone className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
                  {SITE.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right - image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-aqua-50 shadow-xl shadow-aqua-900/10">
                <Image
                  src={service.image}
                  alt={content.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
                {!service.illustrated && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-aqua-800 backdrop-blur">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    ISO 9001:2015
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="mb-10 max-w-2xl">
            <div className="eyebrow">What's included</div>
            <h2 className="display-md mt-3">Every job. Same standard.</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl bg-aqua-50/40 p-5 ring-1 ring-aqua-100 md:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aqua-700 text-white shadow-md shadow-aqua-700/30">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <p className="text-sm leading-relaxed text-ink-700 md:text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (only if real photos available) */}
      {!service.illustrated && service.gallery.length > 1 && (
        <section className="bg-aqua-50/40 py-14 md:py-20">
          <div className="container-x">
            <div className="mb-8 max-w-2xl md:mb-10">
              <div className="eyebrow">From the field</div>
              <h2 className="display-md mt-3">Recent work</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {service.gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-aqua-100"
                >
                  <Image
                    src={src}
                    alt={`${content.name} – ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 md:mb-10">
            <div className="eyebrow">More services</div>
            <h2 className="display-md mt-3">Other things we clean</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {related.map((r) => {
              const rContent = (dict.services as any)[r.slug];
              const RIcon = r.icon;
              return (
                <Link
                  key={r.slug}
                  href={`/${locale}/services/${r.slug}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-aqua-100 transition-all hover:ring-aqua-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-aqua-50">
                    <Image
                      src={r.image}
                      alt={rContent.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-aqua-100 text-aqua-700">
                        <RIcon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                        {rContent.tagline}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold leading-tight text-ink-900 md:text-lg">
                      {rContent.name}
                    </h3>
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
