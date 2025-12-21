"use client";

import React from 'react';
import { Bot, Layout, Terminal, Zap } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-4 items-start group">
    <div className="p-3 rounded-xl bg-[#00D1FF]/10 text-[#00D1FF] group-hover:bg-[#00D1FF] group-hover:text-black transition-all">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{text}</p>
    </div>
  </div>
);

export const HybridShowcase = () => {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#0D0D0E]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">The Power of <span className="text-[#00D1FF]">Hybridization</span></h2>
            <p className="text-gray-400 text-lg mb-10">
              Why settle for just a bot? Aether connects everything together so you can manage your server from anywhere, anytime.
            </p>
            
            <div className="space-y-8">
              <FeatureItem 
                icon={Bot}
                title="AI Powered Bot"
                text="Advanced moderation and automation that lives in your Discord server."
              />
              <FeatureItem 
                icon={Layout}
                title="Unified Dashboard"
                text="A beautiful web interface to control your bot settings in real-time."
              />
              <FeatureItem 
                icon={Zap}
                title="Browser Extension"
                text="Inject management tools directly into the Discord web interface."
              />
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#00D1FF] to-cyan-900 opacity-10 blur-3xl absolute inset-0 -z-10" />
            <div className="bg-[#161618] border border-white/10 rounded-2xl p-4 shadow-2xl">
               <div className="flex items-center gap-2 mb-4 px-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 <div className="ml-2 px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest">Hybrid Interface</div>
               </div>
               <div className="space-y-4">
                 <div className="h-4 w-3/4 bg-white/5 rounded" />
                 <div className="h-4 w-1/2 bg-white/5 rounded" />
                 <div className="grid grid-cols-3 gap-4 py-4">
                    <div className="aspect-square bg-[#00D1FF]/20 rounded-xl flex items-center justify-center border border-[#00D1FF]/30">
                      <Terminal className="text-[#00D1FF]" />
                    </div>
                    <div className="aspect-square bg-white/5 rounded-xl" />
                    <div className="aspect-square bg-white/5 rounded-xl" />
                 </div>
                 <div className="h-20 w-full bg-white/5 rounded-xl" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};