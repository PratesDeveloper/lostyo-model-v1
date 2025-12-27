"use client";
import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="w-full max-w-5xl h-16 glass rounded-full flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">L</div>
          <span className="font-black tracking-tighter text-xl">LOSTYO</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <Link href="#games" className="hover:text-white transition-colors">Experiences</Link>
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#about" className="hover:text-white transition-colors">Studio</Link>
        </div>

        <button className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
          Work with us
        </button>
      </div>
    </nav>
  );
};