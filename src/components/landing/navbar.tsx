"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="w-full max-w-4xl h-14 bg-[#1A1A1E] rounded-full flex items-center justify-between px-2 shadow-xl">
        <div className="flex items-center gap-3 pl-4">
          <img 
            src="/apple-touch-icon.png" 
            alt="LostyoCord" 
            className="w-7 h-7"
          />
          <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#preview" className="hover:text-white transition-colors">Preview</a>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            className="text-white/30 hover:text-white hover:bg-white/5 h-10 px-5 rounded-full text-xs font-bold"
          >
            Login
          </Button>
          <Button 
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-10 px-6 rounded-full text-xs font-bold transition-transform active:scale-95"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};