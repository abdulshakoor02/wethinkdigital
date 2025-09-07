'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import CategoryTag from './CategoryTag';
import { BlogPost } from '@/types/blog';

// Enhanced blog posts with images and categories for the Latest News section
const latestNewsPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'tax-saving-strategies-small-businesses',
    title: 'Tax-saving strategies for small businesses',
    excerpt: 'Discover practical tips to maximize tax savings for your small business and boost profitability.',
    date: '2025-07-29',
    author: 'WeThinkDigital Team',
    readTime: '8 min read',
    category: 'Taxsaving',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    featured: true,
    content: ''
  },
  {
    id: '2',
    slug: 'building-wealth-smart-strategies',
    title: 'Building Wealth: Smart Strategies for a Shifting Economy',
    excerpt: 'Learn how to build and preserve wealth in today\'s dynamic economic environment.',
    date: '2025-01-02',
    author: 'WeThinkDigital Team',
    readTime: '6 min read',
    category: 'Wealth',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    content: ''
  },
  {
    id: '3',
    slug: 'teams-driving-financial-innovation',
    title: 'Shaping Tomorrow: How Teams Are Driving Financial Innovation',
    excerpt: 'Explore how collaborative teams are revolutionizing the financial industry.',
    date: '2024-12-30',
    author: 'WeThinkDigital Team',
    readTime: '7 min read',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    content: ''
  },
  {
    id: '4',
    slug: 'data-driven-economic-decisions',
    title: 'Data-Driven Decisions: Understanding Today\'s Economic Signals',
    excerpt: 'Learn to interpret key economic indicators for better business decisions.',
    date: '2025-06-02',
    author: 'WeThinkDigital Team',
    readTime: '9 min read',
    category: 'Market Trends',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    content: ''
  },
  {
    id: '5',
    slug: 'decoding-finance-market-trends',
    title: 'Decoding Finance: Key Market Trends Every Leader Should Know',
    excerpt: 'Stay ahead with insights into the most important market trends shaping finance.',
    date: '2025-05-30',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content: ''
  }
];

export default function LatestNews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featuredPost = latestNewsPosts.find(post => post.featured);
  const regularPosts = latestNewsPosts.filter(post => !post.featured);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-start mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest news
            </h2>
            <p className="text-lg text-gray-300">
              Stay informed! Explore our latest updates on tax laws, economic insights, and industry trends.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(15px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
              }}
            >
              View all blogs
            </Link>
          </motion.div>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Card - Large */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-1 lg:row-span-2 group cursor-pointer"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(15px) saturate(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
                  }}
                >
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={featuredPost.image || ''}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    
                    {featuredPost.category && (
                      <div className="absolute top-4 left-4">
                        <CategoryTag category={featuredPost.category} />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 transition-colors"
                      style={{
                        color: 'white'
                      }}
                    >
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Regular Cards Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(15px) saturate(120%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || ''}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <CategoryTag category={post.category} size="sm" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="md:hidden text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            View all blogs
          </Link>
        </motion.div>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "WeThinkDigital Latest News",
            "description": "Stay informed with our latest updates on tax laws, economic insights, and industry trends.",
            "url": "https://www.wethinkdigital.solutions/blog",
            "publisher": {
              "@type": "Organization",
              "name": "WeThinkDigital",
              "url": "https://www.wethinkdigital.solutions"
            },
            "blogPost": latestNewsPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://www.wethinkdigital.solutions/blog/${post.slug}`,
              "datePublished": new Date(post.date).toISOString(),
              "author": {
                "@type": "Organization",
                "name": post.author
              },
              "image": post.image
            }))
          })
        }}
      />
    </section>
  );
}