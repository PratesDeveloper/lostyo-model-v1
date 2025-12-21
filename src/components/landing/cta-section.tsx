"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Chrome, LayoutDashboard, Send } from "lucide-react";

export const CTASection = () => {
  return (
    <section id="install" className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-[#5865F2] rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Send size={200} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Ready to Evolve?</h2>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 relative z-10">
            Join thousands of servers already using the Aether hybrid ecosystem. Install it in seconds.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Button variant="secondary" size="lg" className="h-14 px-8 bg-white text-[#5865F2] hover:bg-white/90 gap-2">
              <Bot size={20} /> Add Bot
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 border-white/20 bg-white/10 hover:bg-white/20 text-white gap-2">
              <Chrome size={20} /> Extension
            </Button>
            <Button variant="ghost" size="lg" className="h-14 px-8 text-white hover:bg-white/10 gap-2">
              <LayoutDashboard size={20} /> Open Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};