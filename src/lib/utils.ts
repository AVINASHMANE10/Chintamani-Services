import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: 'Shree Chintamani Services',
  shortName: 'SCS',
  description:
    'ISO 9001:2015 certified STP tank cleaning, water tank cleaning, cooling tower cleaning and solar water heater services in Pune. Trusted across Pimpri-Chinchwad, Rahatani, Chinchwad, Wakad, Hinjewadi, Aundh and Baner for over 10 years.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shreechintamaniservices.com',
  email: 'chintamani1937@gmail.com',
  phones: ['+91 70300 20076', '+91 91680 96161'],
  whatsapp: '+917030020076',
  yearsInService: '10+',
  foundedYear: 2015,
  address: {
    line1: 'Sunshine Nagar, near Soundarya Colony',
    line2: 'Nakhate Vasti, Baderaj Colony, Rahatani',
    city: 'Pimpri-Chinchwad',
    region: 'Pune, Maharashtra',
    postal: '411017',
    country: 'India',
  },
  geo: {
    latitude: 18.6013706,
    longitude: 73.7868893,
  },
  hours: {
    weekdays: 'Monday – Sunday · 9:00 AM – 9:00 PM',
    short: 'Open all 7 days · 9 AM – 9 PM',
  },
  maps: {
    placeId: 'ChIJ3dZKnb25wjsRnkIBnkGKpg4',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.4!2d73.7868893!3d18.6013706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShree%20Chintamani%20Services!5e0!3m2!1sen!2sin',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Shree+Chintamani+Services&destination_place_id=ChIJ3dZKnb25wjsRnkIBnkGKpg4',
    listing:
      'https://www.google.com/maps/place/?q=place_id:ChIJ3dZKnb25wjsRnkIBnkGKpg4',
  },
  gstin: '27BPJPP7232J2ZF',
  iso: 'ISO 9001:2015 · QMS230893',
  serviceAreas: [
    'Pimpri-Chinchwad',
    'Rahatani',
    'Chinchwad',
    'Wakad',
    'Hinjewadi',
    'Aundh',
    'Baner',
    'Pune',
  ],
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
};
