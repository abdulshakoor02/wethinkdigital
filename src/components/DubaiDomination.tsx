'use client';

import { motion } from 'framer-motion';

export default function DubaiDomination() {
  return (
    <section id="team" className="py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
    >
      {/* Glassmorphism Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-800/15 to-fuchsia-900/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              I&apos;m Not Just in the Business of Digital Marketing. I&apos;m in the Business of Dubai Domination.
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
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
