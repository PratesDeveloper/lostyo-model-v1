"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layout, Zap } from 'lucide-react';

export const HybridShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="py-32 px-6">
      <div className="container mx-auto">
        <div className="bg-white rounded-[60px] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-20 shadow-sm">
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="text-[#5865F2] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Features</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black text-[#1A1A1E] mb-12 tracking-tighter leading-none">
              EVERYTHING <br /> IN ORDER.
            </motion.h2>
            
            <div className="space-y-10">
              {[
                { icon: Shield, title: "Secure", desc: "No-nonsense protection for your server." },
                { icon: Layout, title: "Organized", desc: "A dashboard that actually makes sense." },
                { icon: Zap, title: "Fast", desc: "Real-time updates without the lag." }
              ].map((f, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#F4F4F7] rounded-2xl flex items-center justify-center text-[#5865F2] shrink-0">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1E] mb-1 uppercase tracking-wider">{f.title}</h3>
                    <p className="text-[#6B6B75] text-sm font-medium">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full aspect-square bg-[#F4F4F7] rounded-[40px] p-8 flex items-center justify-center"
          >
            <div className="w-full h-full bg-white rounded-[32px] shadow-sm p-6 flex flex-col gap-4">
              <div className="h-4 w-1/4 bg-[#F4F4F7] rounded-full" />
              <div className="h-12 w-full bg-[#5865F2]/10 rounded-2xl" />
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="bg-[#F4F4F7] rounded-2xl" />
                <div className="bg-[#F4F4F7] rounded-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};