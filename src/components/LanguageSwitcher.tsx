'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { type Locale, localeNames } from '@/i18n/locales';
import { cn } from '@/lib/utils';

const locales: Locale[] = ['en', 'hi', 'mr'];

export default function LanguageSwitcher({
  currentLocale,
  variant = 'light',
}: {
  currentLocale: Locale;
  variant?: 'light' | 'dark';
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function switchTo(next: Locale) {
    if (next === currentLocale) return setOpen(false);
    // Replace the leading /xx/ segment
    const newPath = pathname.replace(/^\/(en|hi|mr)(?=\/|$)/, `/${next}`);
    router.push(newPath || `/${next}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
          variant === 'light'
            ? 'border-ink-200 text-ink-700 hover:border-ink-400 hover:text-ink-900'
            : 'border-white/20 text-white/80 hover:border-white/60 hover:text-white'
        )}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
        <span className="uppercase tracking-wider">{currentLocale}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} strokeWidth={2} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] overflow-hidden rounded-2xl border border-ink-100 bg-white/95 p-1 shadow-xl backdrop-blur-xl"
          role="listbox"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                loc === currentLocale
                  ? 'bg-ink-50 text-ink-900'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              )}
              role="option"
              aria-selected={loc === currentLocale}
            >
              <span>{localeNames[loc]}</span>
              {loc === currentLocale && <Check className="h-3.5 w-3.5 text-aqua-700" strokeWidth={2} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
