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
    title: 'CRM Implementation Dubai',
    description: "Powerful customer relationship management to enhance customer engagement and drive sales growth.",
    features: ['Sales Pipeline Management', 'Customer Analytics', 'Marketing Automation', 'Lead Tracking'],
    icon: <FaChartLine className="text-5xl" />,
    color: 'from-blue-500 to-cyan-500',
    badge: 'POPULAR',
    stats: {
      roi: '300% increase in leads',
      projects: '150+ CRM setups',
      rating: 4.9,
      reviews: 127
    },
    packages: [
      { name: 'STARTER', price: '$2,999' },
      { name: 'PROFESSIONAL', price: '$5,999', popular: true },
      { name: 'ENTERPRISE', price: '$12,999' }
    ],
    testimonial: {
      text: 'Our sales team productivity increased by 60%!',
      author: 'Sarah M., Sales Director'
    },
    perfectFor: ['Sales Teams', 'Service Businesses', 'B2B']
  },
  {
    title: 'Cloud CRM Solutions UAE',
    description: "Scalable cloud-based CRM systems that provide real-time access to your customer data from anywhere.",
    features: ['Cloud Deployment', 'Real-time Analytics', 'Remote Access', 'Automatic Updates'],
    icon: <FaStore className="text-5xl" />,
    color: 'from-[#18191a]0 to-blue-500',
    badge: 'BEST VALUE',
    stats: {
      roi: '40% efficiency increase',
      projects: '100+ cloud CRM migrations',
      rating: 5.0,
      reviews: 89
    },
    packages: [
      { name: 'STARTUP', price: '$1,999' },
      { name: 'BUSINESS', price: '$4,999', popular: true },
      { name: 'ENTERPRISE', price: '$9,999' }
    ],
    testimonial: {
      text: 'The cloud CRM saved us 30% on infrastructure costs!',
      author: 'Omar K., Operations Manager'
    },
    perfectFor: ['Multi-location Business', 'Remote Teams', 'Scalable Startups']
  },
  {
    title: 'Sales Pipeline Automation',
    description: "Automate your sales process from lead capture to deal closure with intelligent workflow automation.",
    features: ['Lead Scoring', 'Automatic Follow-ups', 'Deal Stage Tracking', 'Revenue Forecasting'],
    icon: <FaRocket className="text-5xl" />,
    color: 'from-green-500 to-lime-500',
    badge: 'HOT',
    stats: {
      roi: '70% time savings',
      projects: '80+ automation setups',
      rating: 4.9,
      reviews: 76
    },
    packages: [
      { name: 'BASIC', price: '$1,999' },
      { name: 'ADVANCED', price: '$3,999', popular: true },
      { name: 'ENTERPRISE', price: '$7,999' }
    ],
    testimonial: {
      text: 'Saved us 20 hours per week on manual follow-ups!',
      author: 'Lisa R., Sales Manager'
    },
    perfectFor: ['Sales Teams', 'Real Estate', 'Service Businesses']
  },
  {
    title: 'Marketing Automation',
    description: "Automate your marketing campaigns and nurture leads with personalized automated workflows.",
    features: ['Email Campaigns', 'Social Media Automation', 'Lead Nurturing', 'Campaign Analytics'],
    icon: <FaMobileAlt className="text-5xl" />,
    color: 'from-red-500 to-orange-500',
    stats: {
      roi: '250% increase in lead conversion',
      projects: '60+ marketing automations',
      rating: 4.8,
      reviews: 54
    },
    packages: [
      { name: 'STARTER', price: '$999' },
      { name: 'GROWTH', price: '$2,499', popular: true },
      { name: 'SCALE', price: '$4,999' }
    ],
    testimonial: {
      text: 'Our lead conversion increased by 250%!',
      author: 'Ahmed K., Marketing Director'
    },
    perfectFor: ['Marketing Teams', 'E-commerce', 'B2B Companies']
  },
  {
    title: 'CRM Integration Services',
    description: "Seamlessly connect your CRM with existing systems and applications for unified data flow.",
    features: ['API Development', 'Third-party Integrations', 'Data Migration', 'Custom Connectors'],
    icon: <FaWordpress className="text-5xl" />,
    color: 'from-yellow-500 to-amber-500',
    stats: {
      roi: '100% data visibility',
      projects: '100+ CRM integrations',
      rating: 4.7,
      reviews: 43
    },
    packages: [
      { name: 'INTEGRATION', price: '$2,999' },
      { name: 'ENTERPRISE', price: '$5,999', popular: true },
      { name: 'CUSTOM', price: 'Custom' }
    ],
    testimonial: {
      text: 'All our systems now integrate seamlessly with CRM!',
      author: 'David L., IT Director'
    },
    perfectFor: ['Multi-system Business', 'Enterprise', 'Data Consolidation']
  },
  {
    title: 'CRM Analytics & Reporting',
    description: "Transform your CRM data into actionable insights with comprehensive analytics and custom reports.",
    features: ['Custom Dashboards', 'Sales Analytics', 'Customer Insights', 'Performance Reports'],
    icon: <FaChartBar className="text-5xl" />,
    color: 'from-cyan-500 to-teal-500',
    badge: 'NEW',
    stats: {
      roi: '5x decision speed',
      projects: '50+ analytics projects',
      rating: 5.0,
      reviews: 32
    },
    packages: [
      { name: 'DASHBOARD', price: '$999' },
      { name: 'ANALYTICS', price: '$2,499', popular: true },
      { name: 'BI SUITE', price: '$4,999' }
    ],
    testimonial: {
      text: 'We can now make data-driven decisions in minutes!',
      author: 'Fatima A., CEO'
    },
    perfectFor: ['Executives', 'Sales Managers', 'Strategy Teams']
  }
];

interface ServiceCardProps {
  service: ServiceData;
  isMobile?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isMobile = false }) => {
  const [selectedPackage, setSelectedPackage] = useState(service.packages.find(p => p.popular)?.name || service.packages[0].name);

  return (
    <div className="relative overflow-hidden bg-[#1e1e20] rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          {service.icon}
        </div>
        {service.badge && (
          <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-gray-600 to-blue-600">
            {service.badge}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-100 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
        {service.description}
      </p>

      {/* Price */}
      <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
        {service.packages.find(p => p.name === selectedPackage)?.price || service.packages[0].price}
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-gray-100 font-semibold mb-3">✨ What You Get:</h4>
        <ul className="space-y-2">
          {service.features.slice(0, 4).map((feature, i) => (
            <li key={feature} className="flex items-center text-gray-400 text-sm">
              <FaCheck className="text-xs mr-3 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="mb-6 p-3 bg-[#18191a] rounded-lg">
        <p className={`font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          📊 {service.stats.roi}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {service.stats.projects} • ⭐ {service.stats.rating}/5 ({service.stats.reviews} reviews)
        </p>
      </div>

      {/* Package Selection (Desktop only) */}
      {!isMobile && (
        <div className="mb-6">
          <h4 className="text-gray-100 font-semibold mb-3">💼 Choose Your Package:</h4>
          <div className="grid grid-cols-3 gap-2">
            {service.packages.map((pkg) => (
              <button
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg.name)}
                className={`p-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  selectedPackage === pkg.name
                    ? `bg-gradient-to-r ${service.color} text-white`
                    : 'border border-gray-300 text-gray-400 hover:bg-[#18191a]'
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
      <div className="mb-6 p-3 bg-[#18191a] rounded-lg">
        <p className="text-gray-400 text-xs italic mb-1">&ldquo;{service.testimonial.text}&rdquo;</p>
        <p className="text-gray-500 text-xs">- {service.testimonial.author}</p>
      </div>

      {/* Perfect For */}
      <div className="mb-6">
        <p className="text-gray-400 text-xs">
          🎯 Perfect for: {service.perfectFor.join(', ')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
          <FaPhone className="mr-2" /> Quick Call
        </button>
        <button className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-400 font-semibold text-sm hover:bg-[#18191a] transition-all duration-300 flex items-center justify-center">
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
      className="relative min-h-screen py-24 overflow-hidden bg-[#18191a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="max-w-5xl mx-auto p-8 md:p-12 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-800">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-gray-100">
              🚀 Transform Your Business with Powerful CRM Solutions
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 leading-relaxed">
              We help businesses streamline customer relationships, automate sales workflows, and boost productivity with our integrated CRM platform tailored to your needs.
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
          <div className="max-w-2xl mx-auto p-6 md:p-8 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-800">
            <button className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 w-full hover:text-gray-200 transition-colors">
              📊 Get Your Free CRM Consultation
            </button>
            <p className="text-gray-400 leading-relaxed">
              Ready to streamline your customer relationships? Let&apos;s discuss how our CRM solutions can transform your business efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
