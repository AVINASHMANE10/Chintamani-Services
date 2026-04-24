export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hi', 'mr'] as const,
} as const;

export type Locale = (typeof i18n.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
};
