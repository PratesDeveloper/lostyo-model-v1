"use client";
import React from 'react';
import { Navbar } from '@/components/studio/navbar';
import { Hero } from '@/components/studio/hero';
import { GameShowcase } from '@/components/studio/game-showcase';
import { Services } from '@/components/studio/services';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303]">
      {/* Textura de ruído global */}
      <div className="noise" />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <GameShowcase />
        </motion.div>

        <Services />
        
        {/* Contact CTA */}
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/[0.07] blur-[100px] group-hover:bg-blue-600/[0.1] transition-colors duration-1000" />
            
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10">
              HAVE A <br /> PROJECT?
            </h2>
            <p className="text-white/40 text-xl font-medium mb-12 max-w-xl mx-auto">
              We're currently accepting new partnerships and projects. Let's build something extraordinary together.
            </p>
            <button className="h-20 px-16 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all">
              Send an Inquiry
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 relative bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo Studios" className="w-5 h-5 opacity-50" />
             <span className="font-black tracking-tighter text-xs text-white/50 uppercase">Lostyo Studios</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-[#5865F2] transition-colors">Discord</a>
          </div>

          <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
            © 2025 Lostyo Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}