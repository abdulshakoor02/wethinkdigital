'use client';

import { useRef, useState, useEffect } from 'react';
import { FaRocket, FaChartLine, FaChartBar, FaStore, FaMobileAlt, FaWordpress, FaCheck, FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa';

interface ServicePackage {
  name: string;
  price: string;
  popular?: boolean;
}

interface ServiceData {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  badge?: string;
  stats: {
    roi: string;
    projects: string;
    rating: number;
    reviews: number;
  };
  packages: ServicePackage[];
  testimonial: {
    text: string;
    author: string;
  };
  perfectFor: string[];
}

const services: ServiceData[] = [
  {
    title: 'Custom Web Development Dubai',
    description: "Revenue-generating web solutions that convert visitors into paying customers",
    features: ['Responsive Web Design Dubai', 'Custom Software Development Dubai', 'Enterprise Software Solutions Dubai', 'CRM Software Development Dubai'],
    icon: <FaRocket className="text-5xl" />,
    color: 'from-purple-500 to-blue-500',
    badge: 'POPULAR',
    stats: {
      roi: '150% ROI increase',
      projects: '500+ successful projects',
      rating: 4.9,
      reviews: 127
    },
    packages: [
      { name: 'BASIC', price: '$2,999' },
      { name: 'PROFESSIONAL', price: '$4,999', popular: true },
      { name: 'ENTERPRISE', price: '$9,999' }
    ],
    testimonial: {
      text: 'WeThinkDigital doubled our online sales!',
      author: 'Ahmed S., E-commerce CEO'
    },
    perfectFor: ['E-commerce', 'SaaS', 'Corporate websites']
  },
  {
    title: 'Digital Marketing Services Dubai UAE',
    description: "You're losing money every day you're not at the top of Google. Let me get you there.",
    features: ['SEO Services Dubai Small Business', 'PPC Advertising Company Dubai', 'Content Marketing Services UAE', 'Email Marketing Agency Dubai'],
    icon: <FaChartLine className="text-5xl" />,
    color: 'from-blue-500 to-cyan-500',
    badge: 'BEST VALUE',
    stats: {
      roi: '300% ROAS average',
      projects: '200+ campaigns',
      rating: 4.8,
      reviews: 89
    },
    packages: [
      { name: 'STARTER', price: '$1,999/mo' },
      { name: 'GROWTH', price: '$3,999/mo', popular: true },
      { name: 'SCALE', price: '$7,999/mo' }
    ],
    testimonial: {
      text: 'Our leads increased by 400% in 3 months!',
      author: 'Sarah M., Marketing Director'
    },
    perfectFor: ['Local Business', 'B2B Services', 'Startups']
  },
  {
    title: 'Ecommerce Website Development UAE',
    description: "Your ecommerce store should be making you money while you sleep. More traffic, more sales, more profit.",
    features: ['Shopify Development', 'Magento Development', 'Payment Gateway Integration', 'UX for E-commerce'],
    icon: <FaStore className="text-5xl" />,
    color: 'from-green-500 to-lime-500',
    badge: 'HOT',
    stats: {
      roi: '250% sales increase',
      projects: '150+ stores built',
      rating: 5.0,
      reviews: 76
    },
    packages: [
      { name: 'STARTUP', price: '$3,999' },
      { name: 'BUSINESS', price: '$6,999', popular: true },
      { name: 'ENTERPRISE', price: '$12,999' }
    ],
    testimonial: {
      text: 'Our store conversion rate went from 1.2% to 4.8%!',
      author: 'Omar K., Online Retailer'
    },
    perfectFor: ['Retail Stores', 'Fashion Brands', 'Electronics']
  },
  {
    title: 'Mobile App Development Dubai',
    description: "I build mobile apps that people actually use. Create experiences that drive engagement and revenue.",
    features: ['iOS Development', 'Android Development', 'Cross-Platform Apps', 'App Store Optimization'],
    icon: <FaMobileAlt className="text-5xl" />,
    color: 'from-red-500 to-orange-500',
    stats: {
      roi: '180% user retention',
      projects: '80+ apps launched',
      rating: 4.9,
      reviews: 54
    },
    packages: [
      { name: 'MVP', price: '$8,999' },
      { name: 'FULL APP', price: '$15,999', popular: true },
      { name: 'ENTERPRISE', price: '$25,999' }
    ],
    testimonial: {
      text: 'Our app hit 10K downloads in the first month!',
      author: 'Lisa R., Tech Startup'
    },
    perfectFor: ['Startups', 'Service Apps', 'E-commerce']
  },
  {
    title: 'WordPress Development Company Dubai',
    description: "I build WordPress sites that are fast, secure, and SEO-friendly. Your website will be a lead-generating asset.",
    features: ['Custom Themes & Plugins', 'Performance Optimization', 'Security Hardening', 'WooCommerce Integration'],
    icon: <FaWordpress className="text-5xl" />,
    color: 'from-yellow-500 to-amber-500',
    stats: {
      roi: '120% faster load times',
      projects: '300+ WP sites',
      rating: 4.7,
      reviews: 98
    },
    packages: [
      { name: 'BASIC WP', price: '$1,299' },
      { name: 'BUSINESS', price: '$2,599', popular: true },
      { name: 'ENTERPRISE', price: '$4,999' }
    ],
    testimonial: {
      text: 'Our WordPress site loads 3x faster now!',
      author: 'David L., Agency Owner'
    },
    perfectFor: ['Blogs', 'Business Sites', 'Portfolios']
  },
  {
    title: 'Business Automation Software UAE',
    description: "I help businesses automate their processes and save money. Custom-built solutions that scale your operations.",
    features: ['Process Analysis', 'Custom Software Development', 'API Integration', 'Ongoing Support'],
    icon: <FaChartBar className="text-5xl" />,
    color: 'from-cyan-500 to-teal-500',
    badge: 'NEW',
    stats: {
      roi: '400% time savings',
      projects: '50+ automations',
      rating: 5.0,
      reviews: 32
    },
    packages: [
      { name: 'STARTER', price: '$4,999' },
      { name: 'ADVANCED', price: '$8,999', popular: true },
      { name: 'ENTERPRISE', price: '$15,999' }
    ],
    testimonial: {
      text: 'Saved us 20 hours per week on manual tasks!',
      author: 'Fatima A., Operations Manager'
    },
    perfectFor: ['Agencies', 'Manufacturing', 'Healthcare']
  }
];

interface ServiceCardProps {
  service: ServiceData;
  isMobile?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isMobile = false }) => {
  const [selectedPackage, setSelectedPackage] = useState(service.packages.find(p => p.popular)?.name || service.packages[0].name);

  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          {service.icon}
        </div>
        {service.badge && (
          <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600">
            {service.badge}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
        {service.description}
      </p>

      {/* Price */}
      <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
        {service.packages.find(p => p.name === selectedPackage)?.price || service.packages[0].price}
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-gray-800 font-semibold mb-3">✨ What You Get:</h4>
        <ul className="space-y-2">
          {service.features.slice(0, 4).map((feature, i) => (
            <li key={feature} className="flex items-center text-gray-600 text-sm">
              <FaCheck className="text-xs mr-3 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className={`font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          📊 {service.stats.roi}
        </p>
        <p className="text-gray-600 text-xs mt-1">
          {service.stats.projects} • ⭐ {service.stats.rating}/5 ({service.stats.reviews} reviews)
        </p>
      </div>

      {/* Package Selection (Desktop only) */}
      {!isMobile && (
        <div className="mb-6">
          <h4 className="text-gray-800 font-semibold mb-3">💼 Choose Your Package:</h4>
          <div className="grid grid-cols-3 gap-2">
            {service.packages.map((pkg) => (
              <button
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg.name)}
                className={`p-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  selectedPackage === pkg.name
                    ? `bg-gradient-to-r ${service.color} text-white`
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                } ${pkg.popular ? 'ring-2 ring-white/30' : ''}`}
              >
                <div>{pkg.name}</div>
                <div className="font-bold">{pkg.price}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-xs italic mb-1">&ldquo;{service.testimonial.text}&rdquo;</p>
        <p className="text-gray-500 text-xs">- {service.testimonial.author}</p>
      </div>

      {/* Perfect For */}
      <div className="mb-6">
        <p className="text-gray-600 text-xs">
          🎯 Perfect for: {service.perfectFor.join(', ')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
          <FaPhone className="mr-2" /> Quick Call
        </button>
        <button className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
          <FaEnvelope className="mr-2" /> Proposal
        </button>
      </div>
    </div>
  );
};

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="max-w-5xl mx-auto p-8 md:p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-gray-800">
              🎯 Transform Your Business with Premium Digital Solutions
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
              I don&apos;t just deliver services - I deliver measurable growth. I&apos;m your partner in dominating your market with proven digital solutions that drive real revenue.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={service.title}>
              <ServiceCard service={service} isMobile={isMobile} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20">
          <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-purple-200">
            <button className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 w-full hover:text-purple-700 transition-colors">
              🚀 Get Your Free Strategy Session
            </button>
            <p className="text-gray-600 leading-relaxed">
              Ready to dominate your market? Let&apos;s talk about how we can 10x your business with proven strategies that deliver real results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
