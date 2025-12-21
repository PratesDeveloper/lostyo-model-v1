"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-48">
      <div className="container mx-auto px-6 text-center">
        <div className="py-32 border-t border-white/5">
          <h2 className="text-6xl md:text-[100px] font-black text-white mb-12 tracking-tighter leading-none">
            JOIN THE <br />
            <span className="text-[#5865F2]">ECOSYSTEM.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-12 h-16 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
              Add to Discord
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white/40 hover:text-white px-12 h-16 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-colors">
              Support Server
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};