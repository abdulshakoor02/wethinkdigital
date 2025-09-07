'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function Navigation() {
  // Initialize state to prevent hydration mismatch
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Only run on client side to prevent hydration issues

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', name: 'Services', href: '#services' },
    { id: 'case-studies', name: 'Case Studies', href: '#case-studies' },
    { id: 'process', name: 'Process', href: '#process' },
    { id: 'blog', name: 'Blog', href: '/blog' },
    { id: 'team', name: 'Team', href: '#team' },
    { id: 'contact', name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled ? 'border-b border-white/10' : 'bg-transparent'
      }`}
      style={isScrolled ? {
        background: 'rgba(15, 17, 41, 0.95)',
        backdropFilter: 'blur(20px) saturate(150%)',
        boxShadow: '0 10px 30px rgba(139, 92, 246, 0.1)'
      } : {
        background: 'rgba(15, 17, 41, 0.3)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #f0abfc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              WeThinkDigital
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const elementId = item.href.substring(1);
                      const element = document.getElementById(elementId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // If element is not found, keep trying to find it for a longer period
                        // This handles lazy-loaded sections
                        let attempts = 0;
                        const maxAttempts = 50; // Try for up to 5 seconds (50 * 100ms)
                        
                        const findAndScroll = () => {
                          const delayedElement = document.getElementById(elementId);
                          if (delayedElement) {
                            delayedElement.scrollIntoView({ behavior: 'smooth' });
                          } else if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(findAndScroll, 100);
                          }
                        };
                        
                        findAndScroll();
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                // Only run on client side
                if (typeof window !== 'undefined') {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // If element is not found, keep trying to find it for a longer period
                    // This handles lazy-loaded sections
                    let attempts = 0;
                    const maxAttempts = 50; // Try for up to 5 seconds (50 * 100ms)
                    
                    const findAndScroll = () => {
                      const delayedElement = document.getElementById('contact');
                      if (delayedElement) {
                        delayedElement.scrollIntoView({ behavior: 'smooth' });
                      } else if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(findAndScroll, 100);
                      }
                    };
                    
                    findAndScroll();
                  }
                }
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-2 font-semibold text-white rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
              }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{
            background: 'rgba(15, 17, 41, 0.95)',
            backdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)'
          }}
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="block"
              >
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const elementId = item.href.substring(1);
                      const element = document.getElementById(elementId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // If element is not found, keep trying to find it for a longer period
                        // This handles lazy-loaded sections
                        let attempts = 0;
                        const maxAttempts = 50; // Try for up to 5 seconds (50 * 100ms)
                        
                        const findAndScroll = () => {
                          const delayedElement = document.getElementById(elementId);
                          if (delayedElement) {
                            delayedElement.scrollIntoView({ behavior: 'smooth' });
                          } else if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(findAndScroll, 100);
                          }
                        };
                        
                        findAndScroll();
                      }
                    }}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 font-semibold text-white rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
              }}
              onClick={(e) => {
                e.preventDefault();
                // Only run on client side
                if (typeof window !== 'undefined') {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // If element is not found, keep trying to find it for a longer period
                    // This handles lazy-loaded sections
                    let attempts = 0;
                    const maxAttempts = 50; // Try for up to 5 seconds (50 * 100ms)
                    
                    const findAndScroll = () => {
                      const delayedElement = document.getElementById('contact');
                      if (delayedElement) {
                        delayedElement.scrollIntoView({ behavior: 'smooth' });
                      } else if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(findAndScroll, 100);
                      }
                    };
                    
                    findAndScroll();
                  }
                }
                setIsMobileMenuOpen(false);
              }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}