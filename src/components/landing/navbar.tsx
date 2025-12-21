"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn, Cpu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#1E1F22]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-[#5865F2] p-1.5 rounded-lg">
            <Cpu size={20} className="text-white" />
          </div>
          <span>AETHER</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Statistics</a>
          <a href="#install" className="hover:text-white transition-colors">Install</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex gap-2">
            <LogIn size={18} /> Login
          </Button>
          <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white gap-2">
            <LayoutDashboard size={18} /> Dashboard
          </Button>
        </div>
      </div>
    </nav>
  );
};