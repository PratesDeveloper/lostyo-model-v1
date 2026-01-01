"use client";
import React from 'react';
import { Navbar } from '@/components/studio/navbar';
import { Hero } from '@/components/studio/hero';
import { Stats } from '@/components/studio/stats';
import { GameShowcase } from '@/components/studio/game-showcase';
import { Services } from '@/components/studio/services';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Github, Twitter, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Stats />
        <GameShowcase />
        <Services />
        
        <section className="py-20 md:py-40 px-6">
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

      <footer className="px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-[#F5F5F5] rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {/* Branding */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-10 h-10 object-contain" />
                <span className="font-black text-3xl tracking-tighter text-black uppercase">Lostyo</span>
              </Link>
              <p className="text-black/40 text-lg font-medium max-w-sm mb-10 leading-relaxed">
                Engineering high-fidelity social experiences and digital architecture for the modern frontier.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, MessageSquare].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 bg-black/5 hover:bg-[#3B82F6] hover:text-white rounded-full flex items-center justify-center text-black/40 transition-all duration-300">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Experience', 'Services', 'Contact', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-black text-black/60 hover:text-[#3B82F6] flex items-center gap-2 group transition-colors">
                      {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-8">Legal</h4>
              <ul className="space-y-4">
                {['Terms', 'Security', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-sm font-black text-black/60 hover:text-[#3B82F6] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/10">
              © 2025 Lostyo Studios Core.
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black/20">System Live // Node 01</span>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </footer>
    </div>
  );
}