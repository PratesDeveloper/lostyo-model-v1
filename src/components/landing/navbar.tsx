"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-background/80 backdrop-blur-sm flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#5865F2] flex items-center justify-center">
            <img src="https://cdn.lostyo.com/logo.png?v=2" alt="L" className="w-4 h-4 invert" />
          </div>
          <span className="text-[11px] font-black tracking-[0.3em] uppercase">Lostyo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-widest text-white/40">
          <a href="#features" className="hover:text-[#5865F2] transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-[#5865F2] transition-colors">STATS</a>
          <a href="#install" className="hover:text-[#5865F2] transition-colors">INSTALL</a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="h-9 px-4 text-[10px] font-bold uppercase tracking-widest rounded-none border border-transparent hover:border-white/10 hover:bg-white/5">
            Login
          </Button>
          <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-9 px-6 text-[10px] font-black uppercase tracking-widest rounded-none transition-transform active:scale-95">
            Dashboard
          </Button>
        </div>
      </div>
    </nav>
  );
};