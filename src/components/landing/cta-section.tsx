"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Chrome, LayoutDashboard, Send, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section id="install" className="py-32">
      <div className="container mx-auto px-6">
        <div className="bg-[#5865F2] rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-[#5865F2]/20">
          {/* Abstract patterns */}
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 select-none">
            <Send size={300} />
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[12px] font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} /> Ready to start?
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">JOIN THE <br />EVOLUTION.</h2>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-12 max-w-lg mx-auto leading-relaxed">
              Experience the power of a truly connected Discord ecosystem. Setup takes less than a minute.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5">
              <Button variant="secondary" size="lg" className="h-16 px-10 rounded-full bg-white text-[#5865F2] hover:bg-gray-100 font-bold text-lg gap-3 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
                <Bot size={22} /> Add to Discord
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold text-lg gap-3">
                <Chrome size={22} /> Extension
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};