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
  accent: string; // tailwind class fragment for accent
  number: string; // display number "01", "02", etc.
};

export const services: Service[] = [
  {
    slug: 'domestic-water-tank',
    icon: Droplets,
    accent: 'from-aqua-400 to-aqua-600',
    number: '01',
  },
  {
    slug: 'stp-fire-tank',
    icon: Flame,
    accent: 'from-rose-400 to-orange-500',
    number: '02',
  },
  {
    slug: 'industrial-cooling-tower',
    icon: Factory,
    accent: 'from-slate-400 to-slate-700',
    number: '03',
  },
  {
    slug: 'facade-cleaning',
    icon: Building2,
    accent: 'from-aqua-300 to-ink-700',
    number: '04',
  },
  {
    slug: 'deep-cleaning',
    icon: Sparkles,
    accent: 'from-emerald-400 to-teal-600',
    number: '05',
  },
  {
    slug: 'solar-water-heater',
    icon: Sun,
    accent: 'from-amber-400 to-orange-500',
    number: '06',
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
