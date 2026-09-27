/** @type {import('next-sitemap').IConfig} */

// Derive blog URLs + dates from the single source of truth (src/data/posts.ts)
const blogPosts = require('./src/data/posts.json');

module.exports = {
  siteUrl: "https://www.wethinkdigital.solutions",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // AI answer engines only cite what they are allowed to crawl. `*` already
    // allows everything, but naming the assistants explicitly removes any
    // ambiguity (and survives a future blanket-deny rule by accident).
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
  },
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ['/blog/[slug]'],
  transform: async (config, path) => {
    // Blog posts: use their real published date (not build-time now())
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = blogPosts.find((p) => p.slug === slug);
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: post ? new Date(post.date).toISOString() : undefined,
      };
    }

    // Default: static pages keep autoLastmod (build date) — but home/blog index
    // don't need artificial freshness either, so use autoLastmod only for real content.
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    // Blog posts — from the shared data file (single source of truth)
    return blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(post.date).toISOString(),
    }));
  },
};
