'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section id="team" className="py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
          linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 100%)
        `
      }}
    >
      {/* Glassmorphism Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-violet-50/20 to-fuchsia-50/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.9) inset'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              I&apos;m Not Just in the Business of Digital Marketing. I&apos;m in the Business of Dubai Domination.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
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
            className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
            }}
          >
            Let&apos;s Talk About How I Can Make You More Money
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
