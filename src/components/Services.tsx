'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    number: '01',
    title: 'Revenue-ready websites',
    description: 'Conversion-focused websites that make your offer easy to understand, trust, and act on.',
    features: ['Technical foundation', 'Conversion journeys', 'Measurement setup'],
  },
  {
    number: '02',
    title: 'Search visibility',
    description: 'SEO that connects high-intent searches in Dubai with the pages and proof that close the gap.',
    features: ['Commercial keyword strategy', 'Local search systems', 'Content with a job'],
  },
  {
    number: '03',
    title: 'E-commerce growth',
    description: 'A clearer path from product discovery to checkout for stores that need more from every visit.',
    features: ['Storefront performance', 'Checkout improvements', 'Retention loops'],
  },
  {
    number: '04',
    title: 'Automation and CRM',
    description: 'Connected systems that stop qualified leads disappearing between marketing and sales.',
    features: ['Lead routing', 'CRM integrations', 'Actionable reporting'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="border-y border-line bg-background py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">What we build</p>
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">
            One acquisition system, not a pile of disconnected services.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            We focus the work around the commercial moment: the right person finds you, understands the value, and takes the next step.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="surface self-start p-7 sm:p-9"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Lead offer</p>
            <h3 className="mt-7 text-3xl font-bold tracking-[-0.04em] text-foreground">Revenue-ready websites</h3>
            <p className="mt-5 text-base leading-7 text-muted">
              Your website should make the next decision easier. We turn scattered pages into a focused path from search intent to qualified enquiry.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {['Technical foundation', 'Conversion journeys', 'Measurement setup'].map((feature) => (
                <li key={feature} className="py-4 text-sm text-foreground">
                  <span className="mr-3 text-primary" aria-hidden="true">↳</span>{feature}
                </li>
              ))}
            </ul>
          </motion.article>

          <div className="divide-y divide-line border-y border-line">
            {services.slice(1).map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                className="grid gap-5 py-7 sm:grid-cols-[72px_1fr]"
              >
                <p className="font-mono text-sm text-primary">{service.number}</p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{service.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
                    {service.features.map((feature) => <span key={feature}>{feature}</span>)}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
