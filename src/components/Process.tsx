'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    id: 1,
    title: 'Discovery & Strategy',
    description: 'Deep dive into your business goals, market position, and growth opportunities.',
    duration: '1-2 weeks',
    deliverables: ['Business Analysis', 'Competitive Research', 'Growth Strategy'],
    icon: '🔍'
  },
  {
    id: 2,
    title: 'Design & Architecture',
    description: 'Create stunning designs and robust technical architecture for your solution.',
    duration: '2-3 weeks',
    deliverables: ['UI/UX Design', 'Technical Architecture', 'Project Roadmap'],
    icon: '🎨'
  },
  {
    id: 3,
    title: 'Development & Testing',
    description: 'Agile development with continuous testing and quality assurance.',
    duration: '4-8 weeks',
    deliverables: ['Development Sprints', 'Testing Reports', 'Feature Releases'],
    icon: '⚡'
  },
  {
    id: 4,
    title: 'Launch & Optimization',
    description: 'Deploy, monitor, and continuously optimize for maximum performance.',
    duration: 'Ongoing',
    deliverables: ['Performance Monitoring', 'A/B Testing', 'Growth Optimization'],
    icon: '🚀'
  },
  {
    id: 5,
    title: 'Scale & Dominate',
    description: 'Scale your success and dominate your market with advanced strategies.',
    duration: 'Ongoing',
    deliverables: ['Scaling Strategy', 'Market Domination', 'Long-term Growth'],
    icon: '👑'
  }
];

export default function Process() {
  const ref = useRef(null);

  return (
    <section id="process" className="py-24 relative overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Proven Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From initial concept to market domination, our 5-step process ensures your success at every stage.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary hidden md:block" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                <div className="rounded-xl p-8 hover:shadow-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{step.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-primary font-semibold">{step.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{step.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white">Key Deliverables:</h4>
                    {step.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {deliverable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl z-10 hidden md:flex"
              >
                {step.id}
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />
              <div className="md:hidden absolute left-0 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm"
              >
                {step.id}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Journey?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can apply our proven process to transform your business.
          </p>

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
            onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Your Discovery Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
