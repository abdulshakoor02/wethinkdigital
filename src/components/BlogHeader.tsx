import React from 'react';
import Link from 'next/link';

export default function BlogHeader() {
  return (
    <div className="text-center mb-12">
      <Link href="/blog" className="inline-block mb-4">
        <h1 className="text-4xl font-bold text-white mb-2 hover:text-primary transition-colors">
          WeThinkDigital Blog
        </h1>
      </Link>
      <p className="text-xl text-gray-300">
        Insights, tips, and news from our digital experts
      </p>
    </div>
  );
}