'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Mobile Apps', href: '#services' },
      { name: 'Digital Marketing', href: '#services' },
      { name: 'Analytics & CRO', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Process', href: '#process' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Careers', href: '#careers' },
      { name: 'Privacy Policy', href: '#privacy' }
    ]
  };

  const socialIcons = {
    twitter: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
    linkedin: (
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    ),
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    instagram: (
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    )
  };

  return (
    <footer className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 85%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 75% 15%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 45% 45%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
    >
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-800/15 to-fuchsia-900/20 backdrop-blur-sm" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Company Info Card - Takes up more space */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl p-8 h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
              }}
            >
              <h3 className="text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #f0abfc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                WeThinkDigital
              </h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Transforming businesses through innovative digital solutions and data-driven growth strategies.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {Object.entries(socialIcons).map(([social, icon]) => (
                  <motion.a
                    key={social}
                    href={`#${social}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 10px 20px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      {icon}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Cards Grid */}
          <div className="lg:col-span-7 grid md:grid-cols-3 gap-6">
            {/* Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
              }}
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm font-medium block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
              }}
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm font-medium block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
              }}
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm font-medium block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px) saturate(100%)',
            border: '0.5px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0 font-medium">
              © {currentYear} WeThinkDigital. All rights reserved.
            </p>
            
            <div className="flex space-x-8">
              <Link
                href="#privacy"
                className="text-gray-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              
              <Link
                href="#terms"
                className="text-gray-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
              >
                Terms of Service
              </Link>
              
              <Link
                href="#sitemap"
                className="text-gray-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}