import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { getAllPosts } from '@/lib/posts';
import CTASection from '@/components/CTASection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative water-bg pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">{dict.blog.eyebrow}</div>
            <h1 className="display-xl mt-3 text-balance">{dict.blog.title}</h1>
            <p className="body-lg mt-5 max-w-2xl text-pretty">{dict.blog.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-ink-50 p-12 text-center">
              <h2 className="font-display text-3xl text-ink-900">{dict.blog.comingSoon}</h2>
              <p className="mx-auto mt-4 max-w-md text-ink-500">{dict.blog.comingSoonBody}</p>
            </div>
          ) : (
            <ul className="divide-y divide-ink-100 border-y border-ink-100">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8"
                  >
                    <div className="md:col-span-2">
                      <div className="font-display text-4xl italic text-ink-300 transition-colors group-hover:text-aqua-600">
                        0{i + 1}
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <div className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-ink-300" />
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" strokeWidth={2} />
                          {post.readingMinutes} min read
                        </span>
                      </div>
                      <h2 className="font-display text-3xl leading-tight text-ink-900 transition-colors group-hover:text-aqua-800 md:text-4xl">
                        {post.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-ink-500">{post.excerpt}</p>
                    </div>
                    <div className="flex items-start justify-between md:col-span-3 md:justify-end">
                      <time className="text-sm text-ink-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <ArrowUpRight
                        className="ml-6 h-6 w-6 text-ink-400 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900"
                        strokeWidth={1.5}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
