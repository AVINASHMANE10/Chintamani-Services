'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/utils';

export default function FloatingActions() {
  const phone = SITE.phones[0].replace(/\s/g, '');
  const whatsapp = SITE.whatsapp.replace(/[^\d]/g, '');

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:bottom-7 md:right-7">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition-all hover:scale-110 hover:bg-emerald-600 md:h-16 md:w-16"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500 opacity-30" />
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} fill="currentColor" />
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        aria-label="Call us"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-aqua-600 text-white shadow-lg shadow-aqua-600/40 transition-all hover:scale-110 hover:bg-aqua-700 md:h-16 md:w-16"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} fill="currentColor" />
      </a>
    </div>
  );
}
