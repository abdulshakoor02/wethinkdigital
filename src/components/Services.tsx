'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'Full-Stack Development',
    description: 'End-to-end web and mobile applications built with cutting-edge technologies.',
    features: ['React/Next.js', 'Node.js/Python', 'Mobile Apps', 'Cloud Architecture'],
    icon: '🚀',
    color: 'from-purple-500 to-blue-500'
  },
  {
    title: 'Growth Marketing',
    description: 'Data-driven marketing strategies that scale your business exponentially.',
    features: ['SEO Optimization', 'PPC Campaigns', 'Content Strategy', 'Social Media'],
    icon: '📈',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Analytics & CRO',
    description: 'Turn data into actionable insights with advanced analytics and conversion optimization.',
    features: ['Data Analytics', 'A/B Testing', 'User Research', 'Conversion Funnels'],
    icon: '📊',
    color: 'from-cyan-500 to-teal-500'
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Comprehensive Digital Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From initial concept to market domination, we provide end-to-end solutions 
            that drive real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`text-6xl mb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Projects Delivered', value: '250+' },
            { label: 'Revenue Generated', value: '$47M+' },
            { label: 'Happy Clients', value: '150+' },
            { label: 'Years Experience', value: '8+' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}