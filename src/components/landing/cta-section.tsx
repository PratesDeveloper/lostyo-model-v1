"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-32 px-6 bg-[#F4F4F7]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1A1A1E] rounded-[80px] py-24 px-12 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            START <br /> <span className="text-[#5865F2]">NOW.</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-md mx-auto mb-12 font-medium">
            Join thousands of communities using the most organized system on Discord.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-12 h-16 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95">
              Add to Discord
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-12 h-16 rounded-full text-xs font-bold uppercase tracking-widest">
              Live Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};