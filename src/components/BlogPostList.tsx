import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogPostListProps {
  posts: BlogPost[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article 
          key={post.id} 
          className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-primary/50"
        >
          <Link href={`/blog/${post.slug}`} className="block group">
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(post.date).toISOString().split('T')[0]}</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
              {post.readTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}