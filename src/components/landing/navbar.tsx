"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
      <nav className="w-full max-w-4xl h-14 border border-white/10 bg-[#161719] rounded-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.lostyo.com/logo.png?v=2" 
            alt="Logo" 
            className="w-6 h-6 invert"
          />
          <span className="text-xs font-black tracking-[0.3em] uppercase">Lostyo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-widest text-white/40">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-colors">STATS</a>
          <a href="#install" className="hover:text-white transition-colors">INSTALL</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-[10px] font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors">
            Login
          </button>
          <Button 
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-9 px-6 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-none"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </div>
  );
};