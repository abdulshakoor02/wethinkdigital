'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { faqData, type FAQItem } from '@/data/faq';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const toggleItem = (id: string) => {
    const next = new Set(openItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenItems(next);
  };

  return (
    <section id="faq" className="bg-background py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Before we start</p>
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">The useful questions, answered plainly.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">A good engagement starts with enough clarity to make the first decision without a hard sell.</p>
        </motion.div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {faqData.map((item, index) => {
            const isOpen = openItems.has(item.id);
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <button type="button" onClick={() => toggleItem(item.id)} className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-foreground hover:text-primary" aria-expanded={isOpen} aria-controls={`faq-answer-${item.id}`}>
                  <span>{item.question}</span>
                  <span className="font-mono text-xl font-normal text-primary" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div id={`faq-answer-${item.id}`} hidden={!isOpen}>
                  <p className="max-w-3xl pb-6 pr-10 leading-7 text-muted">{item.answer}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-b border-line pb-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">Still deciding where the friction is?</p>
          <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary self-start">Plan a growth audit</button>
        </div>
      </div>
    </section>
  );
}
