import ThreeHero from '@/components/ThreeHero';
import Navigation from '@/components/Navigation';
import Services from '@/components/Services';
import ROICalculator from '@/components/ROICalculator';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <ThreeHero />
      <Services />
      <ROICalculator />
      <CaseStudies />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
