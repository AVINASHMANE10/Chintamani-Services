import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://shreechintamaniservices.com'
  ),
  title: {
    default:
      'Shree Chintamani Services — STP & Water Tank Cleaning in Pune | ISO 9001:2015 Certified',
    template: '%s · Shree Chintamani Services',
  },
  description: SITE.description,
  keywords: [
    'STP cleaning Pune',
    'STP tank cleaning Pimpri Chinchwad',
    'sewage treatment plant cleaning Pune',
    'water tank cleaning Pune',
    'water tank cleaning Pimpri Chinchwad',
    'fire tank cleaning Pune',
    'cooling tower cleaning Pune',
    'industrial cleaning Pune',
    'solar water heater service Pune',
    'tank cleaning Rahatani',
    'tank cleaning Nakhate Vasti',
    'tank cleaning Wakad',
    'tank cleaning Hinjewadi',
    'ISO certified tank cleaning Pune',
    'Shree Chintamani Services',
  ],
  authors: [{ name: 'Shree Chintamani Services' }],
  creator: 'Shree Chintamani Services',
  publisher: 'Shree Chintamani Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
