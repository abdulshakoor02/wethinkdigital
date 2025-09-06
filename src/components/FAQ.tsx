'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Floating Particles Component (shared with Keywords/Services sections)
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
      const particleCount = window.innerWidth < 768 ? 10 : 18;
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

interface FAQItem {
  question: string;
  answer: string;
  id: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const categories: Category[] = [
  { id: 'seo', name: 'SEO Services', icon: '🎯', description: 'Search Engine Optimization' },
  { id: 'marketing', name: 'Digital Marketing', icon: '💼', description: 'Marketing Strategies' },
  { id: 'local', name: 'Local Business', icon: '🌐', description: 'Dubai & UAE Focus' },
  { id: 'general', name: 'General Questions', icon: '❓', description: 'Common Inquiries' }
];

const faqData: FAQItem[] = [
  {
    id: 'best-digital-marketing-company',
    category: 'seo',
    question: 'What makes WeThinkDigital the best digital marketing company in Dubai?',
    answer: 'WeThinkDigital stands out as the best digital marketing company in Dubai because we focus on revenue, not vanity metrics. We deliver measurable results with our data-driven approach, combining expert SEO services, conversion optimization, and deep understanding of the UAE market. Our clients see an average ROI of 300%+ within the first year.',
  },
  {
    id: 'seo-services-cost',
    category: 'seo',
    question: 'How much do SEO services in Dubai cost with WeThinkDigital?',
    answer: 'Our SEO services in Dubai are priced based on results, not hours. We offer performance-based pricing starting from AED 5,000/month for small businesses. Unlike other SEO companies in Dubai, we align our success with yours - you only pay premium rates when we deliver premium results. Contact us for a custom quote based on your business goals.',
  },
  {
    id: 'why-choose-wethinkdigital',
    category: 'seo',
    question: 'Why choose WeThinkDigital for SEO service in Dubai over other agencies?',
    answer: 'WeThinkDigital is Dubai\'s leading SEO service provider because we treat your business like our own. We don\'t just optimize websites - we optimize entire revenue funnels. Our team understands Dubai\'s unique market dynamics, uses white-hat SEO techniques, and provides complete transparency. We\'ve helped businesses achieve 723% traffic increases and $2.3M+ in additional revenue.',
  },
  {
    id: 'digital-marketing-results-timeline',
    category: 'marketing',
    question: 'How long does it take to see results from digital marketing services in Dubai?',
    answer: 'With our digital marketing services in Dubai, you can expect to see initial improvements within 30-60 days, with significant results typically visible within 3-6 months. SEO services show gradual improvement over time, while PPC and social media marketing can deliver immediate traffic. We provide monthly reports showing your progress and ROI.',
  },
  {
    id: 'seo-vs-ppc',
    category: 'marketing',
    question: 'Should I invest in SEO services or PPC advertising in Dubai?',
    answer: 'The best digital marketing strategy combines both SEO and PPC services. SEO provides long-term sustainable traffic growth, while PPC delivers immediate visibility. As the top digital marketing company in Dubai, we recommend starting with both: PPC for immediate results while SEO builds momentum. This integrated approach maximizes your online presence and ROI.',
  },
  {
    id: 'local-seo-dubai',
    category: 'local',
    question: 'Do you provide local SEO services for Dubai businesses?',
    answer: 'Yes! As a Dubai-based digital marketing company, we specialize in local SEO services for businesses targeting customers in Dubai, UAE, and the broader GCC region. We optimize for "near me" searches, Google My Business, local citations, and location-specific keywords to help you dominate local search results in Dubai.',
  },
  {
    id: 'getting-started',
    category: 'general',
    question: 'How do I get started with WeThinkDigital?',
    answer: 'Getting started is simple! Contact us for a free strategy consultation where we\'ll analyze your current digital presence, understand your business goals, and create a custom roadmap for growth. We\'ll show you exactly how our services can help you dominate your market in Dubai and beyond.',
  },
  {
    id: 'international-clients',
    category: 'general',
    question: 'Do you work with international clients outside Dubai?',
    answer: 'Absolutely! While we\'re based in Dubai and specialize in the UAE market, we work with clients globally. Our digital marketing expertise translates across markets, and we\'ve successfully helped businesses in the US, Europe, and Asia achieve remarkable growth through our proven strategies.',
  }
];

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = ""
}) => {
  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id;
        const faqCount = faqData.filter(faq => faq.category === category.id).length;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left p-6 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            style={{
              background: isActive 
                ? 'rgba(139, 92, 246, 0.15)' 
                : 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: isActive 
                ? '2px solid rgba(139, 92, 246, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: isActive 
                ? '0 0 25px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                : '0 10px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
            }}
            whileHover={!isActive ? {
              background: 'rgba(255, 255, 255, 0.08)',
              scale: 1.02,
              transition: { duration: 0.2 }
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="font-semibold text-lg">{category.name}</span>
              </div>
              <p className="text-sm opacity-80 mb-1">{category.description}</p>
              <span className="text-xs opacity-60">{faqCount} questions</span>
            </div>
            
            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute right-4 top-1/2 w-1 h-8 rounded-full"
                style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f0abfc 100%)' }}
                initial={{ scale: 0, y: '-50%' }}
                animate={{ scale: 1, y: '-50%' }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
            
            {/* Hover glow effect */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
            }`}
                 style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)' }}
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
};

interface FAQAccordionProps {
  faqs: FAQItem[];
  openItems: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs, 
  openItems, 
  onToggle,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="popLayout">
        {faqs.map((item, index) => {
          const isOpen = openItems.has(item.id);
          
          return (
            <motion.div
              key={item.id}
              layout
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{
                background: isOpen 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(255, 255, 255, 0.08)',
                backdropFilter: isOpen 
                  ? 'blur(18px) saturate(140%)' 
                  : 'blur(15px) saturate(120%)',
                border: isOpen 
                  ? '1px solid rgba(255, 255, 255, 0.15)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isOpen
                  ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
                  : '0 10px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                background: 'rgba(255, 255, 255, 0.1)',
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              {/* Question Header */}
              <motion.button
                onClick={() => onToggle(item.id)}
                className="w-full p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white pr-4 leading-relaxed">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(139, 92, 246, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span className="text-white font-bold text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </motion.div>
                </div>
              </motion.button>
              
              {/* Answer Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                    id={`faq-answer-${item.id}`}
                  >
                    <motion.div
                      className="px-6 pb-6 pt-2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('seo');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenItems(new Set()); // Close all items when switching categories
  };

  const filteredFAQs = faqData.filter(faq => faq.category === activeCategory);

  return (
    <section 
      className="relative min-h-screen py-24 overflow-hidden" 
      ref={ref}
      style={{
        background: `
          radial-gradient(circle at 30% 80%, rgba(120, 119, 198, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(255, 119, 198, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
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
            className="relative max-w-4xl mx-auto p-12 rounded-3xl"
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
              ❓ Frequently Asked Questions
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Get answers about our digital marketing services and SEO solutions from industry experts
            </p>
          </div>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-4 gap-8 mb-20">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              className="lg:sticky lg:top-8"
            />
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FAQAccordion
                faqs={filteredFAQs}
                openItems={openItems}
                onToggle={toggleItem}
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile Category Filter (visible only on mobile) */}
        <div className="lg:hidden mb-8">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.id ? 'text-white' : 'text-gray-300'
                }`}
                style={{
                  background: activeCategory === category.id 
                    ? 'rgba(139, 92, 246, 0.3)' 
                    : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(15px)',
                  border: activeCategory === category.id 
                    ? '1px solid rgba(139, 92, 246, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floating CTA Glass Card */}
        <motion.div
          className="text-center"
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
            <p className="text-gray-200 mb-6 text-lg">
              Still have questions about our SEO services in Dubai?
            </p>
            <motion.button
              className="text-2xl md:text-3xl font-bold text-white mb-4 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              🚀 Get Your Free Consultation
            </motion.button>
            <p className="text-gray-300 leading-relaxed">
              Let's talk about how we can help you dominate your market with proven digital strategies.
            </p>
          </div>
        </motion.div>
      </div>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
