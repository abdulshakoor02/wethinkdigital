import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import RelatedPosts from '@/components/RelatedPosts';
import TableOfContents from '@/components/blog/TableOfContents';
import { formatPostDate, toIsoTimestamp } from '@/components/blog/format';
import { buildTableOfContents, countWords } from '@/components/blog/toc';
import { blogPosts, getPostBySlug } from '@/data/posts';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every note is known at build time, so an unrecognised slug is a genuine 404
 * rather than a page to render on demand. Without this, Next serves unknown
 * slugs as a prerendered "not found" body with a 200 status — a soft 404 that
 * search engines will happily index as a real page.
 */
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Note not found',
      description: 'This note does not exist. Browse the current engineering notes instead.',
      path: '/blog',
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: 'article',
    publishedTime: toIsoTimestamp(post.date),
    modifiedTime: toIsoTimestamp(post.updated ?? post.date),
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { content, toc } = buildTableOfContents(post.content);
  const wordCount = countWords(post.content);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(siteConfig.ogImage);
  const published = toIsoTimestamp(post.date);
  const modified = toIsoTimestamp(post.updated ?? post.date);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: published,
    dateModified: modified,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/wethinkdigital.svg'),
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image,
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount,
    inLanguage: 'en',
  };

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Notes', href: '/blog' },
    { name: post.title },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Notes', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd id="json-ld-article" data={articleSchema} />
      <JsonLd id="json-ld-article-breadcrumb" data={breadcrumbSchema} />

      <main className="pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={crumbs} />

          <header className="mt-10 max-w-3xl border-b border-line pb-10">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium tracking-tight text-primary">
              {post.category}
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              <span className="text-foreground">{post.author}</span>
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              <span>{post.readTime}</span>
              {post.updated ? (
                <>
                  <span aria-hidden="true" className="text-line-strong">
                    /
                  </span>
                  <span>Updated {formatPostDate(post.updated)}</span>
                </>
              ) : null}
            </div>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="min-w-0 max-w-3xl">
              <article
                className="prose-wtd"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <div className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium tracking-tight text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <aside className="surface mt-10 p-7 sm:p-8">
                <p className="mono-label mb-4">Written by</p>
                <p className="text-lg font-bold tracking-[-0.025em] text-foreground">{post.author}</p>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
                  We build AI automation, agent systems, custom software and modern web
                  applications. These notes come out of production work, not from a content
                  calendar.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-primary">
                    Start a conversation
                  </Link>
                  <Link href="/products/agents" className="btn-secondary">
                    See our agents
                  </Link>
                </div>
              </aside>
            </div>

            <TableOfContents entries={toc} />
          </div>
        </div>

        <div className="mt-24">
          <RelatedPosts post={post} />
        </div>
      </main>
    </>
  );
}
