'use client';

import { ReactNode, memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

const LazySection = memo(function LazySection({
  children,
  fallback,
  className = '',
  rootMargin = '100px',
  threshold = 0.1,
}: LazySectionProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? children : (fallback || (
        <div className="h-96 bg-gray-900/10 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ))}
    </div>
  );
});

export default LazySection;