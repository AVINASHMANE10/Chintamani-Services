import type { Metadata } from 'next';
import { Instrument_Serif, Manrope, Tiro_Devanagari_Marathi } from 'next/font/google';
import { notFound } from 'next/navigation';
import { i18n, type Locale, getDictionary } from '@/i18n/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/utils';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const devanagari = Tiro_Devanagari_Marathi({
  weight: '400',
  subsets: ['devanagari'],
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
});

// Manrope as body font — distinctive, modern, high legibility
const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
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

  // LocalBusiness schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    image: `${SITE.url}/logo.svg`,
    '@id': SITE.url,
    url: SITE.url,
    telephone: SITE.phones[0],
    email: SITE.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 18.6298, longitude: 73.7997 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    hasCredential: 'ISO 9001:2015',
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
  };

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${bodyFont.variable} ${devanagari.variable}`}
    >
      <body className="min-h-screen bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar locale={locale as Locale} dict={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict.footer} />
      </body>
    </html>
  );
}
