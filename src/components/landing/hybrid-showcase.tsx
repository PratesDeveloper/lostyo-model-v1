"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';

const Feature = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex gap-6 items-start"
  >
    <div className="mt-1 p-2 rounded-lg bg-[#5865F2]/10 text-[#5865F2]">
      <Icon size={18} strokeWidth={2.5} />
    </div>
    <div>
      <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{title}</h3>
      <p className="text-white/30 text-xs leading-relaxed max-w-xs font-bold tracking-tight">{desc}</p>
    </div>
  </motion.div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-48 bg-[#0F1012]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="text-[9px] font-black text-[#5865F2] uppercase tracking-[0.5em]">The Ecosystem</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                POWER <br />
                REDEFINED.
              </h2>
              <p className="text-white/20 text-sm max-w-md font-bold leading-relaxed uppercase tracking-tighter">
                We've built a platform that scales with your ambition. Professional tools for professional communities.
              </p>
            </div>
            
            <div className="space-y-12">
              <Feature 
                index={0}
                icon={Shield}
                title="Secure Automation"
                desc="Military-grade moderation logic that handles the heavy lifting."
              />
              <Feature 
                index={1}
                icon={Globe}
                title="Instant Dashboard"
                desc="Manage your settings from anywhere with zero latency sync."
              />
              <Feature 
                index={2}
                icon={Zap}
                title="Direct Extension"
                desc="The browser layer that brings web features into Discord."
              />
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
             <motion.div 
               style={{ perspective: 1000 }}
               className="relative z-10 w-full max-w-md"
             >
               <motion.div 
                 animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="p-8 bg-[#161719]/80 backdrop-blur-3xl rounded-[32px] border border-white/[0.05] shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
               >
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/5" />
                      <div className="w-2 h-2 rounded-full bg-white/5" />
                    </div>
                    <div className="h-4 w-4 rounded bg-[#5865F2]/20" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-10 w-full bg-white/[0.02] border border-white/[0.03] rounded-xl flex items-center px-4">
                      <div className="h-1.5 w-24 bg-white/10 rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-[#5865F2] rounded-2xl shadow-[0_0_20px_rgba(88,101,242,0.3)]" />
                      <div className="h-20 bg-white/[0.02] border border-white/[0.03] rounded-2xl" />
                      <div className="h-20 bg-white/[0.02] border border-white/[0.03] rounded-2xl" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-1.5 w-full bg-white/5 rounded-full" />
                      <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                    </div>
                  </div>
               </motion.div>
             </motion.div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5865F2]/10 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};