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
        <div className="flex h-96 items-center justify-center border-y border-line bg-background-muted" aria-label="Loading section">
          <div className="h-6 w-6 animate-spin border-2 border-primary border-t-transparent" />
        </div>
      ))}
    </div>
  );
});

export default LazySection;
