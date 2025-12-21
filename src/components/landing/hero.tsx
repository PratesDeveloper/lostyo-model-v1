"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Chrome, Globe, ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] aspect-square bg-gradient-to-b from-[#5865F2]/20 to-transparent blur-[160px] opacity-40 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 text-center">
        <Badge variant="outline" className="mb-8 border-white/10 text-gray-300 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full gap-2 text-[13px] font-medium">
          <Sparkles size={14} className="text-[#5865F2]" /> Next-Gen Discord Ecosystem
        </Badge>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
          THE <span className="text-[#5865F2]">HYBRID</span> <br />
          EXPERIENCE.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          The only platform connecting your Bot, Dashboard, and Extension into one seamless, lightning-fast workflow.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] px-10 h-14 text-base font-bold rounded-full group">
            Invite Bot <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 px-10 h-14 text-base font-bold rounded-full text-white">
            Browser Extension
          </Button>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-10 md:gap-20">
          {[
            { icon: Bot, label: "Bot Core" },
            { icon: Globe, label: "Live Panel" },
            { icon: Chrome, label: "Extension" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-500 hover:text-gray-300 transition-colors cursor-default group">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-[#5865F2]/30 transition-colors">
                <item.icon size={20} className="group-hover:text-[#5865F2] transition-colors" />
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};