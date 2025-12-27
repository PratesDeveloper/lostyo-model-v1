"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/5 blur-[100px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          The Gold Standard of Roblox Development
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-[1.1] md:leading-[0.9] tracking-tighter text-white mb-8">
          SHAPING <br className="hidden md:block" /> <span className="text-white/20">THE METAVERSE.</span>
        </h1>

        <p className="text-white/40 text-base md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed px-4">
          We engineer hyper-realistic environments and complex systems, 
          bridging the gap between traditional gaming and the social frontier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 glass glass-hover rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            Our Experiences <MoveRight size={18} />
          </button>
          <button className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors py-4">
            Inquire Project
          </button>
        </div>
      </motion.div>

      {/* Stats Overlay - Apenas Desktop */}
      <div className="absolute bottom-12 w-full max-w-5xl justify-between items-center px-8 text-white/10 font-black text-[10px] tracking-[0.4em] uppercase hidden lg:flex">
        <span>GLOBAL SCALE</span>
        <span>•</span>
        <span>BOUTIQUE QUALITY</span>
        <span>•</span>
        <span>EST. 2025</span>
      </div>
    </section>
  );
};