'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section id="approach" className="border-y border-line bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.24em] text-primary"
        >
          Local context, commercial standards
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">Dubai is competitive. Your growth system should be sharper than your competitors&apos; claims.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">We pair local market fluency with the discipline to show the work: what changed, why it changed, and what moved afterwards.</p>
        </motion.div>
      </div>
    </section>
  );
}
