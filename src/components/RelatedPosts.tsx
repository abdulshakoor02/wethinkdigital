'use client';

import Link from 'next/link';
import { blogPosts } from '@/data/posts';

interface RelatedPostsProps {
  currentPostId: string;
  currentPostKeywords?: string[];
}

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
  const relatedPosts = blogPosts
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
