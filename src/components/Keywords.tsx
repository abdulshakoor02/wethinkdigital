'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';

// Floating Particles Component
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const createParticles = (): Particle[] => {
      const particleCount = window.innerWidth < 768 ? 15 : 25;
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (i < 8 ? 4 : i < 15 ? 30 : 150) + (i < 8 ? 2 : i < 15 ? 20 : 100),
        color: [
          'rgba(59, 130, 246, 0.4)',
          'rgba(14, 165, 233, 0.35)',
          'rgba(6, 182, 212, 0.3)',
          'rgba(59, 130, 246, 0.25)',
          'rgba(34, 211, 238, 0.3)'
        ][Math.floor(Math.random() * 5)],
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        type: i < 8 ? 'dot' : i < 15 ? 'orb' : 'shape'
      }));
    };

    setParticles(createParticles());

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
              ? 'rgba(59, 130, 246, 0.5)'
              : `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            filter: particle.type !== 'dot' ? 'blur(1px)' : 'none',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -5, 0],
            scale: [0.8, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

// Glass Card Component with Advanced Effects
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  level = 2,
  hover = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  const glassStyles = {
    1: {
      backdropFilter: isMobileDevice ? 'blur(10px) saturate(150%)' : 'blur(25px) saturate(200%)',
      background: 'rgba(30, 30, 32, 0.95)',
      border: '2px solid rgba(209, 213, 219, 0.3)',
      boxShadow: '0 25px 45px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(209, 213, 219, 0.1) inset'
    },
    2: {
      backdropFilter: isMobileDevice ? 'blur(8px) saturate(120%)' : 'blur(20px) saturate(150%)',
      background: 'rgba(30, 30, 32, 0.95)',
      border: '1px solid rgba(209, 213, 219, 0.25)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(209, 213, 219, 0.08) inset'
    },
    3: {
      backdropFilter: isMobileDevice ? 'blur(8px) saturate(100%)' : 'blur(15px) saturate(120%)',
      background: 'rgba(30, 30, 32, 0.95)',
      border: '1px solid rgba(209, 213, 219, 0.2)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(209, 213, 219, 0.06) inset'
    },
    4: {
      backdropFilter: isMobileDevice ? 'blur(6px) saturate(100%)' : 'blur(12px) saturate(100%)',
      background: 'rgba(30, 30, 32, 0.95)',
      border: '0.5px solid rgba(209, 213, 219, 0.15)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(209, 213, 219, 0.04) inset'
    },
    5: {
      backdropFilter: isMobileDevice ? 'blur(10px) saturate(150%)' : 'blur(30px) saturate(180%)',
      background: 'rgba(30, 30, 32, 0.95)',
      border: '2px solid rgba(209, 213, 219, 0.35)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(209, 213, 219, 0.1) inset'
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl p-8 cursor-pointer ${className}`}
      style={{
        ...glassStyles[level],
        WebkitBackdropFilter: glassStyles[level].backdropFilter,
        WebkitTransform: 'translateZ(0)',
        ...(isMobile ? {} : {
          rotateX: hover ? rotateX : 0,
          rotateY: hover ? rotateY : 0,
          transformStyle: 'preserve-3d'
        })
      }}
      onMouseMove={hover && !isMobile ? handleMouseMove : undefined}
      onMouseLeave={hover && !isMobile ? handleMouseLeave : undefined}
      onClick={onClick}
      whileHover={hover && !isMobile ? {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      } : undefined}
      animate={isMobile ? {} : {
        y: [0, -5, 0],
        rotateZ: [0, 0.5, 0, -0.5, 0]
      }}
      transition={isMobile ? {} : {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Interactive Keyword Tag Component
interface KeywordTagProps {
  keyword: string;
  size: 'small' | 'medium' | 'large';
  category: 'primary' | 'secondary' | 'lsi';
  index: number;
  isVisible: boolean;
}

const KeywordTag: React.FC<KeywordTagProps> = ({ keyword, size, category, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);

  const sizeStyles = {
    small: 'px-3 py-2 text-xs',
    medium: 'px-4 py-3 text-sm',
    large: 'px-6 py-4 text-base font-semibold'
  };

  const categoryStyles = {
    primary: 'border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
    secondary: 'border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    lsi: 'border-gray-500/50 shadow-[0_0_10px_rgba(156,163,175,0.2)]'
  };

  const categoryHoverShadow = {
    primary: '0 15px 30px rgba(59, 130, 246, 0.4)',
    secondary: '0 15px 30px rgba(6, 182, 212, 0.4)',
    lsi: '0 15px 30px rgba(156, 163, 175, 0.4)'
  };

  return (
    <motion.div
      ref={tagRef}
      className={`relative rounded-full border bg-[#1e1e20] text-gray-800 text-center cursor-pointer select-none ${sizeStyles[size]} ${categoryStyles[category]}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        boxShadow: categoryHoverShadow[category],
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -2, 0],
          scale: [0.98, 1.02, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <span className="relative z-10">{keyword}</span>

        {/* Glow Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                filter: 'blur(4px)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Main Keywords Component
const primaryKeywords = [
  'Digital Marketing', 'Digital Marketing Agency', 'Business Growth',
  'Website Design & Development', 'Search Engine Optimization (SEO)', 'Social Media Marketing',
  'Lead Generation', 'HubSpot', 'Digital Marketing Strategy', 'Online Marketing'
];

const lsiKeywords = [
  'Digital marketing services', 'Marketing strategy creation', 'Customer journey mapping',
  'Brand awareness campaigns', 'Content creation and distribution', 'Search engine marketing',
  'Inbound marketing strategies', 'CRM integration services', 'Customer relationship management',
  'Digital footprint optimization', 'Online reputation management', 'Marketing automation',
  'Sales funnel optimization', 'Conversion rate optimization', 'Customer acquisition strategies',
  'Brand advocacy development', 'Multi-channel marketing', 'Performance marketing',
  'Growth hacking techniques', 'Digital transformation services'
];

export default function Keywords() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const keywords = useMemo(() => {
    const all = [...primaryKeywords, ...lsiKeywords];
    return showAll ? all : all.slice(0, 15);
  }, [showAll]);

  const getKeywordProps = (keyword: string, index: number) => {
    const isPrimary = primaryKeywords.includes(keyword);
    const originalIndex = isPrimary ? primaryKeywords.indexOf(keyword) : lsiKeywords.indexOf(keyword);

    if (isPrimary && originalIndex < 3) {
      return { size: 'large' as const, category: 'primary' as const };
    } else if (isPrimary || originalIndex < 5) {
      return { size: 'medium' as const, category: 'secondary' as const };
    } else {
      return { size: 'small' as const, category: 'lsi' as const };
    }
  };

  return (
    <section
      id="keywords"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden bg-[#18191a]"
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-300 p-8 md:p-12">
            <motion.h2
              className="text-3xl md:text-6xl font-bold mb-8 text-gray-800"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💫 Ready to Stop Guessing and Start Growing?
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Transform your digital presence with our proven strategies
              <br className="hidden md:block" />
              that deliver real results, not just pretty metrics
            </p>
          </div>
        </motion.div>

        {/* Q&A and Truth Glass Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Q&A Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#1e1e20] rounded-xl border border-gray-300 shadow-lg p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 flex items-center">
                <span className="mr-2">💡</span>
                Your Questions, Answered
              </h3>
              <div className="space-y-6">
                {[
                  { icon: "🎯", q: "How do I get more leads?", a: "We'll build you a lead generation machine that works while you sleep" },
                  { icon: "🌐", q: "Is my website working?", a: "We'll turn it into your best salesperson" },
                  { icon: "📱", q: "Should I be on social media?", a: "We'll make it profitable, not a time-suck" },
                  { icon: "🔍", q: "What's SEO all about?", a: "Getting found by people who want to buy from you" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-gray-400/30 pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="text-lg font-semibold text-gray-800">{item.q}</h4>
                    </div>
                    <p className="text-gray-600 ml-11">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Truth Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-[#1e1e20] rounded-xl border border-gray-300 shadow-lg p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 flex items-center">
                <span className="mr-2">🔥</span>
                The Raw Truth About Digital Marketing
              </h3>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Most of what you've been told about online marketing is wrong.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  It's not about posting pretty pictures or getting a million followers who never buy anything.
                </p>
                <motion.div
                  className="mt-8 p-6 rounded-2xl bg-[#18191a] border border-gray-300"
                >
                  <p className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                    It&apos;s about one thing: <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-extrabold">ROI</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Timeline Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto p-8 md:p-12 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
                My Approach to Digital Marketing Strategy
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                I don&apos;t do fluff. I don&apos;t do vanity metrics. I build systems that get you more customers and make you more money.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🗺️",
                title: "1. Map Customer Journey",
                desc: "Figure out exactly how your customers think, from first contact to raving fan",
                points: ["Pain points identification", "Touchpoint mapping", "Behavior analysis"]
              },
              {
                icon: "🏗️",
                title: "2. Build Digital Footprint",
                desc: "Create a seamless system that turns strangers into customers",
                points: ["Website optimization", "SEO implementation", "Social media strategy"]
              },
              {
                icon: "📈",
                title: "3. Optimize for Conversion",
                desc: "Obsess over the details that turn clicks into cash",
                points: ["CRO strategies", "Funnel analysis", "Marketing automation"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.8 }}
              >
                <div className="bg-[#1e1e20] rounded-xl border border-gray-300 shadow-lg p-8 h-full">
                  <div className="text-5xl md:text-6xl mb-6 text-center">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center">{item.title}</h3>
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Keyword Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="max-w-4xl mx-auto p-8 md:p-12 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                🏷️ Our Expertise Tags
              </h3>
              <p className="text-gray-600">Interactive keyword cloud showcasing our CRM capabilities</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {keywords.map((keyword, index) => {
              const props = getKeywordProps(keyword, index);
              return (
                <KeywordTag
                  key={keyword}
                  keyword={keyword}
                  {...props}
                  index={index}
                  isVisible={true}
                />
              );
            })}
          </div>

          {!showAll && (
            <div className="text-center">
              <motion.button
                onClick={() => setShowAll(true)}
                className="px-8 py-4 rounded-full text-white font-semibold overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Show More Keywords
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Floating CTA Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-300 p-8">
            <motion.button
              className="text-xl md:text-3xl font-bold text-gray-800 mb-6 w-full"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Book a Free Strategy Call
            </motion.button>
            <p className="text-gray-600 leading-relaxed">
              Let's talk about how we can 10x your business. No fluff, no hard sell.
              Just a real conversation about your goals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
