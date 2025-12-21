"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Layout } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-[#141417] p-10 rounded-[3rem] h-full"
  >
    <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-8">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-white/30 text-base leading-relaxed">{desc}</p>
  </motion.div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-32 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Built for the <br /> modern community.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/30 text-lg font-medium"
          >
            No clutter. Just powerful, organized tools that work instantly.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            index={0}
            icon={Shield}
            title="Safe-Guard"
            desc="Automated moderation that learns your server's unique culture and rules."
          />
          <FeatureCard 
            index={1}
            icon={Layout}
            title="Clean Panel"
            desc="A dashboard so intuitive you'll forget you're managing a complex system."
          />
          <FeatureCard 
            index={2}
            icon={Zap}
            title="Instant Sync"
            desc="Changes applied in milliseconds across all your server instances."
          />
        </div>
      </div>
    </section>
  );
};