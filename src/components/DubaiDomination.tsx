'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#18191a]"
      style={{
        background: `
          radial-gradient(circle at 30% 80%, rgba(209, 213, 219, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(156, 163, 175, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(209, 213, 219, 0.06) 0%, transparent 50%)
        `
      }}
    >
      {/* Glassmorphism Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18191a]/30 via-gray-50/20 to-[#18191a]/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-[#1e1e20] border border-gray-300 shadow-lg"
            style={{
              backdropFilter: 'blur(20px) saturate(150%)'
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
              I&apos;m Not Just in the Business of Digital Marketing. I&apos;m in the Business of Dubai Domination.
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              I don&apos;t play small. I don&apos;t aim for incremental improvements. I go for the jugular. While other agencies are fighting for scraps, I&apos;m rewriting the rules of the game in the UAE.
            </p>
          </div>
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
            className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl"
          >
            Let&apos;s Talk About How I Can Make You More Money
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
