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
    <section id="process" className="py-24 relative overflow-hidden bg-[#18191a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18191a] via-[#1e1e20] to-[#18191a]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6 text-gray-800">
            🚀 Our Proven Process
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to market domination, our 5-step process ensures your success at every stage.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 hidden md:block opacity-50" />

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
                <div className="rounded-xl p-8 hover:shadow-2xl transition-all duration-300 bg-[#1e1e20] border border-gray-300">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{step.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                      <p className="text-sm bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold">{step.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-800">Key Deliverables:</h4>
                    {step.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2"></span>
                        {deliverable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 hidden md:flex shadow-lg"
              >
                {step.id}
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 opacity-50" />
              <div className="md:hidden absolute left-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
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
          <div className="max-w-3xl mx-auto p-8 md:p-12 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Ready to Start Your Journey?</h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Let&apos;s discuss how we can apply our proven process to transform your business.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Book Your Discovery Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
