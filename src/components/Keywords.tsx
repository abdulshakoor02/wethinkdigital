
'use client';

import { motion } from 'framer-motion';

const primaryKeywords = [
  'Digital Marketing',
  'Digital Marketing Agency',
  'Business Growth',
  'Website Design & Development',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Lead Generation',
  'HubSpot',
  'Digital Marketing Strategy',
  'Online Marketing',
];

const lsiKeywords = [
  'Digital marketing services',
  'Marketing strategy creation',
  'Customer journey mapping',
  'Brand awareness campaigns',
  'Content creation and distribution',
  'Search engine marketing',
  'Inbound marketing strategies',
  'CRM integration services',
  'Customer relationship management',
  'Digital footprint optimization',
  'Online reputation management',
  'Marketing automation',
  'Sales funnel optimization',
  'Conversion rate optimization',
  'Customer acquisition strategies',
  'Brand advocacy development',
  'Multi-channel marketing',
  'Performance marketing',
  'Growth hacking techniques',
  'Digital transformation services',
];

export default function Keywords() {
  return (
    <section id="keywords" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Ready to Stop Guessing and Start Growing?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You&apos;re here because you know you need to be doing more with your digital marketing.
            <br />
            You&apos;re probably asking yourself:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-white">Your Questions, Answered.</h3>
            <ul className="space-y-4 text-lg text-gray-300">
              <li><strong>How do I get more leads?</strong> I&apos;ll build you a lead generation machine.</li>
              <li><strong>Is my website actually working?</strong> I&apos;ll turn it into your best salesperson.</li>
              <li><strong>Should I be on social media?</strong> I&apos;ll make it a profitable channel, not a time-suck.</li>
              <li><strong>What&apos;s this SEO thing all about?</strong> It&apos;s about getting found by people who want to buy from you. I&apos;ll get you to the top.</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">The Raw Truth About Digital Marketing</h3>
            <p className="text-gray-300 mb-4">
              Look, most of what you&apos;ve been told about online marketing is wrong.
            </p>
            <p className="text-gray-300">
              It&apos;s not about posting pretty pictures or getting a million followers who never buy anything.
            </p>
            <p className="text-gray-300 font-bold mt-4">
              It&apos;s about one thing: ROI.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">My Approach to Digital Marketing Strategy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I don&apos;t do fluff. I don&apos;t do vanity metrics. I build systems that get you more customers and make you more money. It&apos;s that simple.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">1. We Map the Customer Journey</h3>
            <p className="text-gray-300">
              I figure out exactly how your customers think, from the first time they hear about you to the moment they become a raving fan.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>- We identify their pain points.</li>
              <li>- We figure out where they hang out online.</li>
              <li>- We build a plan to reach them at every step.</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">2. We Build Your Digital Footprint</h3>
            <p className="text-gray-300">
              Your website, your social media, your ads - they all need to work together. I&apos;ll build you a seamless system that turns strangers into customers.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>- **Website Design & Development** that&apos;s built to convert.</li>
              <li>- **Search Engine Optimization (SEO)** so you show up when it matters.</li>
              <li>- **Social Media Marketing** that actually builds a community.</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">3. We Optimize for Conversion</h3>
            <p className="text-gray-300">
              Getting traffic is easy. Getting that traffic to buy from you is what I do best. We&apos;ll obsess over the details that turn clicks into cash.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>- **Conversion Rate Optimization (CRO)** to maximize every visitor.</li>
              <li>- **Sales Funnel Optimization** to guide them to the sale.</li>
              <li>- **Marketing Automation** to nurture leads and close deals.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {[...primaryKeywords, ...lsiKeywords].map((keyword, index) => (
            <motion.div
              key={keyword}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-lg p-4 text-center"
            >
              <p className="text-white">{keyword}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg"
            onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book a Free Strategy Call
          </motion.button>
          <p className="text-gray-400 mt-4">
            Let&apos;s talk about how I can 10x your business. No fluff, no hard sell. Just a real conversation about your goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
