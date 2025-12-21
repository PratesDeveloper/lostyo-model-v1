"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <nav className="w-full max-w-3xl h-12 border border-white/[0.05] bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-between px-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn.lostyo.com/logo.png?v=2" 
            alt="Lostyo" 
            className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">Lostyo</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/30">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-colors">STATS</a>
          <a href="#install" className="hover:text-white transition-colors">START</a>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-white/40 hover:text-white hover:bg-transparent h-8 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider"
          >
            Login
          </Button>
          <Button 
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-8 px-4 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xl shadow-[#5865F2]/20 transition-transform active:scale-95"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};