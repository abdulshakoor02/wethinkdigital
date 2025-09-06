'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaRocket, FaChartLine, FaChartBar, FaStore, FaMobileAlt, FaWordpress, FaStar, FaCheck, FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa';

// Floating Particles Component (matching Keywords section)
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  type: 'dot' | 'orb' | 'shape';
}

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = (): Particle[] => {
      const particleCount = window.innerWidth < 768 ? 12 : 20;
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (i < 6 ? 4 : i < 12 ? 25 : 120) + (i < 6 ? 2 : i < 12 ? 15 : 80),
        color: [
          'rgba(139, 92, 246, 0.25)',
          'rgba(236, 72, 153, 0.2)',
          'rgba(59, 130, 246, 0.2)',
          'rgba(168, 85, 247, 0.15)',
          'rgba(14, 165, 233, 0.1)'
        ][Math.floor(Math.random() * 5)],
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.25 + 0.05,
        type: i < 6 ? 'dot' : i < 12 ? 'orb' : 'shape'
      }));
    };

    setParticles(createParticles());
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.type === 'dot'
              ? 'rgba(255, 255, 255, 0.2)'
              : `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            filter: particle.type !== 'dot' ? 'blur(1px)' : 'none',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 8, -3, 0],
            scale: [0.8, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

interface ServicePackage {
  name: string;
  price: string;
  popular?: boolean;
}

interface ServiceData {
  title: string;
  description: string;
  features: string[];
  expandedFeatures: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
  badge?: string;
  stats: {
    roi: string;
    performance: string;
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
    expandedFeatures: ['Custom CRM Integration', 'Performance Optimized', 'SEO Built-in', 'Security Hardened'],
    icon: <FaRocket className="text-5xl" />,
    color: 'from-purple-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-blue-500/20',
    badge: 'POPULAR',
    stats: {
      roi: '150% ROI increase',
      performance: '3.2s average load time',
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
    expandedFeatures: ['Google Ads Management', 'Social Media Strategy', 'Content Creation', 'Analytics Reporting'],
    icon: <FaChartLine className="text-5xl" />,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    badge: 'BEST VALUE',
    stats: {
      roi: '300% ROAS average',
      performance: '#1 rankings achieved',
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
    expandedFeatures: ['Multi-currency Support', 'Inventory Management', 'Advanced Analytics', 'Mobile Commerce'],
    icon: <FaStore className="text-5xl" />,
    color: 'from-green-500 to-lime-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-lime-500/20',
    badge: 'HOT',
    stats: {
      roi: '250% sales increase',
      performance: '99.9% uptime',
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
    expandedFeatures: ['React Native/Flutter', 'Backend Integration', 'Push Notifications', 'Analytics Dashboard'],
    icon: <FaMobileAlt className="text-5xl" />,
    color: 'from-red-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20',
    stats: {
      roi: '180% user retention',
      performance: '4.7+ app store rating',
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
    expandedFeatures: ['Page Builder Custom', 'SEO Optimization', 'Speed Optimization', 'Maintenance Included'],
    icon: <FaWordpress className="text-5xl" />,
    color: 'from-yellow-500 to-amber-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
    stats: {
      roi: '120% faster load times',
      performance: '95+ PageSpeed score',
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
    expandedFeatures: ['Workflow Automation', 'Data Migration', 'Staff Training', '24/7 Support'],
    icon: <FaChartBar className="text-5xl" />,
    color: 'from-cyan-500 to-teal-500',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20',
    badge: 'NEW',
    stats: {
      roi: '400% time savings',
      performance: '99.5% accuracy rate',
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
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [cardState, setCardState] = useState<'initial' | 'hover' | 'expanded'>('initial');
  const [selectedPackage, setSelectedPackage] = useState(service.packages.find(p => p.popular)?.name || service.packages[0].name);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setCardState('initial');
  };

  const cardVariants = {
    initial: {
      height: 280,
      scale: 1,
      y: 0,
    },
    hover: {
      height: 420,
      scale: 1.02,
      y: -4,
    },
    expanded: {
      height: 560,
      scale: 1.02,
      y: -8,
    }
  };

  const cardTransition = {
    duration: 0.3,
    ease: [0.4, 0.0, 0.2, 1] as const
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden cursor-pointer group will-change-transform rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      variants={cardVariants}
      initial="initial"
      animate={cardState}
      transition={cardTransition}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCardState('hover')}
      onMouseLeave={handleMouseLeave}
      onClick={() => setCardState(cardState === 'expanded' ? 'hover' : 'expanded')}
      whileHover={{
        boxShadow: `0 25px 50px -12px rgba(${service.color.includes('purple') ? '139, 92, 246' :
                                                service.color.includes('blue') ? '59, 130, 246' :
                                                service.color.includes('green') ? '34, 197, 94' :
                                                service.color.includes('red') ? '239, 68, 68' :
                                                service.color.includes('yellow') ? '245, 158, 11' :
                                                '6, 182, 212'}, 0.4)`
      }}
    >
      {/* Service-specific gradient overlay */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-8 transition-opacity duration-300`} />
      
      {/* Glass border enhancement */}
      <div className={`absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-br ${service.color} opacity-15`}
           style={{
             WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor'
           }}
      />
      
      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
            whileHover={{ scale: 1.1 }}
          >
            {service.icon}
          </motion.div>
          
          {service.badge && (
            <motion.div
              className="px-3 py-1 rounded-full text-xs font-bold text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)`,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
              }}
            >
              <span className="relative z-10">{service.badge}</span>
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-bold mb-4 text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {service.description}
        </motion.p>

        {/* Level 1: Price */}
        <AnimatePresence>
          {cardState === 'initial' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-auto"
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
                {service.packages.find(p => p.name === selectedPackage)?.price || service.packages[0].price}
              </div>
              <motion.button
                className="w-full py-3 rounded-xl text-white font-semibold relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Learn More <FaArrowRight className="inline ml-2" />
                </span>
                <div className="absolute inset-0 bg-white/5 rounded-xl" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level 2: Features & Stats */}
        <AnimatePresence>
          {cardState === 'hover' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  ✨ What You Get:
                </h4>
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <FaCheck className={`text-xs mr-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">📊</span>
                  <span className="text-white font-semibold">Recent Success:</span>
                </div>
                <p className={`font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                  {service.stats.roi}
                </p>
              </div>

              <div className="mt-auto flex gap-3">
                <button className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}>
                  Get Quote
                </button>
                <button className="flex-1 py-3 rounded-xl border border-white/20 text-gray-300 font-semibold hover:bg-white/5 transition-all duration-300">
                  Portfolio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level 3: Full Details */}
        <AnimatePresence>
          {cardState === 'expanded' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full"
            >
              {/* Proven Results */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  📊 Proven Results:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-300">• {service.stats.roi}</div>
                  <div className="text-gray-300">• {service.stats.performance}</div>
                  <div className="text-gray-300">• {service.stats.projects}</div>
                  <div className="text-gray-300">• ⭐ {service.stats.rating}/5 ({service.stats.reviews} reviews)</div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-3">💼 Choose Your Package:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {service.packages.map((pkg) => (
                    <button
                      key={pkg.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg.name);
                      }}
                      className={`p-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        selectedPackage === pkg.name
                          ? `bg-gradient-to-r ${service.color} text-white`
                          : 'border border-white/20 text-gray-300 hover:bg-white/5'
                      } ${pkg.popular ? 'ring-2 ring-white/30' : ''}`}
                    >
                      <div>{pkg.name}</div>
                      <div className="font-bold">{pkg.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Perfect For */}
              <div className="mb-4">
                <p className="text-gray-300 text-xs">
                  🎯 Perfect for: {service.perfectFor.join(', ')}
                </p>
              </div>

              {/* Testimonial */}
              <div className="mb-4 p-3 rounded-lg bg-white/5">
                <p className="text-gray-300 text-xs italic mb-1">"{service.testimonial.text}"</p>
                <p className="text-gray-400 text-xs">- {service.testimonial.author}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2">
                <button className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${service.color} text-white font-semibold text-xs hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
                  <FaPhone className="mr-2" /> Quick Call
                </button>
                <button className="flex-1 py-2 rounded-lg border border-white/20 text-gray-300 font-semibold text-xs hover:bg-white/5 transition-all duration-300 flex items-center justify-center">
                  <FaEnvelope className="mr-2" /> Proposal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 overflow-hidden"
      ref={ref}
      style={{
        background: `
          radial-gradient(circle at 25% 85%, rgba(120, 119, 198, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 75% 15%, rgba(255, 119, 198, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 45% 45%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
    >
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div
            className="relative max-w-5xl mx-auto p-12 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px) saturate(200%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 text-white"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              🎯 Transform Your Business with Premium Digital Solutions
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              I don't just deliver services - I deliver measurable growth. I'm your partner in dominating your market with proven digital solutions that drive real revenue.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Floating CTA Glass Card */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div
            className="max-w-2xl mx-auto p-8 rounded-3xl"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '2px solid rgba(139, 92, 246, 0.25)',
              boxShadow: '0 30px 60px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            <motion.button
              className="text-2xl md:text-3xl font-bold text-white mb-6 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Get Your Free Strategy Session
            </motion.button>
            <p className="text-gray-200 leading-relaxed">
              Ready to dominate your market? Let's talk about how we can 10x your business with proven strategies that deliver real results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}