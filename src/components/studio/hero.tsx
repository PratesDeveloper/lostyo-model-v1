"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 bg-white overflow-hidden">
      {/* Detalhe de fundo sutil para preencher o vazio */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl w-full relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8">
          <Sparkles size={12} /> Established 2025
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter mb-10 text-neutral-950">
          WE BUILD <br /> <span className="text-blue-600">PREMIUM</span> <br /> WORLDS.
        </h1>

        <p className="text-neutral-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
          The engineering studio behind high-fidelity social experiences on Roblox. Precision in every pixel, scale in every script.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto h-16 md:h-20 px-12 bg-neutral-950 text-white rounded-3xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all">
            View Work <MoveRight size={20} />
          </button>
          <button className="w-full sm:w-auto h-16 md:h-20 px-12 bg-neutral-100 text-neutral-900 rounded-3xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-neutral-200 transition-all">
            Get in touch
          </button>
        </div>
      </motion.div>
    </section>
  );
};