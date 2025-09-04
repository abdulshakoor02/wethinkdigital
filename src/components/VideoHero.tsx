'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface VideoHeroProps {
  className?: string;
}

export default function VideoHero({ className = '' }: VideoHeroProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }, undefined, { suppressHydrationWarning: true });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback background');
    setIsVideoLoaded(false);
  };

  return (
    <div className={`relative w-full h-screen ${className}`}>
      {/* Video Background - Only load on desktop for better performance */}
      {isMounted && !isMobile && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{ objectPosition: 'center' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Fallback background for mobile or when video fails */}
      {(isMobile || !isVideoLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Build Tomorrow&apos;s</span>
            <br />
            <span className="text-white">Digital Experiences Today</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full-stack development + growth marketing that scales from MVP to millions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Start Your Project
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
