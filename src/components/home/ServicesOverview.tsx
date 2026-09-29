import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/services/ServiceCard';
import { services } from '@/data/services';

/**
 * Home section: the four services as an asymmetric bento grid. The lead service
 * takes the wide cell, the remaining three fill the ragged half of the grid.
 */
export default function ServicesOverview() {
  const [lead, ...rest] = services;

  return (
    <Section id="services" bordered>
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Four things, <span className="serif">done properly</span>
          </>
        }
        description="We take on work where the hard part is technical. No channels, no retainers for activity — engineering with an outcome attached."
      />

      <div className="mt-14 grid gap-3.5 md:grid-cols-2 lg:grid-cols-6">
        <ServiceCard
          service={lead}
          index={1}
          featured
          headingLevel="h3"
          className="md:col-span-2 lg:col-span-4"
        />

        {rest.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index + 2}
            headingLevel="h3"
            className={
              index === 0 ? 'lg:col-span-2' : index === 1 ? 'lg:col-span-3' : 'md:col-span-2 lg:col-span-3'
            }
          />
        ))}
      </div>

      <div className="mt-10">
        <Link href="/services" className="btn-secondary">
          Compare all four services
        </Link>
      </div>
    </Section>
  );
}
