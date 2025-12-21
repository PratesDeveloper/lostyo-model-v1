"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Layout } from 'lucide-react';

const Feature = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 border border-white/5 bg-[#161719] rounded-2xl hover:border-[#5865F2]/50 transition-colors group">
    <div className="mb-8 text-[#5865F2]">
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <h3 className="text-sm font-black text-white mb-4 uppercase tracking-[0.2em]">{title}</h3>
    <p className="text-white/30 text-xs leading-relaxed font-bold tracking-tight uppercase">{desc}</p>
  </div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-48">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-24">
          <div className="text-[10px] font-black text-[#5865F2] uppercase tracking-[0.5em] mb-6">Core Features</div>
          <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-8">
            BUILT FOR <br />
            COMMUNITIES.
          </h2>
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest leading-relaxed">
            A professional toolkit designed to handle the most complex Discord server requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature 
            icon={Shield}
            title="Moderation"
            desc="Automated systems that protect your server around the clock."
          />
          <Feature 
            icon={Layout}
            title="Management"
            desc="A central dashboard to configure everything in one place."
          />
          <Feature 
            icon={Zap}
            title="Performance"
            desc="Built for speed and reliability, no matter the server size."
          />
        </div>
      </div>
    </section>
  );
};