import { Metadata } from 'next';
import BlogPostList from '@/components/BlogPostList';
import BlogHeader from '@/components/BlogHeader';
import { blogPosts } from '@/data/posts';

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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <BlogHeader />
        <BlogPostList posts={blogPosts} />
      </div>
    </main>
  );
}
