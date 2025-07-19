'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Revolution',
    client: 'TechGear Pro',
    description: 'Transformed a struggling e-commerce store into a market leader with 300% revenue growth.',
    image: '/api/placeholder/600/400',
    results: [
      { metric: 'Revenue Increase', value: '300%' },
      { metric: 'Conversion Rate', value: '4.5% → 12.8%' },
      { metric: 'Page Load Speed', value: '3.2s → 0.8s' },
      { metric: 'Customer Retention', value: '45% → 78%' }
    ],
    technologies: ['Next.js', 'Stripe', 'AWS', 'Google Analytics'],
    testimonial: {
      text: "WeThinkDigital didn't just build our website - they built our entire digital strategy. The ROI speaks for itself.",
      author: 'Sarah Johnson',
      position: 'CEO, TechGear Pro'
    }
  },
  {
    id: 2,
    title: 'SaaS Platform Scaling',
    client: 'CloudFlow Solutions',
    description: 'Architected and developed a SaaS platform that now serves 50,000+ users globally.',
    image: '/api/placeholder/600/400',
    results: [
      { metric: 'User Growth', value: '0 → 50,000+' },
      { metric: 'Uptime', value: '99.9%' },
      { metric: 'Response Time', value: '<100ms' },
      { metric: 'Monthly Revenue', value: '$250K+' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    testimonial: {
      text: "Their technical expertise and growth marketing strategies took us from idea to IPO-ready in 18 months.",
      author: 'Michael Chen',
      position: 'CTO, CloudFlow Solutions'
    }
  },
  {
    id: 3,
    title: 'Local Business Digitalization',
    client: 'Urban Fitness Studio',
    description: 'Helped a local gym pivot to digital during COVID and achieve 5x revenue growth.',
    image: '/api/placeholder/600/400',
    results: [
      { metric: 'Revenue Growth', value: '500%' },
      { metric: 'Online Bookings', value: '0 → 2,000+/month' },
      { metric: 'Social Media Growth', value: '200% increase' },
      { metric: 'Customer LTV', value: '3x improvement' }
    ],
    technologies: ['React Native', 'Firebase', 'Stripe', 'Instagram API'],
    testimonial: {
      text: "They saved our business during the pandemic and helped us thrive in ways we never imagined.",
      author: 'David Martinez',
      position: 'Owner, Urban Fitness'
    }
  }
];

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0);

  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Proven Results</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real businesses, real results. See how we've helped companies like yours achieve extraordinary growth.
          </p>
        </motion.div>

        {/* Case Study Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setSelectedCase(index)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCase === index
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {study.client}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Content */}
        <motion.div
          key={selectedCase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image and Results */}
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg mb-6"
              >
                <div className="w-full h-64 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-6xl">🖼️</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </motion.div>

              {/* Results */}
              <div className="grid grid-cols-2 gap-4">
                {caseStudies[selectedCase].results.map((result, index) => (
                  <motion.div
                    key={result.metric}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-green-400">
                      {result.value}
                    </div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                {caseStudies[selectedCase].title}
              </h3>
              
              <p className="text-gray-300 mb-6 text-lg">
                {caseStudies[selectedCase].description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-white">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudies[selectedCase].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="glass rounded-lg p-6">
                <blockquote className="text-gray-300 italic mb-4">
&quot;{caseStudies[selectedCase].testimonial.text}&quot;
                </blockquote>
                <div className="text-white">
                  <div className="font-semibold">{caseStudies[selectedCase].testimonial.author}</div>
                  <div className="text-sm text-gray-400">{caseStudies[selectedCase].testimonial.position}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
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
            Start Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}