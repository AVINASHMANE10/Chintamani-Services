import type { LucideIcon } from 'lucide-react';
import { Factory, Droplets, Wind, Sun } from 'lucide-react';

export type ServiceSlug =
  | 'stp-fire-tank-cleaning'
  | 'water-tank-cleaning'
  | 'cooling-tower-cleaning'
  | 'solar-water-heater';

export type Service = {
  slug: ServiceSlug;
  icon: LucideIcon;
  number: string;
  image: string;
  gallery: string[];
  // For services without real photos, use an illustrated card style
  illustrated?: boolean;
};

// 4 services. STP includes fire-tank cleaning. Domestic + drinking are together.
export const services: Service[] = [
  {
    slug: 'stp-fire-tank-cleaning',
    icon: Factory,
    number: '01',
    image: '/images/services/stp-workers-2.jpg',
    gallery: [
      '/images/services/stp-workers-2.jpg',
      '/images/services/stp-workers-1.jpg',
      '/images/services/stp-workers-3.jpg',
      '/images/services/stp-plant.jpg',
      '/images/services/stp-truck.jpg',
    ],
  },
  {
    slug: 'water-tank-cleaning',
    icon: Droplets,
    number: '02',
    // Illustrated treatment - no real photos available
    image: '/images/services/water-tank-illustration.svg',
    gallery: [],
    illustrated: true,
  },
  {
    slug: 'cooling-tower-cleaning',
    icon: Wind,
    number: '03',
    image: '/images/services/cooling-tower-1.jpg',
    gallery: [
      '/images/services/cooling-tower-1.jpg',
      '/images/services/cooling-tower-2.jpg',
      '/images/services/cooling-tower-3.jpg',
      '/images/services/cooling-tower-4.jpg',
      '/images/services/cooling-tower-5.jpg',
      '/images/services/cooling-tower-6.jpg',
      '/images/services/cooling-tower-7.jpg',
      '/images/services/cooling-tower-8.jpg',
    ],
  },
  {
    slug: 'solar-water-heater',
    icon: Sun,
    number: '04',
    image: '/images/services/solar-heater-illustration.svg',
    gallery: [],
    illustrated: true,
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
