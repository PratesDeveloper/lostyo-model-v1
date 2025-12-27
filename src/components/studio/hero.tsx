"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-10 px-6 overflow-hidden">
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

        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 text-mask">
          SHAPING <br className="hidden md:block" /> THE METAVERSE.
        </h1>

        <p className="text-white/40 text-base md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed px-4">
          We engineer hyper-realistic environments and complex systems, 
          bridging the gap between traditional gaming and the social frontier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto h-14 md:h-16 px-10 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
            Our Experiences <MoveRight size={18} />
          </button>
          <button className="w-full sm:w-auto h-14 md:h-16 px-10 glass glass-hover rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:scale-105 transition-transform">
            Inquire Project
          </button>
        </div>
      </motion.div>
    </section>
  );
};