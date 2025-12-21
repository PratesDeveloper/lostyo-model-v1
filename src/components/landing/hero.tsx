"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 bg-[#0B0B0D]">
      {/* Flat Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-black tracking-[0.5em] text-[#5865F2] uppercase mb-8 block">
              The Professional Choice
            </span>
            
            <h1 className="text-6xl md:text-[100px] font-black mb-10 tracking-tighter leading-[0.9] text-white">
              SIMPLIFIED <br />
              POWER.
            </h1>
            
            <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed font-medium uppercase tracking-tight">
              A clean, flat ecosystem for elite Discord management. <br />
              No fluff. No friction. Just performance.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-[11px] font-black uppercase tracking-widest rounded-none w-full sm:w-auto">
                Add to Discord
              </Button>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 px-10 h-14 text-[11px] font-black uppercase tracking-widest rounded-none w-full sm:w-auto">
                Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};