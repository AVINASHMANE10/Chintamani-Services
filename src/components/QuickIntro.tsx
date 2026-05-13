'use client';

import { Phone, MessageCircle, Award, Clock } from 'lucide-react';
import { SITE } from '@/lib/utils';

type IntroDict = {
  title: string;
  body: string;
  tagline: string;
  yearsLabel: string;
  hoursLabel: string;
  certLabel: string;
  callText: string;
};

export default function QuickIntro({ dict }: { dict: IntroDict }) {
  const phone = SITE.phones[0].replace(/\s/g, '');
  const whatsapp = SITE.whatsapp.replace(/[^\d]/g, '');

  return (
    <section className="relative py-14 md:py-20">
      <div className="container-x">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* Left - text */}
          <div className="md:col-span-7">
            <div className="eyebrow">{dict.tagline}</div>
            <h2 className="display-lg mt-3 text-balance">{dict.title}</h2>
            <p className="body-lg mt-5 max-w-2xl text-pretty">{dict.body}</p>

            {/* Big phone number CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-3 rounded-2xl bg-aqua-700 px-5 py-4 text-white shadow-lg shadow-aqua-700/30 transition-all hover:scale-[1.02] hover:bg-aqua-800 md:px-6 md:py-5"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} fill="currentColor" />
                <div className="text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-aqua-100 md:text-[11px]">
                    {dict.callText}
                  </div>
                  <div className="font-display text-lg font-extrabold leading-none md:text-2xl">
                    {SITE.phones[0]}
                  </div>
                </div>
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

          {/* Right - 3 stat cards */}
          <div className="md:col-span-5">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <StatCard
                icon={<Award className="h-5 w-5" strokeWidth={2} />}
                value={SITE.yearsInService}
                label={dict.yearsLabel}
              />
              <StatCard
                icon={<Clock className="h-5 w-5" strokeWidth={2} />}
                value="7"
                label={dict.hoursLabel}
              />
              <StatCard
                icon={<Award className="h-5 w-5" strokeWidth={2} />}
                value="ISO"
                label={dict.certLabel}
              />
            </div>

            {/* Quick badge below */}
            <div className="mt-4 rounded-xl bg-aqua-50 px-4 py-3 text-center text-xs font-semibold text-aqua-800 ring-1 ring-aqua-100 md:text-sm">
              {SITE.iso}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-aqua-100 md:p-5">
      <div className="flex items-center justify-center text-aqua-600">{icon}</div>
      <div className="mt-2 text-center font-display text-2xl font-extrabold leading-none text-ink-900 md:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-center text-[10px] font-medium uppercase tracking-wide text-ink-500 md:text-xs">
        {label}
      </div>
    </div>
  );
}
