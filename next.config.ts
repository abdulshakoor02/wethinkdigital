import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'gsap'],
  },

  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Bundle analyzer and optimization
  webpack: (config, { isServer, dev }) => {
    // Optimize for production builds
    if (!dev && !isServer) {
      // Tree shake unused Three.js modules - use standard import path
      config.resolve.alias = {
        ...config.resolve.alias,
        three: 'three',
      };

      // Mobile-specific optimizations
      config.optimization = {
        ...config.optimization,
        // Smaller chunk sizes for mobile
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          minSize: 20000, // Smaller min size for mobile
          maxSize: 200000, // Smaller max size for mobile
          cacheGroups: {
            default: false,
            vendors: false,
            // Critical vendor chunk (small, immediately needed)
            criticalVendor: {
              name: 'critical-vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Three.js specific chunk (lazy loaded on mobile)
            three: {
              name: 'three',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 30,
            },
            // Animation libraries chunk (lazy loaded)
            animations: {
              name: 'animations',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](framer-motion|gsap)[\\/]/,
              priority: 25,
            },
            // Other vendor libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              maxSize: 150000, // Smaller chunks for mobile
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              chunks: 'all',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              maxSize: 100000, // Smaller common chunks
            },
          },
        },
      };

      // Add mobile-specific performance hints
      config.performance = {
        ...config.performance,
        maxAssetSize: 200000, // 200KB for mobile
        maxEntrypointSize: 300000, // 300KB for mobile
        hints: 'warning',
      };
    }

    return config;
  },

  // Modern browser targeting
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

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
  
  eslint: {
    ignoreDuringBuilds: true,
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
