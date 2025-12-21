"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-40 bg-[#0F1012]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative py-24 text-center border-t border-white/5"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-6xl md:text-[120px] font-black text-white mb-10 tracking-tighter leading-[0.8]">
              GET <br />
              <span className="text-[#5865F2]">STARTED.</span>
            </h2>
            <p className="text-white/20 text-[10px] mb-12 font-black uppercase tracking-[0.5em]">
              Clean code. Clean design. One click.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 h-14 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all">
                Add to Discord
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};