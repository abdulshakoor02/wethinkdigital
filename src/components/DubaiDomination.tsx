'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">I&apos;m Not Just in the Business of Digital Marketing. I&apos;m in the Business of Dubai Domination.</span>
          </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            I don&apos;t play small. I don&apos;t aim for incremental improvements. I go for the jugular. While other agencies are fighting for scraps, I&apos;m rewriting the rules of the game in the UAE.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg"
          >
            Let&apos;s Talk About How I Can Make You More Money
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
