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
        
        {/* Seção de Colaborações (Social Proof) */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-12">
              Collaborating with industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="font-black text-2xl tracking-tighter">ROBLOX</span>
              <span className="font-black text-2xl tracking-tighter">GUCCI</span>
              <span className="font-black text-2xl tracking-tighter">NIKE</span>
              <span className="font-black text-2xl tracking-tighter">NETFLIX</span>
            </div>
          </div>
        </section>

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
              Partner with a studio that understands the future of immersive play.
            </p>
            <button className="h-20 px-16 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all">
              Send an Inquiry
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="pt-24 pb-12 border-t border-white/5 relative bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Logo e Descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo Studios" className="w-6 h-6" />
                <span className="font-black tracking-tighter text-xl text-white">Lostyo Studios</span>
              </div>
              <p className="text-white/30 text-sm font-medium max-w-sm leading-relaxed">
                Pioneering high-fidelity digital experiences on the Roblox platform. We blend architectural design with technical excellence.
              </p>
            </div>

            {/* Links de Suporte */}
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-white/40 text-[11px] font-bold uppercase tracking-wider">
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brand Assets</a></li>
              </ul>
            </div>

            {/* Links Legais */}
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-white/40 text-[11px] font-bold uppercase tracking-wider">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest order-2 md:order-1">
              © 2025 Lostyo Studios. All rights reserved.
            </p>
            
            <div className="flex items-center gap-8 order-1 md:order-2">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#5865F2]/20 transition-all">
                  <span className="text-white/40 group-hover:text-[#5865F2] text-xs font-black">D</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Discord Community</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}