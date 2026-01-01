"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="text-center max-w-6xl"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F5F5] text-[10px] font-black uppercase tracking-[0.25em] text-[#3B82F6] mb-10">
          Digital Architecture & Engineering
        </div>

        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter mb-10 text-black">
          SHAPING <br /> THE <span className="text-[#3B82F6]">SOCIAL</span> FRONT.
        </h1>

        <p className="text-black/40 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-14 leading-relaxed px-4">
          We bridge the gap between traditional gaming and the social frontier through high-fidelity digital experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="w-full sm:w-auto h-16 md:h-20 px-12 bg-black text-white rounded-full text-[12px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg shadow-black/10">
            Our Work <MoveRight size={20} />
          </button>
          <button className="w-full sm:w-auto h-16 md:h-20 px-12 bg-[#F5F5F5] text-black rounded-full text-[12px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-[#EAEAEA] transition-all">
            Inquire Project
          </button>
        </div>
      </motion.div>
    </section>
  );
};