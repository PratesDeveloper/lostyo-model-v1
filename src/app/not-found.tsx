"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, MoveRight, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      {/* Noise Texture Overlay */}
      <div className="noise" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">
          <AlertCircle size={14} className="animate-pulse" />
          Protocol Error: 404
        </div>

        <h1 className="text-7xl md:text-[9rem] font-black leading-none tracking-tighter mb-8 text-mask">
          LOST IN <br /> THE VOID.
        </h1>

        <p className="text-white/40 text-base md:text-xl font-medium max-w-lg mx-auto mb-12 leading-relaxed">
          The coordinate you're looking for doesn't exist in our ecosystem. <br className="hidden md:block" /> 
          It might have been redacted or moved to another dimension.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full h-16 px-10 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              Return Home <Home size={18} />
            </button>
          </Link>
          
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full h-16 px-10 glass glass-hover rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-transform text-white">
              To Dashboard <MoveRight size={18} />
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Aesthetic Footer for 404 */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
          Lostyo Studios Internal Systems
        </span>
      </div>
    </div>
  );
}