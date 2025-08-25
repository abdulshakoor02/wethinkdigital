import Navigation from '@/components/Navigation';
import ThreeHero from '@/components/ThreeHero';
import dynamicImport from 'next/dynamic';
export const dynamic = 'force-static';
export const revalidate = 3600;

const Services = dynamicImport(() => import('@/components/Services'));
const Keywords = dynamicImport(() => import('@/components/Keywords'));
const DubaiDomination = dynamicImport(() => import('@/components/DubaiDomination'));
const ROICalculator = dynamicImport(() => import('@/components/ROICalculator'));
const CaseStudies = dynamicImport(() => import('@/components/CaseStudies'));
const Process = dynamicImport(() => import('@/components/Process'));
const ContactForm = dynamicImport(() => import('@/components/ContactForm'));
const Footer = dynamicImport(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <ThreeHero />
      <Keywords />
      <Services />
      <DubaiDomination />
      <ROICalculator />
      <CaseStudies />
      <Process />
      <ContactForm />
      <Footer />
      <noscript>
        <style>{`.animate-spin{animation:none}`}</style>
      </noscript>
    </main>
  );
}
