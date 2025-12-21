"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-48 bg-[#0F1012]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-24 md:py-40 text-center border-t border-white/[0.03]"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-6xl md:text-[140px] font-black text-white mb-12 tracking-tighter leading-[0.8]">
              READY TO <br />
              <span className="text-[#5865F2]">START?</span>
            </h2>
            <p className="text-white/20 text-[10px] md:text-xs mb-16 font-black uppercase tracking-[0.4em]">
              Instant deployment. No compromises.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-12 h-16 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 active:scale-95">
                Add to Discord
              </Button>
              <Button size="lg" variant="ghost" className="text-white/30 hover:text-white px-12 h-16 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-colors">
                View Showcase
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};