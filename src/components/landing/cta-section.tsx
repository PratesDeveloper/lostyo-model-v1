"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-40">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-black border border-white/[0.05] rounded-[60px] p-12 md:p-32 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#5865F2]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
              READY TO <br />
              <span className="text-[#5865F2]">EVOLVE?</span>
            </h2>
            <p className="text-white/30 text-base mb-12 font-medium tracking-tight">
              One minute setup. Infinite possibilities. <br />
              Join the new standard of Discord ecosystems.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 text-[11px] font-black uppercase tracking-widest rounded-full shadow-2xl shadow-[#5865F2]/40 transition-all hover:scale-105 active:scale-95">
                Add to Discord
              </Button>
              <Button size="lg" variant="ghost" className="text-white/40 hover:text-white px-10 h-14 text-[11px] font-black uppercase tracking-widest rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};