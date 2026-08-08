'use client';

import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  currentPostKeywords?: string[];
}

const allPosts: BlogPost[] = [
  { id: '1', slug: 'digital-marketing-trends-2025', title: 'Digital marketing trends to watch', excerpt: 'A clear view of the shifts changing digital growth.', date: '2025-08-15', readTime: '5 min read' },
  { id: '2', slug: 'seo-best-practices', title: 'SEO practices for modern websites', excerpt: 'The technical and editorial decisions that help search work compound.', date: '2025-08-01', readTime: '6 min read' },
  { id: '3', slug: 'web-development-frameworks', title: 'Choosing a web development framework', excerpt: 'A practical way to weigh team, product, and maintenance needs.', date: '2025-07-20', readTime: '7 min read' },
  { id: '4', slug: 'best-seo-company-in-dubai', title: 'What a good SEO partner should measure in Dubai', excerpt: 'A practical look at the difference between ranking reports and commercial progress.', date: '2025-08-20', readTime: '8 min read' },
  { id: '5', slug: 'best-seo-services-in-dubai', title: 'The SEO services that actually move a business forward', excerpt: 'Five ways to connect search work to the revenue decisions behind it.', date: '2025-08-18', readTime: '9 min read' },
  { id: '6', slug: 'crm-and-lead-management', title: 'Where good leads disappear after they arrive', excerpt: 'The handoffs between marketing, sales, and operations that quietly cost growth.', date: '2025-08-15', readTime: '10 min read' },
  { id: '7', slug: 'website-design-development-services-in-dubai', title: 'Why most business websites fail to convert', excerpt: 'What separates a useful commercial path from a digital brochure.', date: '2025-08-12', readTime: '12 min read' },
  { id: '8', slug: 'top-10-digital-marketing-company-in-dubai', title: 'Why agency rankings do not make the decision', excerpt: 'A better way to compare partners when the stakes are commercial.', date: '2025-08-10', readTime: '11 min read' },
  { id: '9', slug: 'top-5-digital-marketing-company-in-dubai', title: 'How to find the right growth partner', excerpt: 'The questions that reveal whether an agency understands your business.', date: '2025-08-08', readTime: '10 min read' },
];

const postKeywords: Record<string, string[]> = {
  '1': ['digital marketing', 'trends'],
  '2': ['seo', 'optimization'],
  '3': ['web development', 'frameworks'],
  '4': ['seo', 'dubai', 'revenue'],
  '5': ['seo', 'dubai', 'revenue'],
  '6': ['crm', 'leads', 'dubai'],
  '7': ['website', 'development', 'dubai'],
  '8': ['digital marketing', 'dubai'],
  '9': ['digital marketing', 'dubai'],
};

export default function RelatedPosts({ currentPostId, currentPostKeywords = [] }: RelatedPostsProps) {
  const currentKeywords = postKeywords[currentPostId] || currentPostKeywords;
  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPostId)
    .map((post) => ({
      ...post,
      score: (postKeywords[post.id] || []).reduce((score, keyword) => score + (currentKeywords.some((current) => current.includes(keyword) || keyword.includes(current)) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="border-t border-line bg-background-muted py-16">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Keep reading</p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-foreground">Related field notes</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {relatedPosts.map((post) => (
            <article key={post.id} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary">{post.title}</h3>
                  <span className="shrink-0 text-sm text-muted">{post.readTime}</span>
                </div>
                <p className="mt-3 leading-7 text-muted">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
        <Link href="/blog" className="btn-secondary mt-8">Read all field notes</Link>
      </div>
    </section>
  );
}
