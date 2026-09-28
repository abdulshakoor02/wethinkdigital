import type { ReactNode } from 'react';
import Footer from '@/components/Footer';

/** Shared chrome for every /services route. */
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main id="main" className="bg-background">
        {children}
      </main>
      <Footer />
    </>
  );
}
