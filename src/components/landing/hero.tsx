"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 bg-[#F4F4F7]">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <span className="inline-block px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#5865F2] mb-8 shadow-sm">
            Discord Simplified
          </span>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tight leading-[0.9] text-[#1A1A1E]">
            CLEAN. <br />
            <span className="text-[#5865F2]">POWERFUL.</span>
          </h1>
          
          <p className="text-[#6B6B75] text-sm md:text-lg max-w-xl mx-auto mb-12 font-medium">
            Manage your community with a design that feels like the future. Fast, organized, and beautifully rounded.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-[#1A1A1E] hover:bg-black text-white px-10 h-14 text-xs font-bold uppercase tracking-widest rounded-full transition-transform active:scale-95">
              Add to Discord
            </Button>
            <Button size="lg" variant="ghost" className="bg-white hover:bg-gray-50 text-[#1A1A1E] px-10 h-14 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
              Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};