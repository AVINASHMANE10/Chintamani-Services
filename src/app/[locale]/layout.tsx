import type { Metadata } from 'next';
import { Manrope, Tiro_Devanagari_Marathi } from 'next/font/google';
import { notFound } from 'next/navigation';
import { i18n, type Locale, getDictionary } from '@/i18n/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { SITE } from '@/lib/utils';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const devanagari = Tiro_Devanagari_Marathi({
  weight: '400',
  subsets: ['devanagari'],
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        hi: '/hi',
        mr: '/mr',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'hi' ? 'hi_IN' : locale === 'mr' ? 'mr_IN' : 'en_IN',
      url: SITE.url,
      siteName: SITE.name,
      title: SITE.name,
      description: SITE.description,
      images: [
        {
          url: '/images/services/stp-workers-2.jpg',
          width: 1200,
          height: 900,
          alt: 'Shree Chintamani Services — STP and tank cleaning in Pune',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE.name,
      description: SITE.description,
      images: ['/images/services/stp-workers-2.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!i18n.locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  // Full LocalBusiness schema with all the details Google likes for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE.url,
    name: SITE.name,
    alternateName: 'Chintamani Tank Cleaning Services',
    image: `${SITE.url}/images/services/stp-workers-2.jpg`,
    logo: `${SITE.url}/logo.svg`,
    url: SITE.url,
    telephone: SITE.phones[0],
    email: SITE.email,
    priceRange: '₹₹',
    foundingDate: '2015',
    slogan: 'STP and tank cleaning, done right.',
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: 'Maharashtra',
      postalCode: SITE.address.postal,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    areaServed: SITE.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasCredential: 'ISO 9001:2015',
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'GSTIN',
        value: SITE.gstin,
      },
      {
        '@type': 'PropertyValue',
        name: 'ISO Certification',
        value: 'ISO 9001:2015, QMS230893',
      },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin].filter(
      (s) => s && s !== '#'
    ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '6',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tank Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'STP & Fire Tank Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Domestic & Drinking Water Tank Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Industrial Tank & Cooling Tower Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Solar Water Heater Service & Repair',
          },
        },
      ],
    },
  };

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${devanagari.variable}`}
    >
      <body className="min-h-screen bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar locale={locale as Locale} dict={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict.footer} />
        <FloatingActions />
      </body>
    </html>
  );
}
