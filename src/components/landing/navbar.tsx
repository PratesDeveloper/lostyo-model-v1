"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
    >
      <nav className="w-full max-w-2xl h-11 border border-white/[0.04] bg-[#161719]/60 backdrop-blur-md rounded-full flex items-center justify-between px-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-5 h-5 bg-[#5865F2] rounded-md flex items-center justify-center">
            <img 
              src="https://cdn.lostyo.com/logo.png?v=2" 
              alt="L" 
              className="w-3.5 h-3.5 invert"
            />
          </div>
          <span className="text-[9px] font-black tracking-[0.25em] text-white uppercase">Lostyo</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-8 text-[9px] font-bold tracking-[0.15em] text-white/40">
          <a href="#features" className="hover:text-white transition-all duration-300">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-all duration-300">STATS</a>
          <a href="#install" className="hover:text-white transition-all duration-300">INSTALL</a>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            className="text-white/40 hover:text-white hover:bg-transparent h-7 px-3 rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors"
          >
            Login
          </Button>
          <Button 
            className="bg-white text-black hover:bg-gray-200 h-7 px-4 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};