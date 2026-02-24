import React from 'react';
import Link from 'next/link';

export default function BlogHeader() {
  return (
    <div className="text-center mb-12">
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-[#18191a] to-pink-50 rounded-3xl border border-gray-800 shadow-sm">
        <Link href="/blog" className="inline-block mb-4">
          <h1 className="text-4xl font-bold mb-2 transition-colors"
            style={{
              background: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 25%, #c026d3 50%, #d946ef 75%, #7c3aed 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            WeThinkDigital Blog
          </h1>
        </Link>
        <p className="text-xl text-gray-200">
          Insights, tips, and news from our digital experts
        </p>
      </div>
    </div>
  );
}
