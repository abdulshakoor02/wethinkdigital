'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const primaryKeywords = [
  'Digital marketing',
  'Business growth',
  'Website design and development',
  'Search engine optimization',
  'Social media marketing',
  'Lead generation',
  'CRM integration',
  'Conversion rate optimization',
  'Marketing automation',
  'Performance marketing',
];

const approach = [
  {
    number: '01',
    title: 'Map the commercial journey',
    description: 'We identify the questions, friction, and handoffs between first search and signed deal.',
  },
  {
    number: '02',
    title: 'Build the high-intent path',
    description: 'We connect the page, message, proof, and offer so every important visit has a clear next step.',
  },
  {
    number: '03',
    title: 'Measure what compounds',
    description: 'We keep the work close to revenue, learning from qualified enquiries rather than vanity metrics.',
  },
];

export default function Keywords() {
  const [showAll, setShowAll] = useState(false);
  const visibleKeywords = showAll ? primaryKeywords : primaryKeywords.slice(0, 6);

  return (
    <section id="strategy" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">How the work moves</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">
              Clarity first. Momentum second.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              The best digital work is not louder. It removes the uncertainty between a customer&apos;s intent and your team&apos;s response.
            </p>
          </motion.div>

          <div className="divide-y divide-line border-y border-line">
            {approach.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid gap-5 py-7 sm:grid-cols-[72px_1fr]"
              >
                <p className="font-mono text-sm text-primary">{item.number}</p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Specialisms</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">The channels and systems we bring together when the commercial problem calls for them.</p>
            </div>
            {!showAll && (
              <button type="button" onClick={() => setShowAll(true)} className="btn-secondary shrink-0 self-start px-5 py-2 text-sm">
                Show all specialisms
              </button>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base text-foreground">
            {visibleKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
