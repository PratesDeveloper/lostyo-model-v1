"use client";

import React from 'react';
import { motion, Easing } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, Settings, Lock, BarChart, Globe } from "lucide-react";

// Define the type for particle properties
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
  color: string;
}

export const Hero = () => {
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const newParticles: Particle[] = [];
        for (let i = 0; i < 50; i++) { // Number of particles
          newParticles.push({
            id: i,
            x: Math.random() * containerWidth,
            y: Math.random() * containerHeight,
            size: Math.random() * 15 + 5, // Size between 5 and 20
            opacity: Math.random() * 0.4 + 0.1, // Opacity between 0.1 and 0.5
            animationDuration: Math.random() * 10 + 5, // Duration between 5 and 15 seconds
            animationDelay: Math.random() * 5, // Delay between 0 and 5 seconds
            color: `hsl(${Math.random() * 360}, 50%, 50%)` // Random HSL color
          });
        }
        setParticles(newParticles);
      }
    };

    handleResize(); // Initial particle generation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 px-6 bg-[#0B0B0D] overflow-hidden">
      {/* Particle Effects */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 // Start smaller
          }}
          animate={{
            y: [p.y, p.y - 100], // Move upwards
            opacity: [0, p.opacity, 0], // Fade in, stay, fade out
            scale: [p.size / 10, p.size / 5, p.size / 10], // Scale up and down
            rotate: Math.random() * 360 // Random rotation
          }}
          transition={{
            duration: p.animationDuration,
            delay: p.animationDelay,
            ease: "easeInOut",
            loop: Infinity
          }}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            filter: `blur(${p.size * 0.2}px)` // Add blur based on size
          }}
        />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div
          variants={item}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#1A1A1E] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5865F2]"
        >
          Community Management
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1] text-white"
        >
          The simple way to <br />
          <span className="text-white/20">grow your server.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Everything you need to manage, protect, and engage your Discord community in one flat, fast ecosystem.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-sm font-bold rounded-full group transition-all">
            Add to Discord <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="ghost" className="bg-[#1A1A1E] text-white/60 hover:text-white px-10 h-14 text-sm font-bold rounded-full">
            View Features
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};