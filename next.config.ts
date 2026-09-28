import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'gsap'],
  },

  // Turbopack configuration (stable in Next.js 16)
  turbopack: {},

  // Compression and caching
  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Mobile-first device sizes (prioritize smaller sizes)
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Optimize for mobile
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Legacy → current URL mapping (Sep 2026 revamp).
  // The repositioning deleted the SEO-services era pages, but Google still has
  // them indexed and they hold the site's only GSC impressions — a 404 there
  // throws away the crawl signal instead of passing it to the replacement.
  // 301 (not Next's default 308) so every SEO tool reports them as permanent.
  async redirects() {
    return [
      // Service-intent legacy URLs → the closest current offer page
      { source: '/seo-services', destination: '/services', statusCode: 301 },
      { source: '/blog/best-seo-company-in-dubai', destination: '/services', statusCode: 301 },
      { source: '/blog/best-seo-services-in-dubai', destination: '/services', statusCode: 301 },
      {
        source: '/blog/website-design-development-services-in-dubai',
        destination: '/services/web-development',
        statusCode: 301,
      },
      {
        source: '/blog/free-crm-software-for-small-business-dubai',
        destination: '/services/software-development',
        statusCode: 301,
      },
      // Retired marketing/SEO content → the blog index (no equivalent post)
      { source: '/blog/digital-marketing-trends-2025', destination: '/blog', statusCode: 301 },
      { source: '/blog/seo-best-practices', destination: '/blog', statusCode: 301 },
      { source: '/blog/web-development-frameworks', destination: '/blog', statusCode: 301 },
      { source: '/blog/crm-and-lead-management', destination: '/blog', statusCode: 301 },
      { source: '/blog/top-10-digital-marketing-company-in-dubai', destination: '/blog', statusCode: 301 },
      { source: '/blog/top-5-digital-marketing-company-in-dubai', destination: '/blog', statusCode: 301 },
    ];
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
