"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 bg-[#0F1012]">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-block mb-10 px-4 py-1 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-[#5865F2]">
            Elite Discord Management
          </div>
          
          <h1 className="text-7xl md:text-[140px] font-black mb-10 tracking-tighter leading-[0.85] text-white">
            UNIFIED <br />
            <span className="text-white/10">POWER.</span>
          </h1>
          
          <p className="text-white/40 text-xs md:text-sm max-w-lg mx-auto mb-14 leading-relaxed font-bold tracking-widest uppercase">
            Everything you need to scale your community. <br /> 
            Clean, fast, and remarkably simple.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl group shadow-none">
              Add to Discord <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white/40 hover:text-white hover:bg-white/5 px-10 h-14 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
              Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};