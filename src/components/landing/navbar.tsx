"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl h-14 border border-white/[0.08] bg-[#1E1F22]/80 backdrop-blur-xl rounded-2xl flex items-center justify-between px-4 shadow-2xl">
        <div className="flex items-center">
          <img 
            src="https://cdn.lostyo.com/logo.png?v=2" 
            alt="Lostyo" 
            className="w-8 h-8 transition-transform hover:scale-110 duration-300"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[12px] font-bold tracking-widest text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-colors">STATS</a>
          <a href="#install" className="hover:text-white transition-colors">INSTALL</a>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/5 h-9 px-4 rounded-xl text-xs font-bold gap-2"
          >
            <LogIn size={14} /> Login
          </Button>
          <Button 
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-9 px-5 rounded-xl text-xs font-bold shadow-lg shadow-[#5865F2]/20 transition-all hover:translate-y-[-1px]"
          >
            Dashboard
          </Button>
        </div>
      </nav>
    </div>
  );
};