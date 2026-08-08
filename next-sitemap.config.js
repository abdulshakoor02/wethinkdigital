/** @type {import('next-sitemap').IConfig} */

// Derive blog URLs + dates from the single source of truth (src/data/posts.ts)
const blogPosts = require('./src/data/posts.json');

module.exports = {
  siteUrl: "https://www.wethinkdigital.solutions",
  generateRobotsTxt: true,
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
