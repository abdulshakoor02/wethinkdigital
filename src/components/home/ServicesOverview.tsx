import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/services/ServiceCard';
import { services } from '@/data/services';

/** Home section: the four services, with AI Automation leading. */
export default function ServicesOverview() {
  const [lead, ...rest] = services;

  return (
    <Section id="services" bordered>
      <SectionHeading
        eyebrow="Services"
        title="Four things, done properly"
        description="We take on work where the hard part is technical. No channels, no retainers for activity — engineering with an outcome attached."
      />

      <div className="mt-14 space-y-5">
        <ServiceCard service={lead} index={1} featured headingLevel="h3" />

        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index + 2}
              headingLevel="h3"
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Link href="/services" className="btn-secondary">
          Compare all four services
        </Link>
      </div>
    </Section>
  );
}
