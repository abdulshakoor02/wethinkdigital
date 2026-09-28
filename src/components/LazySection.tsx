import type { CSSProperties, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  /**
   * Approximate rendered height, e.g. "36rem". Drives `contain-intrinsic-size`
   * so the scrollbar and anchor offsets stay stable before the section paints.
   */
  intrinsicHeight?: string;
}

/**
 * Defers *rendering work* for below-the-fold sections without deferring the
 * *markup*.
 *
 * The previous implementation gated children behind an IntersectionObserver,
 * which meant the server-rendered HTML contained only a grey placeholder — any
 * crawler that does not execute JavaScript (and every AI answer engine that
 * reads raw HTML) saw an empty page. `content-visibility: auto` gets the same
 * paint/layout savings from the browser while keeping the real content in the
 * HTML for both crawlers and the accessibility tree.
 */
export default function LazySection({
  children,
  className = '',
  intrinsicHeight = '40rem',
}: LazySectionProps) {
  const style: CSSProperties = {
    contentVisibility: 'auto',
    containIntrinsicSize: `auto ${intrinsicHeight}`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
