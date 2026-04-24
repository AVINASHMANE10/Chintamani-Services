import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { getDictionary, type Locale } from '@/i18n/config';
import { getAllPosts, getPostBySlug } from '@/lib/sanity';
import CTASection from '@/components/CTASection';
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
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

  return (
    <>
      <article className="pt-16 md:pt-24">
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
              {post.readingMinutes} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="display-lg max-w-4xl text-balance">{post.title}</h1>
          <p className="body-lg mt-6 max-w-3xl text-pretty">{post.excerpt}</p>
        </div>
      </article>

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="prose prose-lg mx-auto max-w-3xl">
            {post.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="mb-6 whitespace-pre-line text-base leading-[1.75] text-ink-700 md:text-lg md:leading-[1.8]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Divider & next CTA */}
      <section className="border-t border-ink-100 py-16">
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
