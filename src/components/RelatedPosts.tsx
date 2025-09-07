'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  currentPostKeywords?: string[];
}

// All blog posts data
const allPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'digital-marketing-trends-2025',
    title: 'Digital Marketing Trends to Watch in 2025',
    excerpt: 'Explore the latest digital marketing trends that will shape the industry in 2025 and beyond.',
    date: '2025-08-15',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'seo-best-practices',
    title: 'SEO Best Practices for Modern Websites',
    excerpt: 'Learn the essential SEO techniques that will help your website rank higher in search results.',
    date: '2025-08-01',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'web-development-frameworks',
    title: 'Choosing the Right Web Development Framework',
    excerpt: 'A comprehensive guide to selecting the best web development framework for your next project.',
    date: '2025-07-20',
    readTime: '7 min read',
  },
  {
    id: '4',
    slug: 'best-seo-company-in-dubai',
    title: 'Best SEO Company in Dubai: Why WeThinkDigital is the #1 Choice for Businesses',
    excerpt: 'Discover why WeThinkDigital stands out as the best SEO company in Dubai for driving real business results and revenue growth.',
    date: '2025-08-20',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'best-seo-services-in-dubai',
    title: 'Best SEO Services in Dubai: The 5 Services That Actually Drive Revenue',
    excerpt: 'Not all SEO services are created equal. Here are the 5 SEO services in Dubai that actually drive business results and revenue growth.',
    date: '2025-08-18',
    readTime: '9 min read',
  },
  {
    id: '6',
    slug: 'crm-and-lead-management',
    title: 'CRM and Lead Management: The $2.3M Secret Your Dubai Business is Missing',
    excerpt: 'Discover how proper CRM and lead management can transform your Dubai business from struggling to scaling effortlessly.',
    date: '2025-08-15',
    readTime: '10 min read',
  },
  {
    id: '7',
    slug: 'website-design-development-services-in-dubai',
    title: 'Website Design & Development Services in Dubai: Why Most Businesses Fail (And How to Succeed)',
    excerpt: 'Most website design services in Dubai miss the mark. Here\'s what separates winning websites from digital billboards.',
    date: '2025-08-12',
    readTime: '12 min read',
  },
  {
    id: '8',
    slug: 'top-10-digital-marketing-company-in-dubai',
    title: 'Top 10 Digital Marketing Company in Dubai: Why Rankings Don\'t Matter (And What Does)',
    excerpt: 'Forget about "top 10" lists. Here\'s how to actually choose the best digital marketing company in Dubai for your business.',
    date: '2025-08-10',
    readTime: '11 min read',
  },
  {
    id: '9',
    slug: 'top-5-digital-marketing-company-in-dubai',
    title: 'Top 5 Digital Marketing Company in Dubai: The Truth About Finding Your Perfect Partner',
    excerpt: 'Forget about arbitrary rankings. Here\'s how to identify the top digital marketing companies in Dubai that actually drive results.',
    date: '2025-08-08',
    readTime: '10 min read',
  },
];

// Define keyword relationships for better matching
const postKeywords: Record<string, string[]> = {
  '1': ['digital marketing', 'trends', 'marketing'],
  '2': ['seo', 'best practices', 'optimization'],
  '3': ['web development', 'frameworks', 'development'],
  '4': ['seo company dubai', 'best seo', 'dubai', 'seo services'],
  '5': ['seo services dubai', 'dubai seo', 'seo', 'revenue'],
  '6': ['crm', 'lead management', 'dubai business'],
  '7': ['website design dubai', 'development services', 'dubai'],
  '8': ['digital marketing company dubai', 'top companies', 'dubai'],
  '9': ['digital marketing dubai', 'top companies', 'dubai'],
};

export default function RelatedPosts({ currentPostId, currentPostKeywords = [] }: RelatedPostsProps) {
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.id !== currentPostId);
  
  // Score posts based on keyword matching
  const scoredPosts = otherPosts.map(post => {
    const postKeywordList = postKeywords[post.id] || [];
    const currentKeywordList = postKeywords[currentPostId] || currentPostKeywords;
    
    // Calculate similarity score
    let score = 0;
    
    // Check for keyword matches
    currentKeywordList.forEach(keyword => {
      postKeywordList.forEach(postKeyword => {
        if (keyword.toLowerCase().includes(postKeyword.toLowerCase()) || 
            postKeyword.toLowerCase().includes(keyword.toLowerCase())) {
          score += 1;
        }
      });
    });
    
    // Boost score for Dubai-related posts when current post is Dubai-related
    const isDubaiPost = currentKeywordList.some(k => k.toLowerCase().includes('dubai'));
    const isRelatedDubaiPost = postKeywordList.some(k => k.toLowerCase().includes('dubai'));
    if (isDubaiPost && isRelatedDubaiPost) {
      score += 2;
    }
    
    // Boost score for SEO-related posts when current post is SEO-related
    const isSeoPost = currentKeywordList.some(k => k.toLowerCase().includes('seo'));
    const isRelatedSeoPost = postKeywordList.some(k => k.toLowerCase().includes('seo'));
    if (isSeoPost && isRelatedSeoPost) {
      score += 2;
    }
    
    return { ...post, score };
  });
  
  // Sort by score and recency, then take top 3
  const relatedPosts = scoredPosts
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  // If no related posts found, show most recent posts
  if (relatedPosts.length === 0 || relatedPosts.every(post => post.score === 0)) {
    return null;
  }

  return (
    <section className="py-16 relative overflow-hidden border-t border-white/10"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
    >
      {/* Glassmorphism Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-800/15 to-fuchsia-900/20" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Related Articles
          </h2>
          <p className="text-gray-400">
            Continue learning about SEO services in Dubai and digital marketing strategies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg p-6 transition-colors group"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center text-purple-300 text-sm font-medium mt-4 group-hover:text-purple-200 transition-colors">
                  <span>Read Article</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            View All Articles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
