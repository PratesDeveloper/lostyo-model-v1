"use client";
import React from 'react';
import { Navbar } from '@/components/studio/navbar';
import { Hero } from '@/components/studio/hero';
import { GameShowcase } from '@/components/studio/game-showcase';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303]">
      <Navbar />
      
      <main>
        <Hero />
        <GameShowcase />
        
        {/* Contact CTA */}
        <section className="py-40 px-6">
          <div className="max-w-5xl mx-auto glass rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]" />
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10">
              HAVE A <br /> PROJECT?
            </h2>
            <p className="text-white/40 text-xl font-medium mb-12 max-w-xl mx-auto">
              We're currently accepting new partnerships and projects. Let's build something extraordinary together.
            </p>
            <button className="h-20 px-16 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-110 transition-transform">
              Send an Inquiry
            </button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center font-black text-[10px]">L</div>
             <span className="font-black tracking-tighter text-sm">LOSTYO STUDIOS</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Roblox</a>
          </div>

          <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
            © 2025 Lostyo Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}