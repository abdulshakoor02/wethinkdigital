'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface ThreeHeroProps {
  className?: string;
}

export default function ThreeHero({ className = '' }: ThreeHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const handle = requestIdleCallback(() => {
      const currentMount = mountRef.current;
      if (!currentMount) return;

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x6b46c1, 0.4);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0x3b82f6, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Create digital ecosystem
      const nodes: THREE.Mesh[] = [];
      const connections: THREE.Line[] = [];
      
      // Create nodes
      for (let i = 0; i < 20; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6),
          transparent: true,
          opacity: 0.8
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        
        nodes.push(node);
        scene.add(node);
      }

      // Create connections
      for (let i = 0; i < 10; i++) {
        const start = nodes[Math.floor(Math.random() * nodes.length)];
        const end = nodes[Math.floor(Math.random() * nodes.length)];
        
        if (start !== end) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            start.position,
            end.position
          ]);
          
          const material = new THREE.LineBasicMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.3
          });
          
          const line = new THREE.Line(geometry, material);
          connections.push(line);
          scene.add(line);
        }
      }

      // Central sphere
      const centralGeometry = new THREE.SphereGeometry(1, 32, 32);
      const centralMaterial = new THREE.MeshPhongMaterial({
        color: 0x6b46c1,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      });
      const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial);
      scene.add(centralSphere);

      camera.position.z = 8;

      // Animation loop
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate nodes
        nodes.forEach((node, index) => {
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
          
          // Pulsing effect
          const scale = 1 + Math.sin(Date.now() * 0.001 + index) * 0.2;
          node.scale.setScalar(scale);
        });

        // Rotate central sphere
        centralSphere.rotation.x += 0.005;
        centralSphere.rotation.y += 0.005;

        // Mouse interaction
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();
      setIsLoaded(true);

      // Handle resize
      const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (currentMount && renderer.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    return () => cancelIdleCallback(handle);
  }, []);

  return (
    <div className={`relative w-full h-screen ${className}`}>
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full"
      />
      
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

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}