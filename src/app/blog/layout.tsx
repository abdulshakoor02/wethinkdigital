import type { ReactNode } from 'react';

/** Blog shell. The root layout already renders the nav, footer and skip link. */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
