import type { LucideIcon } from 'lucide-react';
import {
  Droplets,
  Flame,
  Factory,
  Building2,
  Sparkles,
  Sun,
} from 'lucide-react';

export type ServiceSlug =
  | 'domestic-water-tank'
  | 'stp-fire-tank'
  | 'industrial-cooling-tower'
  | 'facade-cleaning'
  | 'deep-cleaning'
  | 'solar-water-heater';

export type Service = {
  slug: ServiceSlug;
  icon: LucideIcon;
  accent: string; // gradient for the icon badge
  number: string; // display number "01", "02", etc.
  image: string; // path under /public
  cardBg: string; // tailwind gradient classes matching the illustration's mood
};

export const services: Service[] = [
  {
    slug: 'domestic-water-tank',
    icon: Droplets,
    accent: 'from-aqua-400 to-aqua-600',
    number: '01',
    image: '/images/services/domestic-water-tank.svg',
    cardBg: 'from-aqua-50 via-aqua-100/60 to-white',
  },
  {
    slug: 'stp-fire-tank',
    icon: Flame,
    accent: 'from-rose-400 to-orange-500',
    number: '02',
    image: '/images/services/stp-fire-tank.svg',
    cardBg: 'from-ink-900 via-ink-800 to-ink-950',
  },
  {
    slug: 'industrial-cooling-tower',
    icon: Factory,
    accent: 'from-slate-400 to-slate-700',
    number: '03',
    image: '/images/services/industrial-cooling-tower.svg',
    cardBg: 'from-ink-800 via-ink-700 to-amber-900/40',
  },
  {
    slug: 'facade-cleaning',
    icon: Building2,
    accent: 'from-aqua-300 to-ink-700',
    number: '04',
    image: '/images/services/facade-cleaning.svg',
    cardBg: 'from-aqua-100 via-aqua-200 to-aqua-50',
  },
  {
    slug: 'deep-cleaning',
    icon: Sparkles,
    accent: 'from-emerald-400 to-teal-600',
    number: '05',
    image: '/images/services/deep-cleaning.svg',
    cardBg: 'from-amber-50 via-white to-emerald-50',
  },
  {
    slug: 'solar-water-heater',
    icon: Sun,
    accent: 'from-amber-400 to-orange-500',
    number: '06',
    image: '/images/services/solar-water-heater.svg',
    cardBg: 'from-amber-200 via-orange-100 to-amber-50',
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
