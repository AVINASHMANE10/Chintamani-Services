import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import CTASection from '@/components/CTASection';
import { SITE } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'hi', 'mr'];
  const posts = await getAllPosts();
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(locale as Locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${SITE.url}${post.coverImage}` : undefined,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/${locale}/blog/${slug}`,
    },
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-12 md:pt-20">
        <div className="container-x">
          {/* Back link */}
          <Link
            href={`/${locale}/blog`}
            className="mb-10 inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            {dict.blog.backToBlog}
          </Link>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {post.readingMinutes} {dict.blog.minRead || 'min read'}
            </span>
          </div>

          {/* Title */}
          <h1 className="display-lg max-w-4xl text-balance">{post.title}</h1>
          <p className="body-lg mt-6 max-w-3xl text-pretty">{post.excerpt}</p>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl border border-ink-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
          )}
        </div>
      </article>

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            {post.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="mb-6 whitespace-pre-line text-base leading-[1.8] text-ink-700 md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Divider & next CTA */}
      <section className="border-t border-ink-100 py-12">
        <div className="container-x text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 link-underline"
          >
            {dict.blog.backToBlog}
          </Link>
        </div>
      </section>

      <CTASection locale={locale as Locale} dict={dict.cta} />
    </>
  );
}
