import { getDictionary, type Locale } from '@/i18n/config';
import HeroCarousel from '@/components/HeroCarousel';
import QuickIntro from '@/components/QuickIntro';
import ServicesGrid from '@/components/ServicesGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import CTASection from '@/components/CTASection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroCarousel
        locale={locale as Locale}
        dict={dict.carousel}
        servicesDict={dict.services as any}
      />
      <QuickIntro dict={dict.intro} />
      <ServicesGrid
        locale={locale as Locale}
        dict={dict.servicesSection}
        servicesDict={dict.services as any}
      />
      <WhyChooseUs dict={dict.whyUs} />
      <ProcessSection dict={dict.process} />
      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
