"use client";

import React from 'react';
import { Navbar } from "@/components/landing/navbar";
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, Server } from 'lucide-react';

const SecurityFeature = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5">
    <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/40 text-sm font-medium">{desc}</p>
    </div>
  </div>
);

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141417] rounded-[3rem] p-8 md:p-16 border border-[#1A1A1E]"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#5865F2]/10 text-[10px] font-bold uppercase tracking-widest text-[#5865F2] mb-6">
            Privacy First
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Security & Data.</h1>
          
          <p className="text-white/60 text-lg mb-12 font-medium">
            We built LostyoCord with transparency in mind. Your community's safety is our priority.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityFeature 
              icon={Lock} 
              title="End-to-End Auth" 
              desc="We use secure OAuth2 flows. We never see or store your Discord password."
            />
            <SecurityFeature 
              icon={EyeOff} 
              title="Minimal Data" 
              desc="We only store IDs required for bot functionality. No message content is logged permanently."
            />
            <SecurityFeature 
              icon={Server} 
              title="Encrypted Storage" 
              desc="All sensitive configuration data is encrypted at rest in our secure database."
            />
            <SecurityFeature 
              icon={Shield} 
              title="GDPR Compliant" 
              desc="You have the right to request full data deletion at any time through our dashboard."
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}