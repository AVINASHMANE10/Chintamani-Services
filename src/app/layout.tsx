import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Shree Chintamani Services — ISO 9001:2015 Certified Cleaning, Pune',
    template: '%s · Shree Chintamani Services',
  },
  description:
    'Professional tank, facade and deep-cleaning services in Pune. ISO 9001:2015 certified. Trusted by homes, offices and industries across Maharashtra.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
