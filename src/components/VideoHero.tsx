'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface VideoHeroProps {
  className?: string;
}

function HeroContent() {
  return (
    <div className="relative z-10 grid min-h-[680px] w-full items-end gap-12 px-6 pb-16 pt-32 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.7fr)] lg:items-center lg:px-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-accent">
          Growth systems for Dubai businesses
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-8xl">
          Turn search demand into qualified revenue.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
          We build the acquisition system behind your next stage: SEO, conversion-focused websites, and automation your team can measure.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="#contact" className="btn-primary">
            Plan a growth audit
          </Link>
          <Link href="#case-studies" className="btn-secondary">
            See the proof
          </Link>
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="surface max-w-md justify-self-end p-6 sm:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">One recent result</p>
        <p className="mt-6 text-5xl font-bold tracking-[-0.05em] text-primary sm:text-6xl">300%</p>
        <p className="mt-2 text-lg font-semibold text-foreground">revenue increase in 90 days</p>
        <p className="mt-5 border-t border-line pt-5 text-sm leading-6 text-muted">
          Dubai fashion retailer. Rebuilt the acquisition path, cut paid waste, and moved conversion from 4.5% to 12.8%.
        </p>
        <Link href="#case-studies" className="mt-6 inline-flex text-sm font-semibold text-primary hover:text-accent">
          Read the case study <span aria-hidden="true" className="ml-2">↗</span>
        </Link>
      </motion.aside>
    </div>
  );
}

export default function VideoHero({ className = '' }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => undefined);
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  if (!isClient) {
    return (
      <section id="top" className={`relative min-h-[680px] w-full overflow-hidden bg-background ${className}`}>
        <HeroContent />
      </section>
    );
  }

  return (
    <section id="top" className={`relative min-h-[680px] w-full overflow-hidden bg-background ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgb(12_18_17_/_0.7)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_18_17_/_0.94)_0%,rgb(12_18_17_/_0.72)_48%,rgb(12_18_17_/_0.54)_100%)]" />
      </div>

      <HeroContent />

      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin border-2 border-primary border-t-transparent" role="status" aria-label="Loading hero video" />
        </div>
      )}
    </section>
  );
}
