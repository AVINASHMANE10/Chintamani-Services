import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import ContactForm from '@/components/ContactForm';
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
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial from-aqua-100/60 to-transparent blur-3xl" />
        </div>
        <div className="container-x">
          <div className="max-w-4xl">
            <span className="eyebrow">{dict.nav.contact}</span>
            <h1 className="display-xl mt-6 text-balance">{dict.contact.title}</h1>
            <p className="body-lg mt-8 max-w-2xl text-pretty">{dict.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Form + info split */}
      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-ink-100 bg-white p-8 md:p-12">
                <ContactForm
                  dict={dict.contact}
                  servicesDict={dict.services as any}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5">
              <div className="space-y-5">
                {/* Call card */}
                <div className="rounded-3xl bg-ink-950 p-8 text-white md:p-10">
                  <div className="flex items-center gap-3 text-aqua-300">
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                      {dict.contact.contactDetails}
                    </span>
                  </div>
                  <div className="mt-6 space-y-2">
                    {SITE.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, '')}`}
                        className="block font-display text-3xl text-white hover:text-aqua-200 md:text-4xl"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                    {SITE.email}
                  </a>
                </div>

                {/* Address */}
                <div className="rounded-3xl border border-ink-100 bg-white p-8 md:p-10">
                  <div className="flex items-center gap-3 text-aqua-700">
                    <MapPin className="h-4 w-4" strokeWidth={1.75} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                      {dict.contact.office}
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink-700">
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                    <br />
                    {SITE.address.city} – {SITE.address.postal}
                    <br />
                    {SITE.address.country}
                  </p>
                </div>

                {/* Hours */}
                <div className="rounded-3xl border border-ink-100 bg-aqua-50/50 p-8 md:p-10">
                  <div className="flex items-center gap-3 text-aqua-700">
                    <Clock className="h-4 w-4" strokeWidth={1.75} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                      Hours
                    </span>
                  </div>
                  <p className="mt-5 text-base text-ink-700">{dict.contact.hours}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map embed — static iframe, free */}
      <section className="pb-24">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-ink-100">
            <iframe
              title="Office location"
              src="https://maps.google.com/maps?q=Samarth%20Plaza%20Chinchwad%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
