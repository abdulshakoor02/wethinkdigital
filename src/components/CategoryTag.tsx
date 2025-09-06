'use client';

import React from 'react';
import { BlogCategory } from '@/types/blog';

interface CategoryTagProps {
  category: 'Taxsaving' | 'Wealth' | 'Business' | 'Market Trends' | 'Investment';
  size?: 'sm' | 'md';
  className?: string;
}

const categoryConfig: Record<string, BlogCategory> = {
  'Taxsaving': {
    name: 'Taxsaving',
    color: 'text-emerald-100',
    bgColor: 'bg-emerald-600/80'
  },
  'Wealth': {
    name: 'Wealth',
    color: 'text-blue-100',
    bgColor: 'bg-blue-600/80'
  },
  'Business': {
    name: 'Business',
    color: 'text-purple-100',
    bgColor: 'bg-purple-600/80'
  },
  'Market Trends': {
    name: 'Market Trends',
    color: 'text-orange-100',
    bgColor: 'bg-orange-600/80'
  },
  'Investment': {
    name: 'Investment',
    color: 'text-rose-100',
    bgColor: 'bg-rose-600/80'
  }
};

export default function CategoryTag({ category, size = 'md', className = '' }: CategoryTagProps) {
  const config = categoryConfig[category];
  
  if (!config) return null;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        backdrop-blur-sm border border-white/20
        ${config.bgColor} ${config.color}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {config.name}
    </span>
  );
}

export { categoryConfig };