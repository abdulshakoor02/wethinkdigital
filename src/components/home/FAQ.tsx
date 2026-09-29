import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceFaq from '@/components/services/ServiceFaq';
import { faqData } from '@/data/faq';

/**
 * Home FAQ. FAQPage structured data for this list is emitted server-side on
 * the home page itself, so nothing is duplicated here.
 */
export default function FAQ() {
  return (
    <Section id="faq" bordered>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                How <span className="serif">we engage</span>
              </>
            }
            description="How projects are scoped, who owns the output, and what happens after launch."
          />
          <Link href="/contact" className="btn-secondary mt-9">
            Ask us something else
          </Link>
        </div>

        <ServiceFaq
          idPrefix="site-faq"
          items={faqData.map((item) => ({ question: item.question, answer: item.answer }))}
        />
      </div>
    </Section>
  );
}
