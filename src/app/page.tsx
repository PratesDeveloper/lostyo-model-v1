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
        <section className="py-24 md:py-40 px-6 relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 text-center relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/[0.05] blur-[100px]" />
            
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
              HAVE A <br className="hidden md:block" /> PROJECT?
            </h2>
            <p className="text-white/40 text-base md:text-xl font-medium mb-10 max-w-xl mx-auto">
              Partner with a studio that understands the future of immersive play.
            </p>
            <button className="h-16 md:h-20 px-10 md:px-16 bg-white text-black rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">
              Send an Inquiry
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="pt-20 pb-10 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo Studios" className="w-5 h-5" />
                <span className="font-black tracking-tighter text-lg text-white">Lostyo Studios</span>
              </div>
              <p className="text-white/30 text-sm font-medium max-w-xs leading-relaxed">
                Pioneering high-fidelity digital experiences on the Roblox platform through architectural and technical excellence.
              </p>
            </div>

            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-3 text-white/30 text-[11px] font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-3 text-white/30 text-[11px] font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
              © 2025 Lostyo Studios. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-[#5865F2] transition-colors">
                Discord Community
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}