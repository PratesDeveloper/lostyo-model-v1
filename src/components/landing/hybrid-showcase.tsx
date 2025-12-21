"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Layout } from 'lucide-react';

const Feature = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#5865F2]">
      <Icon size={20} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>
    <p className="text-white/30 text-sm leading-relaxed max-w-xs">{desc}</p>
  </motion.div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-[10px] font-black text-[#5865F2] uppercase tracking-[0.4em] mb-4">Architecture</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter leading-tight">
              A MASTERPIECE <br />
              OF INTEGRATION.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Feature 
                index={0}
                icon={Bot}
                title="AI Automation"
                desc="Smart logic that scales with your community needs."
              />
              <Feature 
                index={1}
                icon={Layout}
                title="Live Panel"
                desc="Zero latency control over every single setting."
              />
              <Feature 
                index={2}
                icon={Zap}
                title="Direct Injection"
                desc="Extension layer for native Discord management."
              />
            </div>
          </div>
          
          <div className="relative">
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 p-1 bg-black rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(88,101,242,0.1)]"
             >
               <div className="bg-[#1E1F22] rounded-[36px] overflow-hidden aspect-video flex flex-col p-6">
                  <div className="flex gap-1.5 mb-8">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-1/3 bg-white/5 rounded-full" />
                    <div className="h-8 w-full bg-white/[0.02] border border-white/[0.05] rounded-xl" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-2xl" />
                      <div className="h-24 bg-white/[0.02] border border-white/[0.05] rounded-2xl" />
                    </div>
                  </div>
               </div>
             </motion.div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5865F2]/20 blur-[60px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};