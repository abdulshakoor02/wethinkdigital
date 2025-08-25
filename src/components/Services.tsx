'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaRocket, FaChartLine, FaChartBar, FaStore, FaMobileAlt, FaWordpress } from 'react-icons/fa';

const services = [
  {
    title: 'Custom Web Development Dubai',
    description: "I don&apos;t just build websites. I build revenue-generating machines. As the best digital marketing company in Dubai, I deliver custom web development that converts.",
    features: ['Responsive Web Design Dubai', 'Custom Software Development Dubai', 'Enterprise Software Solutions Dubai', 'CRM Software Development Dubai'],
    icon: <FaRocket className="text-6xl" />,
    color: 'from-purple-500 to-blue-500'
  },
  {
    title: 'Digital Marketing Services Dubai UAE',
    description: "You&apos;re losing money every day you&apos;re not at the top of Google. My digital marketing services in Dubai UAE will get you there. I&apos;m the social media marketing agency Dubai trusts.",
    features: ['SEO Services Dubai Small Business', 'PPC Advertising Company Dubai', 'Content Marketing Services UAE', 'Email Marketing Agency Dubai'],
    icon: <FaChartLine className="text-6xl" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Ecommerce Website Development UAE',
    description: "Your ecommerce store should be making you money while you sleep. My ecommerce website development in the UAE is designed to do just that. More traffic, more sales, more profit.",
    features: ['Shopify Development', 'Magento Development', 'Payment Gateway Integration', 'UX for E-commerce'],
    icon: <FaStore className="text-6xl" />,
    color: 'from-green-500 to-lime-500'
  },
  {
    title: 'Mobile App Development Dubai',
    description: "I build mobile apps that people actually use. As leading mobile app developers in the UAE, I create experiences that drive engagement and revenue.",
    features: ['iOS Development', 'Android Development', 'Cross-Platform Apps', 'App Store Optimization'],
    icon: <FaMobileAlt className="text-6xl" />,
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'WordPress Development Company Dubai',
    description: "I build WordPress sites that are fast, secure, and SEO-friendly. As a top WordPress development company in Dubai, I&apos;ll make sure your website is a lead-generating asset, not a liability.",
    features: ['Custom Themes & Plugins', 'Performance Optimization', 'Security Hardening', 'WooCommerce Integration'],
    icon: <FaWordpress className="text-6xl" />,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    title: 'Business Automation Software UAE',
    description: "I help businesses in the UAE automate their processes and save money. My business automation software is custom-built to solve your specific problems and scale your operations.",
    features: ['Process Analysis', 'Custom Software Development', 'API Integration', 'Ongoing Support'],
    icon: <FaChartBar className="text-6xl" />,
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
            <span className="gradient-text">I Offer a Lot More Than Just Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I provide a clear path to dominating your market. I&apos;m not just a service provider; I&apos;m your partner in growth. I&apos;m the best digital marketing company in Dubai, and I have the results to prove it.
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
              <div className={`mb-4 bg-gradient-to-r ${service.color} bg-clip-text`}>
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
      </div>
    </section>
  );
}