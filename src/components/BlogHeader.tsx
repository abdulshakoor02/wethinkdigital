import React from 'react';
import Link from 'next/link';

export default function BlogHeader() {
  return (
    <div className="text-center mb-12">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
        }}
      >
        <Link href="/blog" className="inline-block mb-4">
          <h1 className="text-4xl font-bold mb-2 transition-colors"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            WeThinkDigital Blog
          </h1>
        </Link>
        <p className="text-xl text-gray-300">
          Insights, tips, and news from our digital experts
        </p>
      </div>
    </div>
  );
}