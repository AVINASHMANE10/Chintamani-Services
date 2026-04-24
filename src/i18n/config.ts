import 'server-only';
import { i18n, type Locale } from './locales';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  hi: () => import('./dictionaries/hi.json').then((m) => m.default),
  mr: () => import('./dictionaries/mr.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// Re-export shared types so existing imports from '@/i18n/config' keep working
export { i18n, type Locale, localeNames } from './locales';
