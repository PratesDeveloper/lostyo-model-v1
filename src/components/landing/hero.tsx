"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 bg-[#0F1012]">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 inline-block px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-[0.3em] text-[#5865F2]">
            Modern Ecosystem
          </div>
          
          <h1 className="text-6xl md:text-[140px] font-black mb-10 tracking-tighter leading-[0.8] text-white">
            SIMPLY <br />
            <span className="text-white/20">POWERFUL.</span>
          </h1>
          
          <p className="text-white/40 text-xs md:text-sm max-w-md mx-auto mb-12 leading-relaxed font-bold tracking-widest uppercase opacity-80">
            A clean, flat approach to Discord management. <br /> Built for those who value speed and aesthetics.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 text-[10px] font-black uppercase tracking-widest rounded-full transition-all">
              Add to Discord
            </Button>
            <Button size="lg" variant="ghost" className="text-white/20 hover:text-white px-10 h-14 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors">
              Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};