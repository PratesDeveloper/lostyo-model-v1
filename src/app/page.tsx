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
        
        {/* CTA Section */}
        <section className="py-20 md:py-40 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-[#F5F5F5] rounded-[3rem] md:rounded-[5rem] p-12 md:p-32 text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-black tracking-tighter mb-8 md:mb-10 leading-none uppercase">
              HAVE A <br className="md:hidden" /> PROJECT?
            </h2>
            <p className="text-black/30 text-lg md:text-2xl font-medium mb-10 md:mb-14 max-w-2xl mx-auto leading-tight">
              Partner with a studio that understands the future of immersive play.
            </p>
            <button className="w-full sm:w-auto h-16 md:h-20 px-10 md:px-16 bg-[#3B82F6] text-white rounded-full font-black uppercase tracking-widest text-[11px] md:text-[12px] hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
              Send Inquiry
            </button>
          </motion.div>
        </section>
      </main>

      {/* Footer redesenhado Estilo Big Games */}
      <footer className="flex justify-center px-4 md:px-6">
        <div className="w-full max-w-5xl bg-[#F5F5F5] rounded-t-[2.5rem] md:rounded-t-[4rem] p-8 md:p-16">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-6 h-6 md:w-8 md:h-8" />
                <span className="font-black text-xl md:text-2xl tracking-tighter text-[#3B82F6] uppercase">Lostyo</span>
              </div>
              <p className="text-[9px] md:text-[10px] font-bold text-black/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Premium Digital Architecture
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-black/40">
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-black transition-colors">Security</Link>
              <a href="https://discord.gg/lostyo" target="_blank" className="hover:text-[#5865F2] transition-colors">Discord</a>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] md:text-[10px] font-bold text-black/10 uppercase tracking-[0.3em] md:tracking-[0.4em] text-center">
              © 2025 LOSTYO STUDIOS.
            </p>
            <div className="flex gap-4">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/5" />
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/5" />
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}