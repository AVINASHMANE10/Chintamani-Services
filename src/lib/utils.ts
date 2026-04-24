import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: 'Shree Chintamani Services',
  shortName: 'SCS',
  description:
    'ISO 9001:2015 certified professional tank, facade and deep-cleaning services in Pune, Maharashtra. Trusted by homes, offices, and industries.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: 'chintamani1937@gmail.com',
  phones: ['+91 70300 20076', '+91 91680 96161'],
  whatsapp: '+917030020076',
  address: {
    line1: 'Office No. 401, Samarth Plaza',
    line2: 'Opp. Tata Motors, Chinchwad',
    city: 'Pimpri-Chinchwad',
    region: 'Pune',
    postal: '411033',
    country: 'India',
  },
  gstin: '27BPJPP7232J2ZF',
  iso: 'ISO 9001:2015 · QMS230893',
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
};
