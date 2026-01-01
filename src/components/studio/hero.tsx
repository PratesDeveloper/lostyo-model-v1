"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-32 md:pt-40 pb-16 md:pb-20 px-6 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="text-center max-w-6xl w-full"
      >
        <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-[#F5F5F5] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#3B82F6] mb-8 md:mb-10">
          Architecture & Engineering
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[9rem] font-black leading-[1] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 text-black">
          SHAPING <br className="hidden sm:block" /> THE <span className="text-[#3B82F6]">SOCIAL</span> FRONT.
        </h1>

        <p className="text-black/40 text-base md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto mb-12 md:mb-14 leading-relaxed px-4">
          We bridge the gap between traditional gaming and the social frontier through high-fidelity digital experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
          <button className="w-full sm:w-auto h-16 md:h-20 px-10 md:px-12 bg-black text-white rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg shadow-black/10">
            Our Work <MoveRight size={18} className="md:w-5 md:h-5" />
          </button>
          <button className="w-full sm:w-auto h-16 md:h-20 px-10 md:px-12 bg-[#F5F5F5] text-black rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] flex items-center justify-center hover:bg-[#EAEAEA] transition-all">
            Inquire Project
          </button>
        </div>
      </motion.div>
    </section>
  );
};