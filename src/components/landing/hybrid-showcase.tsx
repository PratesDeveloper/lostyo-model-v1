"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 border border-white/5 bg-[#0F0F12] flex flex-col items-start gap-6 group hover:border-[#5865F2]/50 transition-colors duration-300">
    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-[#5865F2] group-hover:text-white transition-all">
      <Icon size={20} />
    </div>
    <div className="space-y-3">
      <h3 className="text-sm font-black text-white uppercase tracking-widest">{title}</h3>
      <p className="text-white/30 text-xs leading-relaxed font-bold tracking-tight uppercase">{desc}</p>
    </div>
  </div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-40 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] font-black text-[#5865F2] uppercase tracking-[0.5em] mb-4 block">The Toolkit</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
              CORE <br />
              INFRASTRUCTURE.
            </h2>
          </div>
          <p className="text-white/20 text-[10px] max-w-xs font-black uppercase tracking-widest leading-loose">
            Built for those who demand precision. A suite of tools that just work, with no unnecessary visual noise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <FeatureCard 
            icon={Shield}
            title="Moderation"
            desc="Flat logic triggers for immediate server protection."
          />
          <FeatureCard 
            icon={Globe}
            title="Management"
            desc="A dashboard focused on data, not decorations."
          />
          <FeatureCard 
            icon={Zap}
            title="Execution"
            desc="Zero-latency commands across the entire platform."
          />
        </div>
      </div>
    </section>
  );
};