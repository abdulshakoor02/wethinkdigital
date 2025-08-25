import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import ThreeHero from '@/components/ThreeHero';
import dynamic from 'next/dynamic';

export const dynamicParams = false;
export const revalidate = 3600;

// Lazy load non-critical components with loading states
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const Keywords = dynamic(() => import('@/components/Keywords'), {
  loading: () => <div className="h-64 bg-gray-900/20 animate-pulse rounded-lg" />
});

const DubaiDomination = dynamic(() => import('@/components/DubaiDomination'), {
  loading: () => <div className="h-80 bg-gray-900/20 animate-pulse rounded-lg" />
});

const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const CaseStudies = dynamic(() => import('@/components/CaseStudies'), {
  loading: () => <div className="h-80 bg-gray-900/20 animate-pulse rounded-lg" />
});

const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32 bg-gray-900/20 animate-pulse" />
});

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <ThreeHero />
      
      <Suspense fallback={<div className="h-64 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <Keywords />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="h-80 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <DubaiDomination />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <ROICalculator />
      </Suspense>
      
      <Suspense fallback={<div className="h-80 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <CaseStudies />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <Process />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />}>
        <ContactForm />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 bg-gray-900/20 animate-pulse" />}>
        <Footer />
      </Suspense>
      
      <noscript>
        <style>{`.animate-spin{animation:none}`}</style>
      </noscript>
    </main>
  );
}
