import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import BlogPostComponent from '@/components/BlogPost';
import RelatedPosts from '@/components/RelatedPosts';
import Navigation from '@/components/Navigation';
import { getPostBySlug } from '@/data/posts';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const cleanDescription = post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${post.title} | WeThinkDigital Blog`,
    description: cleanDescription,
    keywords: `${post.slug.split('-').join(', ')}, seo services dubai, digital marketing dubai, wethinkdigital`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: cleanDescription,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      url: `https://www.wethinkdigital.solutions/blog/${resolvedParams.slug}`,
      siteName: 'WeThinkDigital',
      locale: 'en_US',
      images: [
        {
          url: 'https://www.wethinkdigital.solutions/wethinkdigital.ico',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: cleanDescription,
      images: ['https://www.wethinkdigital.solutions/wethinkdigital.ico'],
    },
    alternates: {
      canonical: `https://www.wethinkdigital.solutions/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The requested blog post could not be found.</p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const cleanDescription = post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return (
    <div className="min-h-screen bg-background">
      {/* Article schema for rich results */}
      <Script
        id="json-ld-article"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: cleanDescription,
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(),
            author: {
              '@type': 'Organization',
              name: post.author,
              url: 'https://www.wethinkdigital.solutions',
            },
            publisher: {
              '@type': 'Organization',
              name: 'WeThinkDigital',
              url: 'https://www.wethinkdigital.solutions',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.wethinkdigital.solutions/wethinkdigital.ico',
              },
            },
            mainEntityOfPage: `https://www.wethinkdigital.solutions/blog/${post.slug}`,
            image: 'https://www.wethinkdigital.solutions/wethinkdigital.ico',
            url: `https://www.wethinkdigital.solutions/blog/${post.slug}`,
          }),
        }}
      />
      <div className="max-w-3xl mx-auto py-12">
        <Navigation />
        <BlogPostComponent post={post} />

        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex justify-between">
            <Link
              href="/blog"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      <RelatedPosts currentPostId={post.id} />
    </div>
  );
}
