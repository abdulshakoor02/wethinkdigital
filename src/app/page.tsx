import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import LazySection from '@/components/LazySection';
import JsonLd from '@/components/JsonLd';
import ServicesOverview from '@/components/home/ServicesOverview';
import ProductsShowcase from '@/components/home/ProductsShowcase';
import Capabilities from '@/components/home/Capabilities';
import Process from '@/components/home/Process';
import TechStack from '@/components/home/TechStack';
import FAQ from '@/components/home/FAQ';
import RecentPosts from '@/components/home/RecentPosts';
import Footer from '@/components/Footer';
import { faqData } from '@/data/faq';

export const revalidate = 3600;

/**
 * ContactForm is the only heavy client component on this page, so it is the
 * only one worth code-splitting. No `ssr: false` anywhere — every section must
 * be present in the server-rendered HTML for crawlers.
 */
const ContactForm = dynamic(() => import('@/components/ContactForm'));

export default function Home() {
  return (
    <main id="main" className="bg-background">
      {/* Server-rendered FAQ schema — raw ld+json so non-JS crawlers see it */}
      <JsonLd
        id="json-ld-faq-server"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      <Hero />

      <LazySection intrinsicHeight="40rem">
        <ServicesOverview />
      </LazySection>

      <LazySection intrinsicHeight="42rem">
        <ProductsShowcase />
      </LazySection>

      <LazySection intrinsicHeight="36rem">
        <Capabilities />
      </LazySection>

      <LazySection intrinsicHeight="38rem">
        <Process />
      </LazySection>

      <LazySection intrinsicHeight="26rem">
        <TechStack />
      </LazySection>

      <LazySection intrinsicHeight="36rem">
        <FAQ />
      </LazySection>

      <LazySection intrinsicHeight="30rem">
        <RecentPosts />
      </LazySection>

      <LazySection intrinsicHeight="44rem">
        <ContactForm />
      </LazySection>

      <LazySection intrinsicHeight="26rem">
        <Footer />
      </LazySection>
    </main>
  );
}
