"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Chrome, LayoutDashboard, Send } from "lucide-react";

export const CTASection = () => {
  return (
    <section id="install" className="py-24 bg-[#0D0D0E]">
      <div className="container mx-auto px-4">
        <div className="bg-[#00D1FF] rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Send size={200} className="text-black" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 text-black">Ready to Evolve?</h2>
          <p className="text-black/70 text-lg md:text-xl max-w-xl mx-auto mb-10 relative z-10 font-medium">
            Join thousands of servers already using the Lostyo hybrid ecosystem. Install it in seconds.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Button variant="secondary" size="lg" className="h-14 px-8 bg-black text-white hover:bg-zinc-900 gap-2 border-none">
              <Bot size={20} /> Add Bot
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 border-black/20 bg-black/5 hover:bg-black/10 text-black gap-2">
              <Chrome size={20} /> Extension
            </Button>
            <Button variant="ghost" size="lg" className="h-14 px-8 text-black hover:bg-black/5 gap-2 font-bold">
              <LayoutDashboard size={20} /> Open Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};