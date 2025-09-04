'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

const faqData: FAQItem[] = [
  {
    id: 'best-digital-marketing-company',
    question: 'What makes WeThinkDigital the best digital marketing company in Dubai?',
    answer: 'WeThinkDigital stands out as the best digital marketing company in Dubai because we focus on revenue, not vanity metrics. We deliver measurable results with our data-driven approach, combining expert SEO services, conversion optimization, and deep understanding of the UAE market. Our clients see an average ROI of 300%+ within the first year.',
  },
  {
    id: 'seo-services-cost',
    question: 'How much do SEO services in Dubai cost with WeThinkDigital?',
    answer: 'Our SEO services in Dubai are priced based on results, not hours. We offer performance-based pricing starting from AED 5,000/month for small businesses. Unlike other SEO companies in Dubai, we align our success with yours - you only pay premium rates when we deliver premium results. Contact us for a custom quote based on your business goals.',
  },
  {
    id: 'why-choose-wethinkdigital',
    question: 'Why choose WeThinkDigital for SEO service in Dubai over other agencies?',
    answer: 'WeThinkDigital is Dubai\'s leading SEO service provider because we treat your business like our own. We don\'t just optimize websites - we optimize entire revenue funnels. Our team understands Dubai\'s unique market dynamics, uses white-hat SEO techniques, and provides complete transparency. We\'ve helped businesses achieve 723% traffic increases and $2.3M+ in additional revenue.',
  },
  {
    id: 'digital-marketing-results-timeline',
    question: 'How long does it take to see results from digital marketing services in Dubai?',
    answer: 'With our digital marketing services in Dubai, you can expect to see initial improvements within 30-60 days, with significant results typically visible within 3-6 months. SEO services show gradual improvement over time, while PPC and social media marketing can deliver immediate traffic. We provide monthly reports showing your progress and ROI.',
  },
  {
    id: 'local-seo-dubai',
    question: 'Do you provide local SEO services for Dubai businesses?',
    answer: 'Yes! As a Dubai-based digital marketing company, we specialize in local SEO services for businesses targeting customers in Dubai, UAE, and the broader GCC region. We optimize for "near me" searches, Google My Business, local citations, and location-specific keywords to help you dominate local search results in Dubai.',
  },
  {
    id: 'seo-vs-ppc',
    question: 'Should I invest in SEO services or PPC advertising in Dubai?',
    answer: 'The best digital marketing strategy combines both SEO and PPC services. SEO provides long-term sustainable traffic growth, while PPC delivers immediate visibility. As the top digital marketing company in Dubai, we recommend starting with both: PPC for immediate results while SEO builds momentum. This integrated approach maximizes your online presence and ROI.',
  },
];

export default function FAQ() {
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

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about SEO services in Dubai and digital marketing solutions from industry experts.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-800/70 transition-colors focus:outline-none focus:bg-gray-800/70"
                aria-expanded={openItems.has(item.id)}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {item.question}
                  </h3>
                  <motion.svg
                    animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openItems.has(item.id) ? 'auto' : 0,
                  opacity: openItems.has(item.id) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                id={`faq-answer-${item.id}`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Still have questions about our SEO services in Dubai?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary px-8 py-3"
          >
            Get Your Free Consultation
          </motion.button>
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
