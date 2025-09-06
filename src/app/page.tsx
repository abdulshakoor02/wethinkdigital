import React from 'react';
import VideoHero from '@/components/VideoHero';
import LazySection from '@/components/LazySection';
import dynamic from 'next/dynamic';

export const dynamicParams = false;
export const revalidate = 3600;

// Mobile-optimized lazy loading with intersection observer
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

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-80 bg-gray-900/20 animate-pulse rounded-lg" />
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const LatestNews = dynamic(() => import('@/components/LatestNews'), {
  loading: () => <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32 bg-gray-900/20 animate-pulse" />
});

export default function Home() {
  return (
    <main className="bg-background">
      <VideoHero />
      
      <LazySection 
        rootMargin="200px" 
        fallback={<div className="h-64 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <Keywords />
      </LazySection>
      
      <LazySection 
        rootMargin="200px"
        fallback={<div className="h-96 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <Services />
      </LazySection>
      
      <LazySection 
        rootMargin="150px"
        fallback={<div className="h-80 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <DubaiDomination />
      </LazySection>
      
      <LazySection 
        rootMargin="150px"
        fallback={<div className="h-96 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <ROICalculator />
      </LazySection>
      
      <LazySection 
        rootMargin="100px"
        fallback={<div className="h-80 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <FAQ />
      </LazySection>
      
      <LazySection 
        rootMargin="100px"
        fallback={<div className="h-80 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <CaseStudies />
      </LazySection>
      
      <LazySection 
        rootMargin="100px"
        fallback={<div className="h-96 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <Process />
      </LazySection>
      
      <LazySection
        rootMargin="100px"
        fallback={<div className="h-96 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <LatestNews />
      </LazySection>
      
      <LazySection 
        rootMargin="50px"
        fallback={<div className="h-96 bg-gray-900/10 animate-pulse rounded-lg" />}
      >
        <ContactForm />
      </LazySection>
      
      <LazySection 
        rootMargin="0px"
        fallback={<div className="h-32 bg-gray-900/10 animate-pulse" />}
      >
        <Footer />
      </LazySection>
      
      <noscript>
        <style>{`.animate-spin{animation:none}`}</style>
      </noscript>
    </main>
  );
}
