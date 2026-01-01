"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-6xl w-full"
      >
        <div className="inline-block px-6 py-2 rounded-full bg-[#F2F3F5] text-[10px] font-black uppercase tracking-[0.3em] text-[#3B82F6] mb-12">
          Experience Engineering
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 text-black">
          WE BUILD <br /> <span className="text-[#3B82F6]">BIG</span> <br /> IDEAS.
        </h1>

        <p className="text-[#666] text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-16 leading-tight">
          High-fidelity digital experiences on Roblox. <br />
          Built with precision, scaled for millions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto h-20 px-14 bg-black text-white rounded-full text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3B82F6] transition-all">
            View Work <MoveRight size={20} />
          </button>
          <button className="w-full sm:w-auto h-20 px-14 bg-[#F2F3F5] text-black rounded-full text-[12px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-[#E5E7EB] transition-all">
            Inquire
          </button>
        </div>
      </motion.div>
    </section>
  );
};