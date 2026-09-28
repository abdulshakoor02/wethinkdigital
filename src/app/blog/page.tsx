import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryFilter from '@/components/blog/CategoryFilter';
import JsonLd from '@/components/JsonLd';
import { getAllCategories, sortedPosts, toSummary } from '@/data/posts';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const TITLE = 'Engineering notes';
const DESCRIPTION =
  'Notes from the team on AI agents, LLM systems, automation and software engineering — what we build, what breaks, and what we would do differently.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/blog',
  keywords: [
    'AI engineering blog',
    'AI agents',
    'LLM systems',
    'AI automation',
    'software engineering notes',
    'RAG systems',
  ],
});

export default function BlogIndexPage() {
  const posts = sortedPosts;
  const summaries = posts.map(toSummary);
  const categories = getAllCategories();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': absoluteUrl('/blog#blog'),
    name: `${TITLE} — ${siteConfig.name}`,
    description: DESCRIPTION,
    url: absoluteUrl('/blog'),
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { '@type': 'Organization', name: post.author },
      articleSection: post.category,
      keywords: post.keywords.join(', '),
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${TITLE} — ${siteConfig.name}`,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd id="json-ld-blog" data={blogSchema} />
      <JsonLd id="json-ld-blog-list" data={itemListSchema} />

      <main className="pb-24 pt-32 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <header className="max-w-3xl">
            <p className="mono-label mb-5">Writing</p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-6xl">
              Engineering notes
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              What we have learned building AI agents, retrieval systems, automation pipelines and
              production software. Specifics over abstractions — including the parts that did not
              work.
            </p>
            <p className="mt-6 text-[0.9375rem] leading-7 text-muted">
              If a note raises a question about your own stack,{' '}
              <Link href="/contact" className="font-semibold text-secondary hover:text-primary">
                tell us what you are building
              </Link>
              .
            </p>
          </header>

          <div className="mt-14">
            <CategoryFilter posts={summaries} categories={categories} />
          </div>
        </div>
      </main>
    </>
  );
}
