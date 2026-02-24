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
          'rgba(209, 213, 219, 0.15)',
          'rgba(156, 163, 175, 0.1)',
          'rgba(59, 130, 246, 0.15)',
          'rgba(209, 213, 219, 0.1)',
          'rgba(14, 165, 233, 0.08)'
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
              ? 'rgba(209, 213, 219, 0.08)'
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
  { id: 'crm', name: 'CRM Solutions', icon: '💼', description: 'Customer Relationship Management' },
  { id: 'implementation', name: 'Implementation', icon: '🌐', description: 'Dubai & UAE Focus' },
  { id: 'general', name: 'General Questions', icon: '❓', description: 'Common Inquiries' }
];

const faqData: FAQItem[] = [
  {
    id: 'best-crm-company',
    category: 'crm',
    question: 'What makes ebusiness+ the best CRM solutions provider in Dubai?',
    answer: 'ebusiness+ stands out as the best CRM solutions provider in Dubai because we focus on customer relationships, not just software. We deliver measurable results with our data-driven approach, combining expert CRM implementation, process optimization, and deep understanding of the UAE market. Our clients see an average 40% increase in sales productivity within the first year.',
  },
  {
    id: 'crm-cost',
    category: 'crm',
    question: 'How much do CRM solutions in Dubai cost with ebusiness+?',
    answer: 'Our CRM solutions in Dubai are priced based on your business needs. We offer flexible pricing starting from AED 7,500 for small businesses. Unlike other CRM providers in Dubai, we align our success with yours - we customize the solution to fit your budget and deliver real ROI. Contact us for a custom quote based on your business goals.',
  },
  {
    id: 'why-choose-ebusinessplus',
    category: 'crm',
    question: 'Why choose ebusiness+ for CRM solutions in Dubai over other providers?',
    answer: 'ebusiness+ is Dubai\'s leading CRM solutions provider because we treat your customer relationships like our own. We don\'t just implement CRM - we optimize your entire sales and customer service process. Our team understands Dubai\'s unique market dynamics, provides complete transparency, and delivers measurable results. We\'ve helped businesses achieve 300% increases in lead conversion and significant revenue growth.',
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
            className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${isActive
              ? 'bg-[#1e1e20] text-gray-800 border-gray-300 shadow-lg'
              : 'bg-[#1e1e20] text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-[#252528]'
              }`}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="font-semibold text-lg">{category.name}</span>
              </div>
              <p className="text-sm mb-1 text-gray-600">{category.description}</p>
              <span className="text-xs text-gray-500">{faqCount} questions</span>
            </div>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute right-4 top-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-gray-300 to-gray-500"
                initial={{ scale: 0, y: '-50%' }}
                animate={{ scale: 1, y: '-50%' }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
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
              className={`relative overflow-hidden rounded-2xl group cursor-pointer border ${isOpen
                ? 'bg-[#1e1e20] border-gray-300 shadow-lg'
                : 'bg-[#1e1e20] border-gray-200 hover:border-gray-300'
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
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
                  <h3 className="text-lg font-semibold text-gray-800 pr-4 leading-relaxed">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500 border border-gray-400"
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
                      <div className="p-4 rounded-xl bg-[#18191a] border border-gray-300">
                        <p className="text-gray-600 leading-relaxed">
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
  const [activeCategory, setActiveCategory] = useState('crm');
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
      className="relative min-h-screen py-24 overflow-hidden bg-[#18191a]"
      ref={ref}
    >
      {/* Floating Particles Background */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-800">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
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
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category.id
                  ? 'bg-[#1e1e20] text-gray-800 border-gray-300'
                  : 'bg-[#1e1e20] text-gray-600 border-gray-200'
                  }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-2xl mx-auto p-6 md:p-8 bg-[#1e1e20] rounded-2xl shadow-lg border border-gray-200">
            <p className="text-gray-600 mb-6 text-lg">
              Still have questions about our SEO services in Dubai?
            </p>
            <motion.button
              className="text-2xl md:text-3xl font-bold mb-4 w-full text-gray-800 hover:text-gray-700 transition-all"
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
            <p className="text-gray-600 leading-relaxed">
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
