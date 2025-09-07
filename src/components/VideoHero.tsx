'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoHeroProps {
  className?: string;
}

export default function VideoHero({ className = '' }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as client-side to avoid hydration issues
    setIsClient(true);
    
    // Set up video event listeners
    if (videoRef.current) {
      const handleCanPlay = () => {
        setIsLoaded(true);
        // Autoplay the video when it's ready
        videoRef.current?.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      };

      videoRef.current.addEventListener('canplay', handleCanPlay);
      
      return () => {
        videoRef.current?.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Don't render video on server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className={`relative w-full h-screen ${className}`}>
        {/* Loading placeholder */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
              linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
            `
          }}
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="text-center px-4 max-w-4xl mx-auto p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Build Tomorrow's</span>
              <br />
              <span className="text-white">Digital Experiences Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Full-stack development + growth marketing that scales from MVP to millions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg">
                Start Your Project
              </button>
              
              <button className="btn-secondary px-8 py-4 text-lg">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-screen ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/dev.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Build Tomorrow's</span>
            <br />
            <span className="text-white">Digital Experiences Today</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            <span className="gradient-text">Full-stack development + growth marketing that scales from MVP to millions</span>
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
              className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
              }}
            >
              Start Your Project
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)'
              }}
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}