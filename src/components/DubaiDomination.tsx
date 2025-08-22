'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">I'm Here to Help You Dominate the Dubai Market</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I don't play games. I get results. If you want to be the best, you have to work with the best. I am the best digital marketing company in Dubai, and I have the track record to prove it. I'm not interested in being your vendor; I want to be your partner in world domination.
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
            Let's Talk About How I Can Make You More Money
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
