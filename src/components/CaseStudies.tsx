'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'A Dubai fashion retailer stopped paying for wasted clicks.',
    client: 'Dubai fashion retailer',
    timeframe: '90-day engagement',
    description: 'We rebuilt the acquisition path around commercial intent, clearer product proof, and a checkout experience that did less work against the customer.',
    image: 'https://plus.unsplash.com/premium_photo-1726729310968-f322e3742418?w=1200&h=800&fit=crop',
    results: [
      { metric: 'Revenue', value: '+300%' },
      { metric: 'Conversion rate', value: '4.5% → 12.8%' },
      { metric: 'Paid media waste', value: '-50%' },
      { metric: 'Customer retention', value: '+78%' },
    ],
    technologies: ['Next.js', 'Stripe', 'AWS', 'Google Analytics'],
    testimonial: 'I stopped wasting money and started making it. The work changed how the whole business grew.',
    author: 'Fatima Al-Mansoori, CEO, Dubai Fashion House',
  },
  {
    id: 2,
    title: 'A SaaS platform turned a strong idea into regional demand.',
    client: 'Abu Dhabi SaaS company',
    timeframe: 'Product launch and scale',
    description: 'We built the product foundation and acquisition system together, giving a high-growth team the speed and visibility to move beyond its local market.',
    image: 'https://images.unsplash.com/photo-1651760464181-49092525ca3b?w=1200&h=800&fit=crop',
    results: [
      { metric: 'Users', value: '0 → 50,000+' },
      { metric: 'Uptime', value: '99.9%' },
      { metric: 'Response time', value: '<100ms' },
      { metric: 'Monthly revenue', value: '$250K+' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    testimonial: 'I did not just get a product. I got a partner who understood the business behind it.',
    author: 'Ahmed Al-Futtaim, CTO, MENA Cloud Solutions',
  },
  {
    id: 3,
    title: 'A fitness business rebuilt demand after the pandemic.',
    client: 'Abu Dhabi fitness centre',
    timeframe: 'Digital pivot and growth',
    description: 'We moved bookings and customer relationships into a digital model that gave the team a more resilient way to grow.',
    image: 'https://plus.unsplash.com/premium_photo-1712999654713-59018f76fe6d?w=1200&h=800&fit=crop',
    results: [
      { metric: 'Revenue', value: '+500%' },
      { metric: 'Online bookings', value: '0 → 2,000+/month' },
      { metric: 'Social growth', value: '+200%' },
      { metric: 'Customer LTV', value: '+300%' },
    ],
    technologies: ['React Native', 'Firebase', 'Stripe', 'Instagram API'],
    testimonial: 'They did not just save the business. They gave it a stronger way to operate.',
    author: 'Youssef Al-Haddad, Owner, Abu Dhabi Fitness',
  },
];

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0);
  const selectedStudy = caseStudies[selectedCase];

  return (
    <section id="case-studies" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Proof, with context</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">The work is measured in business movement.</h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-8 text-muted">Outcomes are only useful when you can see the client, the intervention, and the period behind the number.</p>
        </motion.div>

        <div className="mt-16 flex flex-col gap-2 border-b border-line sm:flex-row" role="tablist" aria-label="Case studies">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              id={`case-tab-${study.id}`}
              type="button"
              onClick={() => setSelectedCase(index)}
              aria-selected={selectedCase === index}
              aria-controls="case-study-panel"
              role="tab"
              tabIndex={selectedCase === index ? 0 : -1}
              className={`min-h-12 border-t-2 px-4 py-3 text-left text-sm transition-colors sm:flex-1 ${selectedCase === index ? 'border-primary text-foreground' : 'border-transparent text-muted hover:text-foreground'}`}
            >
              {study.client}
            </button>
          ))}
        </div>

        <motion.div
          key={selectedStudy.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          id="case-study-panel"
          role="tabpanel"
          aria-labelledby={`case-tab-${selectedStudy.id}`}
          tabIndex={0}
          className="grid gap-10 border-b border-line py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-line">
              <Image src={selectedStudy.image} alt={`${selectedStudy.client} project`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
              <span>{selectedStudy.client}</span>
              <span>{selectedStudy.timeframe}</span>
            </div>
          </div>

          <div>
            <h3 className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">{selectedStudy.title}</h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{selectedStudy.description}</p>

            <div className="mt-8 grid grid-cols-2 border-y border-line">
              {selectedStudy.results.map((result) => (
                <div key={result.metric} className="border-b border-line py-5 pr-4 odd:border-r even:pl-4 [&:nth-last-child(-n+2)]:border-b-0">
                  <p className="text-2xl font-bold tracking-[-0.04em] text-primary">{result.value}</p>
                  <p className="mt-1 text-sm text-muted">{result.metric}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
              {selectedStudy.technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>

            <blockquote className="mt-8 border-l-2 border-primary pl-5 text-lg leading-7 text-foreground">
              “{selectedStudy.testimonial}”
              <footer className="mt-3 text-sm text-muted">{selectedStudy.author}</footer>
            </blockquote>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-muted">Have a similar commercial problem? Bring the baseline, and we&apos;ll help map the next measurable move.</p>
          <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary self-start">
            Discuss a similar target
          </button>
        </div>
      </div>
    </section>
  );
}
