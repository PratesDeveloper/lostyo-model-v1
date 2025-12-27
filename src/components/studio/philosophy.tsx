"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Philosophy = () => {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-tight">
              THE <br /> ARCHITECTURE <br /> OF PLAY.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="text-[#5865F2] font-black text-sm">01</span>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Architectural Intent</h4>
                  <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                    Every environment is designed with structural logic and aesthetic purpose, ensuring immersion at every scale.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="text-[#5865F2] font-black text-sm">02</span>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Technical Rigor</h4>
                  <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                    Our codebases are engineered for stability and performance, handling millions of interactions with zero friction.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            {/* Um elemento visual abstrato de vidro para representar a 'Arquitetura' */}
            <div className="absolute inset-0 glass rounded-[4rem] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-2/3 h-2/3 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              </div>
              <img 
                src="https://cdn.lostyo.com/logo.png" 
                alt="Lostyo" 
                className="w-20 h-20 opacity-20 blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};