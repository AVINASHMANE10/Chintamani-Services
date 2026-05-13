import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { getDictionary, type Locale } from '@/i18n/config';
import { services } from '@/data/services';

type FooterDict = {
  tagline: string;
  services: string;
  company: string;
  about: string;
  blog: string;
  contact: string;
  legal: string;
  privacy: string;
  terms: string;
  copyright: string;
  certification: string;
  serviceAreasTitle?: string;
};

export default async function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: FooterDict;
}) {
  const fullDict = await getDictionary(locale);

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,160,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-500/40 to-transparent" />

      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        {/* Brand block */}
        <div className="md:col-span-5">
          <Image
            src="/logo-white.svg"
            alt="Shree Chintamani Services"
            width={200}
            height={52}
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-300">{dict.tagline}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-aqua-500/30 bg-aqua-500/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-aqua-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua-300" />
            </span>
            {dict.certification}
          </div>
        </div>

        {/* Services */}
        <div className="md:col-span-3">
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            {dict.services}
          </h4>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  className="text-sm text-ink-300 transition-colors hover:text-white"
                >
                  {(fullDict.services as any)[s.slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div className="md:col-span-4 space-y-10">
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              {dict.company}
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-ink-300 hover:text-white">
                  {dict.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-sm text-ink-300 hover:text-white">
                  {dict.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-ink-300 hover:text-white">
                  {dict.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              {fullDict.contact.contactDetails}
            </h4>
            <ul className="space-y-3 text-sm text-ink-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" strokeWidth={1.75} />
                <span>
                  {SITE.address.line1}, {SITE.address.line2}
                  <br />
                  {SITE.address.city} – {SITE.address.postal}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-aqua-400" strokeWidth={1.75} />
                <div className="flex flex-col">
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-aqua-400" strokeWidth={1.75} />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-emerald-400"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      {/* Service areas band */}
      {SITE.serviceAreas.length > 0 && (
        <div className="border-t border-white/10">
          <div className="container-x py-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-aqua-300">
                {dict.serviceAreasTitle || 'Service Areas'}:
              </span>
              {SITE.serviceAreas.map((area, i) => (
                <span key={area} className="text-xs text-ink-300">
                  {area}
                  {i < SITE.serviceAreas.length - 1 && (
                    <span className="ml-3 text-ink-600">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-xs text-ink-400">{dict.copyright}</p>
          <p className="text-xs text-ink-400">GSTIN: {SITE.gstin}</p>
          <div className="flex items-center gap-3">
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              className="rounded-full border border-white/10 p-2 text-ink-300 transition-colors hover:border-aqua-400 hover:text-aqua-300"
            >
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              className="rounded-full border border-white/10 p-2 text-ink-300 transition-colors hover:border-aqua-400 hover:text-aqua-300"
            >
              <Facebook className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={SITE.social.linkedin}
              aria-label="LinkedIn"
              className="rounded-full border border-white/10 p-2 text-ink-300 transition-colors hover:border-aqua-400 hover:text-aqua-300"
            >
              <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
