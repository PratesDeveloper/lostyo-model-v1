"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const DashboardPreview = () => {
  return (
    <section id="preview" className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Everything under control.
          </motion.h2>
          <p className="text-white/20 text-lg font-medium max-w-xl mx-auto">
            A clean, fast, and intuitive dashboard to help you focus on what matters: your community.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Mockup de Interface Flat */}
          <div className="bg-[#141417] rounded-[3rem] p-4 md:p-8 aspect-video overflow-hidden shadow-2xl">
            <div className="flex gap-4 h-full">
              {/* Sidebar do Mockup */}
              <div className="hidden md:flex flex-col gap-3 w-16 bg-white/5 rounded-[2rem] p-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-2xl bg-white/5" />
                ))}
              </div>
              {/* Conteúdo do Mockup */}
              <div className="flex-grow flex flex-col gap-6">
                <div className="h-12 bg-white/5 rounded-full w-1/3" />
                <div className="grid grid-cols-3 gap-4 h-full">
                  <div className="col-span-2 bg-white/5 rounded-[2.5rem]" />
                  <div className="flex flex-col gap-4">
                    <div className="h-full bg-white/5 rounded-[2rem]" />
                    <div className="h-full bg-white/5 rounded-[2rem]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};