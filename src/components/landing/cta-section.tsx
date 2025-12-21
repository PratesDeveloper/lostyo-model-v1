"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-40 bg-[#0B0B0D] border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-[120px] font-black text-white mb-12 tracking-tighter leading-[0.8]">
            GET <br />
            <span className="text-[#5865F2]">STARTED.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-12 h-16 text-[11px] font-black uppercase tracking-[0.3em] rounded-none transition-transform active:scale-95 shadow-none">
              Invite Lostyo
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 px-12 h-16 text-[11px] font-black uppercase tracking-[0.3em] rounded-none shadow-none">
              View Showcase
            </Button>
          </div>
          
          <p className="mt-12 text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">
            Precision tools for elite communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};