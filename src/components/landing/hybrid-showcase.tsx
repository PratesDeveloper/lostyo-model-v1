"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layout, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-8 border border-white/5 bg-white/[0.01] rounded-[24px]"
  >
    <div className="mb-6 text-[#5865F2]">
      <Icon size={24} />
    </div>
    <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{title}</h3>
    <p className="text-white/30 text-[11px] leading-relaxed font-bold tracking-tight uppercase">{desc}</p>
  </motion.div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-40 bg-[#0F1012]">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-24">
          <div className="text-[9px] font-black text-[#5865F2] uppercase tracking-[0.5em] mb-4">Features</div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            REFINED <br />
            SIMPLICITY.
          </h2>
          <p className="text-white/20 text-xs font-bold leading-relaxed uppercase tracking-widest">
            A comprehensive suite of tools built with a single focus: a clean user experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            index={0}
            icon={Shield}
            title="Moderation"
            desc="Flat logic for complex problems. Keep your server safe without the noise."
          />
          <FeatureCard 
            index={1}
            icon={Layout}
            title="Live Sync"
            desc="Real-time dashboard that reflects changes instantly across all layers."
          />
          <FeatureCard 
            index={2}
            icon={Zap}
            title="Fast Core"
            desc="Built on a zero-friction architecture for maximum performance."
          />
        </div>
      </div>
    </section>
  );
};