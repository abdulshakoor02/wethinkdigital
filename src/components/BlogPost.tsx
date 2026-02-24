import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-[#1e1e20] rounded-xl p-6 md:p-8 border border-gray-800 shadow-sm">
      <Link
        href="/blog"
        className="inline-flex items-center mb-6 transition-colors text-gray-400 hover:text-gray-200 font-medium"
      >
        ← Back to Blog
      </Link>
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>{new Date(post.date).toISOString().split('T')[0]}</time>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
      </header>
      
      <div 
        className="prose prose-lg max-w-none text-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
