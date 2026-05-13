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
      {/* Page hero - small intro */}
      <section className="relative water-bg pb-6 pt-12 md:pb-8 md:pt-16">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">{dict.servicesSection.eyebrow}</div>
            <h1 className="display-xl mt-3 text-balance">{dict.servicesSection.title}</h1>
            <p className="body-lg mt-5 max-w-2xl text-pretty">{dict.servicesSection.subtitle}</p>
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
