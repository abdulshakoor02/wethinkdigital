import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';
import BlogPostList from '@/components/BlogPostList';
import BlogHeader from '@/components/BlogHeader';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Blog | WeThinkDigital',
  description: 'Latest insights, tips, and news from WeThinkDigital about digital marketing, web development, and SEO strategies.',
  openGraph: {
    title: 'Blog | WeThinkDigital',
    description: 'Latest insights, tips, and news from WeThinkDigital about digital marketing, web development, and SEO strategies.',
    type: 'website',
    locale: 'en_US',
  },
};

// Mock blog posts data - in a real app, this would come from a CMS or database
const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'digital-marketing-trends-2025',
    title: 'Digital Marketing Trends to Watch in 2025',
    excerpt: 'Explore the latest digital marketing trends that will shape the industry in 2025 and beyond.',
    content: '',
    date: '2025-08-15',
    author: 'WeThinkDigital Team',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'seo-best-practices',
    title: 'SEO Best Practices for Modern Websites',
    excerpt: 'Learn the essential SEO techniques that will help your website rank higher in search results.',
    content: '',
    date: '2025-08-01',
    author: 'WeThinkDigital Team',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'web-development-frameworks',
    title: 'Choosing the Right Web Development Framework',
    excerpt: 'A comprehensive guide to selecting the best web development framework for your next project.',
    content: '',
    date: '2025-07-20',
    author: 'WeThinkDigital Team',
    readTime: '7 min read',
  },
  {
    id: '4',
    slug: 'best-seo-company-in-dubai',
    title: 'Best SEO Company in Dubai: Why WeThinkDigital is the #1 Choice for Businesses',
    excerpt: 'Discover why WeThinkDigital stands out as the best SEO company in Dubai for driving real business results and revenue growth.',
    content: '',
    date: '2025-08-20',
    author: 'WeThinkDigital Team',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'best-seo-services-in-dubai',
    title: 'Best SEO Services in Dubai: The 5 Services That Actually Drive Revenue',
    excerpt: 'Not all SEO services are created equal. Here are the 5 SEO services in Dubai that actually drive business results and revenue growth.',
    content: '',
    date: '2025-08-18',
    author: 'WeThinkDigital Team',
    readTime: '9 min read',
  },
  {
    id: '6',
    slug: 'crm-and-lead-management',
    title: 'CRM and Lead Management: The $2.3M Secret Your Dubai Business is Missing',
    excerpt: 'Discover how proper CRM and lead management can transform your Dubai business from struggling to scaling effortlessly.',
    content: '',
    date: '2025-08-15',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
  },
  {
    id: '7',
    slug: 'website-design-development-services-in-dubai',
    title: 'Website Design & Development Services in Dubai: Why Most Businesses Fail (And How to Succeed)',
    excerpt: 'Most website design services in Dubai miss the mark. Here\'s what separates winning websites from digital billboards.',
    content: '',
    date: '2025-08-12',
    author: 'WeThinkDigital Team',
    readTime: '12 min read',
  },
  {
    id: '8',
    slug: 'top-10-digital-marketing-company-in-dubai',
    title: 'Top 10 Digital Marketing Company in Dubai: Why Rankings Don\'t Matter (And What Does)',
    excerpt: 'Forget about "top 10" lists. Here\'s how to actually choose the best digital marketing company in Dubai for your business.',
    content: '',
    date: '2025-08-10',
    author: 'WeThinkDigital Team',
    readTime: '11 min read',
  },
  {
    id: '9',
    slug: 'top-5-digital-marketing-company-in-dubai',
    title: 'Top 5 Digital Marketing Company in Dubai: The Truth About Finding Your Perfect Partner',
    excerpt: 'Forget about arbitrary rankings. Here\'s how to identify the top digital marketing companies in Dubai that actually drive results.',
    content: '',
    date: '2025-08-08',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12">
        <Navigation />
        <BlogHeader />

        <BlogPostList posts={mockPosts} />
      </div>
    </div>
  );
}
