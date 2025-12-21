"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5865F2]/10 blur-[120px] rounded-full" 
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.02] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Sparkles size={12} className="text-[#5865F2]" /> Hybrid Discord OS
          </div>
          
          <h1 className="text-6xl md:text-[120px] font-black mb-6 tracking-tighter leading-[0.85] text-white">
            ELEVATE <br />
            <span className="text-[#5865F2]">DISCORD.</span>
          </h1>
          
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium tracking-tight">
            The minimal powerhouse. One ecosystem connecting your community, <br className="hidden md:block" /> management dashboard, and browser interface.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 h-12 text-[11px] font-black uppercase tracking-widest rounded-full group shadow-2xl shadow-white/5">
              Get Started <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="ghost" className="text-white/40 hover:text-white px-8 h-12 text-[11px] font-black uppercase tracking-widest rounded-full">
              Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};