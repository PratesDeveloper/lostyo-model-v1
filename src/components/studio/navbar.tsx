"use client";
import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="w-full max-w-5xl h-16 glass rounded-full flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="https://cdn.lostyo.com/logo.png" 
            alt="Lostyo Studios" 
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-500" 
          />
          <span className="font-black tracking-tighter text-xl text-white">Lostyo Studios</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <Link href="#games" className="hover:text-white transition-colors">Experiences</Link>
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#about" className="hover:text-white transition-colors">Studio</Link>
        </div>

        <button className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5">
          Work with us
        </button>
      </div>
    </nav>
  );
};