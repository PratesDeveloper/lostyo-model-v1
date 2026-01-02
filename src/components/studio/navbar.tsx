"use client";
import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-8 px-6">
      <div className="w-full max-w-5xl h-14 glass rounded-full flex items-center justify-between px-6 border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-5 h-5 object-contain" />
          <span className="font-black tracking-tighter text-sm text-white uppercase">Lostyo Studios</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#games" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-colors">Experiences</a>
          <a href="#services" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-colors">Expertise</a>
          <a href="https://discord.gg/lostyo" target="_blank" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-colors">Community</a>
        </div>
        
        {/* O acesso agora é estritamente via gateway secreto /v1/access */}
        <div className="w-5 h-5" /> {/* Spacer para manter o equilíbrio visual */}
      </div>
    </nav>
  );
};