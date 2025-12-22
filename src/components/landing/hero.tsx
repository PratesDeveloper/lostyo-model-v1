"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, Settings, Lock, BarChart, Globe, Shield, Zap, Heart, Star, Cloud, ZapIcon, Key, Eye, Mail, Phone, MapPin, Clock, Calendar, Camera, Music, Video, FileText, Download, Upload, Share2, Bookmark, Tag, Gift, Trophy, Target, Flag, Compass, Navigation, Anchor, Wifi, Bluetooth, Battery, WifiIcon } from "lucide-react";

// Define the type for particle properties
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  icon: React.ReactNode;
}

export const Hero = () => {
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const particleIdCounter = React.useRef(50); // Start counter at 50 to avoid conflicts

  // Function to create a new particle
  const createParticle = (id: number, initial: boolean = false): Particle => {
    if (!containerRef.current) {
      return {
        id,
        x: 0,
        y: 0,
        size: 20,
        opacity: 0.5,
        speed: 20,
        icon: <MessageSquare />
      };
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const iconComponents = [
      MessageSquare, Users, Settings, Lock, BarChart, Globe, Shield, Zap, Heart, Star,
      Cloud, ZapIcon, Key, Eye, Mail, Phone, MapPin, Clock, Calendar, Camera,
      Music, Video, FileText, Download, Upload, Share2, Bookmark, Tag, Gift, Trophy,
      Target, Flag, Compass, Navigation, Anchor, Wifi, Bluetooth, Battery, WifiIcon
    ];
    
    const RandomIcon = iconComponents[Math.floor(Math.random() * iconComponents.length)];
    
    // For initial particles, distribute them randomly across the screen
    const initialX = initial ? Math.random() * containerWidth : -100;
    
    return {
      id,
      x: initialX,
      y: Math.random() * containerHeight,
      size: Math.random() * (1.5 - 0.5) + 0.5, // Size between 0.5vh and 1.5vh
      opacity: Math.random() * 0.5 + 0.3, // Opacity between 0.3 and 0.8
      speed: Math.random() * 20 + 10, // Speed between 10 and 30 seconds
      icon: <RandomIcon strokeWidth={1.8} /> // Slightly bolder icons
    };
  };

  // Initialize particles
  React.useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push(createParticle(i, true)); // true for initial particles
    }
    setParticles(initialParticles);
  }, []);

  // Handle particle replacement when they leave the screen
  const handleAnimationComplete = (id: number) => {
    setParticles(prev => {
      // Remove the particle that completed its animation
      const filtered = prev.filter(p => p.id !== id);
      
      // Add a new particle to maintain exactly 50
      const newParticle = createParticle(particleIdCounter.current++);
      return [...filtered, newParticle];
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 px-6 bg-[#0B0B0D] overflow-hidden"
    >
      {/* Particle Effects */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ 
            x: "100vw",
            opacity: [0, p.opacity, 0]
          }}
          transition={{ 
            duration: p.speed,
            ease: "linear"
          }}
          onAnimationComplete={() => handleAnimationComplete(p.id)}
          className="absolute"
          style={{ 
            top: `${p.y}px`,
            opacity: p.opacity,
            left: `${p.x}px`
          }}
        >
          <div 
            className="text-[#5865F2]"
            style={{ 
              width: `${p.size}vh`, 
              height: `${p.size}vh` 
            }}
          >
            {p.icon}
          </div>
        </motion.div>
      ))}

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div variants={item} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#1A1A1E] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5865F2]">
          Community Management
        </motion.div>
        <motion.h1 
          variants={item} 
          className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1] text-white"
        >
          The simple way to <br /> <span className="text-white/20">grow your server.</span>
        </motion.h1>
        <motion.p 
          variants={item} 
          className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Everything you need to manage, protect, and engage your Discord community in one flat, fast ecosystem.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-sm font-bold rounded-full group transition-all"
          >
            Add to Discord <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost" 
            className="bg-[#1A1A1E] text-white/60 hover:text-white px-10 h-14 text-sm font-bold rounded-full"
          >
            View Features
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};