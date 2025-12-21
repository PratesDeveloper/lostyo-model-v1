"use client";

import React from 'react';
import { Bot, Layout, Terminal, Zap, CheckCircle2 } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-5 items-start group">
    <div className="p-4 rounded-2xl bg-[#5865F2]/5 border border-[#5865F2]/10 text-[#5865F2] group-hover:bg-[#5865F2]/10 transition-colors">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-medium">{text}</p>
    </div>
  </div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              A UNIFIED <br />
              <span className="text-[#5865F2]">ECOSYSTEM</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-medium">
              We've bridged the gap between Discord and the Web. Manage your entire community without ever switching tabs.
            </p>
            
            <div className="space-y-10">
              <FeatureItem 
                icon={Bot}
                title="AI Core Automation"
                text="Next-level moderation and event management that evolves with your community."
              />
              <FeatureItem 
                icon={Layout}
                title="Real-time Control"
                text="A lightning-fast web dashboard that reflects changes instantly inside Discord."
              />
              <FeatureItem 
                icon={Zap}
                title="Visual Integration"
                text="Our browser extension adds management overlays directly onto Discord's interface."
              />
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#5865F2]/20 to-indigo-500/20 blur-2xl rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#1E1F22] border border-white/5 rounded-3xl p-6 shadow-2xl overflow-hidden">
               {/* Browser UI header */}
               <div className="flex items-center justify-between mb-8 px-2">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                 </div>
                 <div className="px-3 py-1 rounded-full bg-white/5 text-[9px] text-gray-500 font-bold uppercase tracking-widest border border-white/5">
                   Hybrid Engine v2.0
                 </div>
               </div>

               {/* Mockup content */}
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center">
                      <Terminal size={20} className="text-[#5865F2]" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                      <div className="h-2 w-1/4 bg-white/5 rounded-full" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="h-32 rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-end">
                      <div className="h-2 w-1/2 bg-white/10 rounded-full mb-2" />
                      <div className="h-2 w-1/3 bg-white/5 rounded-full" />
                   </div>
                   <div className="h-32 rounded-2xl bg-[#5865F2] p-4 flex flex-col justify-between">
                      <CheckCircle2 size={24} className="text-white/80" />
                      <div className="h-2 w-1/2 bg-white/30 rounded-full" />
                   </div>
                 </div>

                 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30" />
                    <div className="flex-grow space-y-2">
                      <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};