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
          className="rounded-xl p-6 transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(15px) saturate(120%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
          }}
        >
          <Link href={`/blog/${post.slug}`} className="block group">
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
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
