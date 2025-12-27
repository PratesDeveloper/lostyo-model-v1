"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[100px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          The Gold Standard of Roblox Development
        </div>

        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter text-white mb-8">
          SHAPING <br /> <span className="text-white/20">THE METAVERSE.</span>
        </h1>

        <p className="text-white/40 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
          We engineer hyper-realistic environments and complex systems, 
          bridging the gap between traditional gaming and the new social frontier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="h-16 px-10 glass glass-hover rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
            Explore Experiences <MoveRight size={18} />
          </button>
          <button className="text-white/30 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors">
            Our Studio Culture
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 w-full max-w-5xl flex justify-between items-center px-8 text-white/10 font-black text-sm tracking-[0.5em] uppercase hidden lg:flex">
        <span>GLOBAL SCALE</span>
        <span>•</span>
        <span>BOUTIQUE QUALITY</span>
        <span>•</span>
        <span>EST. 2025</span>
      </div>
    </section>
  );
};