import type { MetadataRoute } from 'next';
import postsData from '@/data/posts.json';
import { absoluteUrl } from '@/lib/seo';

/**
 * Native Next.js sitemap — the single source of truth for what crawlers and
 * answer engines are told about.
 *
 * This replaces the old `next-sitemap` postbuild step. Two generators writing
 * sitemaps (one into `public/`, one via the route) meant a stale committed file
 * could shadow the generated one and keep advertising deleted pages.
 */

const lastModified = new Date();

interface SitemapPost {
  slug: string;
  date?: string;
  updated?: string;
}

/**
 * `src/data/posts.json` is owned by another part of the codebase, so treat it
 * as untrusted input: a missing, partial or malformed file must degrade to
 * "no blog entries" rather than break the build.
 */
function readPosts(): SitemapPost[] {
  const raw: unknown = postsData;
  if (!Array.isArray(raw)) return [];

  const seen = new Set<string>();
  const posts: SitemapPost[] = [];

  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue;
    const record = entry as Record<string, unknown>;
    const slug = typeof record.slug === 'string' ? record.slug.trim() : '';
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    posts.push({
      slug,
      date: typeof record.date === 'string' ? record.date : undefined,
      updated: typeof record.updated === 'string' ? record.updated : undefined,
    });
  }

  return posts;
}

/** Parse a post date, falling back to the build time if it is unusable. */
function toDate(value: string | undefined): Date {
  if (!value) return lastModified;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? lastModified : parsed;
}

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-automation', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-engineering', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/software-development', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/web-development', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/agents', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/resume-ai', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/offers', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = readPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: toDate(post.updated ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
