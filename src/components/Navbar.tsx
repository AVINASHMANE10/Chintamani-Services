'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/lib/utils';

type NavDict = {
  home: string;
  about: string;
  services: string;
  blog: string;
  contact: string;
  getQuote: string;
};

export default function Navbar({ locale, dict }: { locale: Locale; dict: NavDict }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const links = [
    { href: `/${locale}`, label: dict.home },
    { href: `/${locale}/services`, label: dict.services },
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/blog`, label: dict.blog },
    { href: `/${locale}/contact`, label: dict.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          scrolled
            ? 'border-b border-ink-100 bg-white/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-white/0'
        )}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="Shree Chintamani Services"
              width={180}
              height={46}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive(l.href) ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-aqua-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <Link
              href={`/${locale}/contact`}
              className="hidden rounded-full bg-ink-900 px-5 py-2 text-xs font-medium text-white transition-all hover:bg-aqua-700 md:inline-flex md:items-center md:gap-1.5"
            >
              {dict.getQuote}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-ink-200 p-2 text-ink-700 transition hover:border-ink-400 lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div
          className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-500 sm:w-96',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
            <Image src="/logo.svg" alt="" width={160} height={40} className="h-8 w-auto" />
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-ink-200 p-2 text-ink-700"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium transition-colors',
                  isActive(l.href)
                    ? 'bg-ink-50 text-ink-900'
                    : 'text-ink-700 hover:bg-ink-50'
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
                <ArrowUpRight
                  className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </Link>
            ))}
          </nav>
          <div className="border-t border-ink-100 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-ink-400">Language</span>
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary w-full justify-center"
            >
              {dict.getQuote}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to offset fixed nav */}
      <div className="h-16 md:h-20" aria-hidden />
    </>
  );
}
