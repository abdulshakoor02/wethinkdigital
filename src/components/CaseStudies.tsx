'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'I Took This Dubai E-commerce Store from Zero to Hero',
    client: 'A Dubai-based fashion retailer',
    description: 'They were bleeding money on ads that didn\'t convert. I implemented my proven ecommerce website development UAE strategy and 3x-ed their revenue in 90 days.',
    image: 'https://plus.unsplash.com/premium_photo-1726729310968-f322e3742418?w=600&h=400&fit=crop',
    results: [
      { metric: 'Revenue Increase', value: '300%' },
      { metric: 'Conversion Rate', value: '4.5% → 12.8%' },
      { metric: 'PPC Ad Spend', value: '-50%' },
      { metric: 'Customer Retention', value: '+78%' }
    ],
    technologies: ['Next.js', 'Stripe', 'AWS', 'Google Analytics'],
    testimonial: {
      text: "I stopped wasting money and started making it. My business was transformed from a struggling startup to a market leader thanks to the best digital marketing company in Dubai.",
      author: 'Fatima Al-Mansoori',
      position: 'CEO, Dubai Fashion House'
    }
  },
  {
    id: 2,
    title: 'How I Built a Dominant SaaS Platform in Abu Dhabi',
    client: 'A high-growth SaaS company in Abu Dhabi',
    description: 'They had a great idea but no clue how to build it. I provided custom software development in Dubai that took them from a local startup to a regional powerhouse.',
    image: 'https://images.unsplash.com/photo-1651760464181-49092525ca3b?w=600&h=400&fit=crop',
    results: [
      { metric: 'User Growth', value: '0 → 50,000+' },
      { metric: 'Uptime', value: '99.9%' },
      { metric: 'Response Time', value: '<100ms' },
      { metric: 'Monthly Revenue', value: '$250K+' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    testimonial: {
      text: "I didn't just get a product; I got a partner. Their enterprise software solutions in Dubai are second to none.",
      author: 'Ahmed Al-Futtaim',
      position: 'CTO, MENA Cloud Solutions'
    }
  },
  {
    id: 3,
    title: 'I Saved This Local UAE Business with Digital',
    client: 'A popular fitness center in Abu Dhabi',
    description: 'The pandemic almost killed their business. I used my mobile app development Dubai expertise to pivot them to a digital model and 5x their revenue.',
    image: 'https://plus.unsplash.com/premium_photo-1712999654713-59018f76fe6d?w=600&h=400&fit=crop',
    results: [
      { metric: 'Revenue Growth', value: '500%' },
      { metric: 'Online Bookings', value: '0 → 2,000+/month' },
      { metric: 'Social Media Growth', value: '+200%' },
      { metric: 'Customer LTV', value: '+300%' }
    ],
    technologies: ['React Native', 'Firebase', 'Stripe', 'Instagram API'],
    testimonial: {
      text: "I was about to close my doors. Then I found the top mobile app developers in the UAE. They didn't just save my business; they made it thrive.",
      author: 'Youssef Al-Haddad',
      position: 'Owner, Abu Dhabi Fitness'
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
            <span className="gradient-text">Don't Just Take My Word for It. Here's the Proof.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I get results. It's that simple. Here's a look at how I've helped businesses just like yours dominate the market in Dubai and the UAE.
          </p>
        </motion.div>

        {/* Case Study Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setSelectedCase(index)}
                className={`px-4 py-2 rounded-lg transition-all ${selectedCase === index
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
                <img 
                  src={caseStudies[selectedCase].image} 
                  alt={`${caseStudies[selectedCase].client} project`} 
                  className="w-full h-64 object-cover rounded-lg"
                />
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