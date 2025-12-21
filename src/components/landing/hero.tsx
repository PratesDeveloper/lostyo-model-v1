"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Chrome, Globe, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#5865F2]/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        <Badge variant="outline" className="mb-6 border-[#5865F2]/30 text-[#5865F2] bg-[#5865F2]/5 px-4 py-1.5 rounded-full">
          The World's First Official Discord Hybrid
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          One Platform. <br />
          <span className="text-[#5865F2]">Zero Friction.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The only ecosystem that links your Discord Bot, Web Dashboard, and Browser Extension into a single, lightning-fast experience.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] px-8 h-14 text-lg">
            Add to Discord
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 px-8 h-14 text-lg">
            Get Extension
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2"><Bot size={24}/> <span>Discord Bot</span></div>
          <div className="flex items-center gap-2"><Globe size={24}/> <span>Web App</span></div>
          <div className="flex items-center gap-2"><Chrome size={24}/> <span>Extension</span></div>
        </div>
      </div>
    </section>
  );
};