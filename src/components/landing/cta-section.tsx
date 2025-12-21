"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="install" className="py-32 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#5865F2] rounded-[4rem] p-16 md:p-32 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Start growing <br /> today.
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-12 font-medium max-w-xl mx-auto">
            Join thousands of communities that trust Lostyo for their daily operations.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-12 h-16 text-base font-bold rounded-full transition-transform hover:scale-105 active:scale-95">
              Add to Discord
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-12 h-16 text-base font-bold rounded-full">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};