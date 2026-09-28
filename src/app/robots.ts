import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

/**
 * Native robots route. A static `public/robots.txt` would shadow this file, so
 * that file is deliberately absent — this is the only robots source.
 *
 * `*` already allows everything, but AI answer engines are named explicitly:
 * their crawlers only cite what they are permitted to fetch, and an explicit
 * allow survives a future blanket-deny added by accident.
 */

const ANSWER_ENGINE_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...ANSWER_ENGINE_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
