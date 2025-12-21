"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
    >
      <nav className="w-full max-w-xl h-12 bg-black/90 border border-white/10 rounded-full flex items-center justify-between px-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3 pl-4">
          <img 
            src="https://cdn.lostyo.com/logo.png?v=2" 
            alt="Logo" 
            className="w-5 h-5 invert"
          />
          <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">Lostyo</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-6 text-[9px] font-bold tracking-widest text-white/40">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-colors">STATS</a>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            className="bg-white text-black hover:bg-gray-200 h-8 px-5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};