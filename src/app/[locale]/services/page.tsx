import { getDictionary, type Locale } from '@/i18n/config';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.servicesSection.title,
    description: dict.servicesSection.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial from-aqua-100/50 to-transparent blur-3xl" />
        </div>
        <div className="container-x">
          <div className="max-w-4xl">
            <span className="eyebrow">{dict.servicesSection.eyebrow}</span>
            <h1 className="display-xl mt-6 text-balance">{dict.servicesSection.title}</h1>
            <p className="body-lg mt-8 max-w-2xl text-pretty">{dict.servicesSection.subtitle}</p>
          </div>
        </div>
      </section>

      <ServicesGrid
        locale={locale as Locale}
        dict={dict.servicesSection}
        servicesDict={dict.services as any}
      />

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
