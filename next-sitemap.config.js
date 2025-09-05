/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.wethinkdigital.solutions",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ['/blog/[slug]'],
  transform: async (config, path) => {
    // Handle blog posts with custom priority and changefreq
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Default configuration for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    // Add your blog posts dynamically
    const blogPosts = [
      { slug: 'digital-marketing-trends-2025', date: '2025-08-15' },
      { slug: 'seo-best-practices', date: '2025-08-01' },
      { slug: 'web-development-frameworks', date: '2025-07-20' },
      { slug: 'best-seo-company-in-dubai', date: '2025-08-20' },
      { slug: 'best-seo-services-in-dubai', date: '2025-08-18' },
      { slug: 'crm-and-lead-management', date: '2025-08-15' },
      { slug: 'website-design-development-services-in-dubai', date: '2025-08-12' },
      { slug: 'top-10-digital-marketing-company-in-dubai', date: '2025-08-10' },
      { slug: 'top-5-digital-marketing-company-in-dubai', date: '2025-08-08' },
      { slug: 'free-crm-software-for-small-business-dubai', date: '2025-09-05' },
    ];
    
    return blogPosts.map(post => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(post.date).toISOString(),
    }));
  },
};
