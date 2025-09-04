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

// Featured blog posts targeting SEO keywords
const featuredPosts: BlogPost[] = [
  {
    id: '4',
    slug: 'best-seo-company-in-dubai',
    title: 'Best SEO Company in Dubai: Why WeThinkDigital is the #1 Choice for Businesses',
    excerpt: 'Discover why WeThinkDigital stands out as the best SEO company in Dubai for driving real business results and revenue growth.',
    date: '2025-08-20',
    author: 'WeThinkDigital Team',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'best-seo-services-in-dubai',
    title: 'Best SEO Services in Dubai: The 5 Services That Actually Drive Revenue',
    excerpt: 'Not all SEO services are created equal. Here are the 5 SEO services in Dubai that actually drive business results and revenue growth.',
    date: '2025-08-18',
    author: 'WeThinkDigital Team',
    readTime: '9 min read',
  },
  {
    id: '8',
    slug: 'top-10-digital-marketing-company-in-dubai',
    title: 'Top 10 Digital Marketing Company in Dubai: Why Rankings Don\'t Matter (And What Does)',
    excerpt: 'Forget about "top 10" lists. Here\'s how to actually choose the best digital marketing company in Dubai for your business.',
    date: '2025-08-10',
    author: 'WeThinkDigital Team',
    readTime: '11 min read',
  },
  {
    id: '7',
    slug: 'website-design-development-services-in-dubai',
    title: 'Website Design & Development Services in Dubai: Why Most Businesses Fail (And How to Succeed)',
    excerpt: 'Most website design services in Dubai miss the mark. Here\'s what separates winning websites from digital billboards.',
    date: '2025-08-12',
    author: 'WeThinkDigital Team',
    readTime: '12 min read',
  },
];

export default function RecentBlogPosts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Latest Insights on SEO Services in Dubai</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay ahead of the competition with expert insights from Dubai's leading digital marketing company. 
            Learn how the best SEO services in Dubai can transform your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-primary/50 group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-lg transition-colors"
          >
            View All Blog Posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
      
      {/* JSON-LD for Blog Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "WeThinkDigital SEO & Digital Marketing Blog",
            "description": "Expert insights on SEO services in Dubai, digital marketing strategies, and business growth tips from Dubai's leading digital marketing company.",
            "url": "https://www.wethinkdigital.solutions/blog",
            "publisher": {
              "@type": "Organization",
              "name": "WeThinkDigital",
              "url": "https://www.wethinkdigital.solutions"
            },
            "blogPost": featuredPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://www.wethinkdigital.solutions/blog/${post.slug}`,
              "datePublished": new Date(post.date).toISOString(),
              "author": {
                "@type": "Organization",
                "name": post.author
              }
            }))
          })
        }}
      />
    </section>
  );
}
