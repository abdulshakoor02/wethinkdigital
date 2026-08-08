import VideoHero from '@/components/VideoHero';
import LazySection from '@/components/LazySection';
import dynamic from 'next/dynamic';

export const dynamicParams = false;
export const revalidate = 3600;

const CaseStudies = dynamic(() => import('@/components/CaseStudies'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const Keywords = dynamic(() => import('@/components/Keywords'), {
  loading: () => <div className="h-64 border-y border-line bg-background-muted" />,
});

const DubaiDomination = dynamic(() => import('@/components/DubaiDomination'), {
  loading: () => <div className="h-80 border-y border-line bg-background-muted" />,
});

const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-80 border-y border-line bg-background-muted" />,
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const RecentBlogPosts = dynamic(() => import('@/components/RecentBlogPosts'), {
  loading: () => <div className="h-96 border-y border-line bg-background-muted" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32 border-t border-line bg-background-muted" />,
});

export default function Home() {
  return (
    <main className="bg-background">
      <VideoHero />

      <LazySection rootMargin="250px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <CaseStudies />
      </LazySection>

      <LazySection rootMargin="200px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <Services />
      </LazySection>

      <LazySection rootMargin="200px" fallback={<div className="h-64 border-y border-line bg-background-muted" />}>
        <Keywords />
      </LazySection>

      <LazySection rootMargin="150px" fallback={<div className="h-80 border-y border-line bg-background-muted" />}>
        <DubaiDomination />
      </LazySection>

      <LazySection rootMargin="150px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <ROICalculator />
      </LazySection>

      <LazySection rootMargin="100px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <Process />
      </LazySection>

      <LazySection rootMargin="100px" fallback={<div className="h-80 border-y border-line bg-background-muted" />}>
        <FAQ />
      </LazySection>

      <LazySection rootMargin="100px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <RecentBlogPosts />
      </LazySection>

      <LazySection rootMargin="50px" fallback={<div className="h-96 border-y border-line bg-background-muted" />}>
        <ContactForm />
      </LazySection>

      <LazySection rootMargin="0px" fallback={<div className="h-32 border-t border-line bg-background-muted" />}>
        <Footer />
      </LazySection>
    </main>
  );
}
