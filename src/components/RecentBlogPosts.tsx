'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}

const featuredPosts: BlogPost[] = [
  {
    id: '4',
    slug: 'best-seo-company-in-dubai',
    title: 'What a good SEO partner should measure in Dubai',
    excerpt: 'A practical look at the difference between ranking reports and commercial progress.',
    date: '2025-08-20',
    author: 'WeThinkDigital Team',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'best-seo-services-in-dubai',
    title: 'The SEO services that actually move a business forward',
    excerpt: 'Five ways to connect search work to the revenue decisions behind it.',
    date: '2025-08-18',
    author: 'WeThinkDigital Team',
    readTime: '9 min read',
  },
  {
    id: '6',
    slug: 'crm-and-lead-management',
    title: 'Where good leads disappear after they arrive',
    excerpt: 'The handoffs between marketing, sales, and operations that quietly cost growth.',
    date: '2025-08-15',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
  },
];

export default function RecentBlogPosts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="border-t border-line bg-background-muted py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">From the journal</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">Useful thinking for the next commercial decision.</h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-8 text-muted">No content for content&apos;s sake. These notes look at the systems, choices, and trade-offs behind digital growth.</p>
        </motion.div>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-start"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h3 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-foreground group-hover:text-primary">{post.title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{post.excerpt}</p>
              </Link>
              <div className="flex gap-4 text-sm text-muted sm:flex-col sm:items-end sm:gap-1">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link href="/blog" className="btn-secondary">Read the journal <span aria-hidden="true" className="ml-2">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
