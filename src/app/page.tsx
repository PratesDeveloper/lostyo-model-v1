"use client";
import React from 'react';
import { Navbar } from '@/components/studio/navbar';
import { Hero } from '@/components/studio/hero';
import { Stats } from '@/components/studio/stats';
import { GameShowcase } from '@/components/studio/game-showcase';
import { Services } from '@/components/studio/services';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Stats />
        <GameShowcase />
        <Services />
        
        <section className="py-40 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-[#F5F5F5] rounded-[5rem] p-20 md:p-32 text-center"
          >
            <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter mb-10 leading-none uppercase">
              HAVE A <br /> PROJECT?
            </h2>
            <p className="text-black/30 text-xl md:text-2xl font-medium mb-14 max-w-2xl mx-auto">
              Partner with a studio that understands the future of immersive play.
            </p>
            <button className="h-20 px-16 bg-[#3B82F6] text-white rounded-full font-black uppercase tracking-widest text-[12px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20">
              Send Inquiry
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="py-24 bg-white border-t border-black/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-8 h-8" />
              <span className="font-black text-2xl tracking-tighter text-black uppercase">Lostyo Studios</span>
            </div>

            <div className="flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-black/30">
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-white transition-colors">Security</Link>
              <a href="https://discord.gg/lostyo" target="_blank" className="hover:text-[#5865F2] transition-colors">Discord</a>
            </div>

            <p className="text-[10px] font-bold text-black/10 uppercase tracking-[0.4em]">
              © 2025 ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}