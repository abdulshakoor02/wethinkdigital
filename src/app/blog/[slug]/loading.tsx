import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700/50 animate-pulse">
          {/* Back link skeleton */}
          <div className="h-6 w-24 bg-gray-700 rounded mb-6"></div>
          
          {/* Title skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-10 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-3/6"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}