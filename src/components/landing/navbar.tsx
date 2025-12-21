"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.05] bg-[#1E1F22]/70 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.lostyo.com/logo.png?v=2" 
            alt="Lostyo" 
            className="w-9 h-9 transition-transform hover:scale-110 duration-300"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-wide text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#stats" className="hover:text-white transition-colors">STATS</a>
          <a href="#install" className="hover:text-white transition-colors">GET STARTED</a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 hidden sm:flex gap-2 text-sm font-medium">
            <LogIn size={16} /> Login
          </Button>
          <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-5 h-9 rounded-full text-sm font-semibold shadow-lg shadow-[#5865F2]/20 transition-all hover:translate-y-[-1px]">
            Dashboard
          </Button>
        </div>
      </div>
    </nav>
  );
};