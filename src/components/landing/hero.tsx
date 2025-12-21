"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#0F1012]">
      {/* Refined Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#5865F2]/5 blur-[160px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/[0.03] bg-white/[0.01] text-[9px] font-black uppercase tracking-[0.3em] text-[#5865F2]"
          >
            The New Standard
          </motion.div>
          
          <h1 className="text-7xl md:text-[160px] font-black mb-8 tracking-tighter leading-[0.8] text-white select-none">
            UNIFIED <br />
            <span className="text-white/20 hover:text-[#5865F2] transition-colors duration-700">EXPERIENCE.</span>
          </h1>
          
          <p className="text-white/30 text-xs md:text-sm max-w-lg mx-auto mb-12 leading-relaxed font-bold tracking-widest uppercase opacity-80">
            One ecosystem. Zero friction. <br /> Seamless community management for the elite.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 text-[10px] font-black uppercase tracking-[0.2em] rounded-full group shadow-2xl shadow-[#5865F2]/20 border-none transition-all active:scale-95">
              Add to Discord <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="ghost" className="text-white/30 hover:text-white px-10 h-14 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-colors">
              Documentation
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Floating scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
    </section>
  );
};