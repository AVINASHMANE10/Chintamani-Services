import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
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
    title: `${dict.contact.title} · ${SITE.name}`,
    description: dict.contact.subtitle,
    alternates: { canonical: `/${locale}/contact` },
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
      <section className="relative water-bg pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">{dict.nav.contact}</div>
            <h1 className="display-xl mt-3 text-balance">{dict.contact.title}</h1>
            <p className="body-lg mt-5 max-w-2xl text-pretty">
              {dict.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Form + info split */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-7 ring-1 ring-aqua-100 md:p-10">
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
                <div className="rounded-3xl bg-gradient-to-br from-aqua-700 via-aqua-800 to-aqua-900 p-7 text-white md:p-9">
                  <div className="flex items-center gap-3 text-aqua-200">
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {dict.contact.contactDetails}
                    </span>
                  </div>
                  <div className="mt-5 space-y-2">
                    {SITE.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, '')}`}
                        className="block font-display text-2xl font-extrabold text-white hover:text-aqua-100 md:text-3xl"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-400"
                    >
                      <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} fill="currentColor" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs text-white hover:bg-white/20"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                      {SITE.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-3xl bg-white p-7 ring-1 ring-aqua-100 md:p-9">
                  <div className="flex items-center gap-3 text-aqua-700">
                    <MapPin className="h-4 w-4" strokeWidth={2} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {dict.contact.office}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    Shree Chintamani Services
                    <br />
                    {SITE.address.line1},<br />
                    {SITE.address.line2},<br />
                    {SITE.address.city} – {SITE.address.postal}
                    <br />
                    {SITE.address.region}
                  </p>
                  <a
                    href={SITE.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-aqua-200 px-4 py-2 text-xs font-semibold text-aqua-800 transition-all hover:border-aqua-600 hover:bg-aqua-50"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={2} />
                    {dict.contact.directions || 'Get Directions'}
                  </a>
                </div>

                {/* Hours */}
                <div className="rounded-3xl bg-aqua-50 p-7 ring-1 ring-aqua-100 md:p-9">
                  <div className="flex items-center gap-3 text-aqua-700">
                    <Clock className="h-4 w-4" strokeWidth={2} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                      Hours
                    </span>
                  </div>
                  <p className="mt-4 text-base font-medium text-ink-700">
                    {dict.contact.hours}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-ink-100">
            <iframe
              title="Shree Chintamani Services — Nakhate Vasti, Rahatani, Pune"
              src="https://www.google.com/maps?q=Shree+Chintamani+Services+Nakhate+Vasti+Rahatani+Pune&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
