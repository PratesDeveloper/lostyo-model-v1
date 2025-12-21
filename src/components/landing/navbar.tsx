"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl h-14 bg-white rounded-full flex items-center justify-between px-4 shadow-sm"
      >
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
            <img src="https://cdn.lostyo.com/logo.png?v=2" alt="L" className="w-4 h-4 invert" />
          </div>
          <span className="text-xs font-black tracking-widest uppercase">Lostyo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest opacity-40">
          <a href="#features" className="hover:opacity-100 transition-opacity">FEATURES</a>
          <a href="#stats" className="hover:opacity-100 transition-opacity">STATS</a>
          <a href="#install" className="hover:opacity-100 transition-opacity">INSTALL</a>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" className="h-9 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#F4F4F7]">
            Login
          </Button>
          <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-9 px-6 rounded-full text-[10px] font-bold uppercase tracking-widest transition-transform active:scale-95">
            Join
          </Button>
        </div>
      </motion.nav>
    </div>
  );
};