import Navigation from '@/components/Navigation';
import ThreeHero from '@/components/ThreeHero';
import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/components/Services'));
const Keywords = dynamic(() => import('@/components/Keywords'));
const DubaiDomination = dynamic(() => import('@/components/DubaiDomination'));
const ROICalculator = dynamic(() => import('@/components/ROICalculator'));
const CaseStudies = dynamic(() => import('@/components/CaseStudies'));
const Process = dynamic(() => import('@/components/Process'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));
const Footer = dynamic(() => import('@/components/Footer'));

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
    </main>
  );
}
