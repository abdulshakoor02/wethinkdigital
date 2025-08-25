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

      // SWC minification is enabled by default in Next.js 15
      
      // Split chunks more aggressively
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for heavy libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            // Three.js specific chunk
            three: {
              name: 'three',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 30,
            },
            // Animation libraries chunk
            animations: {
              name: 'animations',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](framer-motion|gsap)[\\/]/,
              priority: 25,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              chunks: 'all',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
