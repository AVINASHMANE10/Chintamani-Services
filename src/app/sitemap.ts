import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n/locales';
import { services } from '@/data/services';
import { getAllPosts } from '@/lib/sanity';
import { SITE } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, '');
  const routes = ['', '/about', '/services', '/blog', '/contact'];
  const posts = await getAllPosts();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const path of routes) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const s of services) {
      entries.push({
        url: `${base}/${locale}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    for (const p of posts) {
      entries.push({
        url: `${base}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.publishedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
