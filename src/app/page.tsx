"use client";

import React from 'react';
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { HybridShowcase } from "@/components/landing/hybrid-showcase";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Stats />
        <HybridShowcase />
        <CTASection />
      </main>

      <footer className="py-12 border-t border-white/5 bg-[#1E1F22]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <img src="https://cdn.lostyo.com/logo.png?v=2" alt="Logo" className="w-8 h-8" />
          </div>
          
          <div className="flex gap-8">
            <a href="https://twitter.com/lostyo" className="hover:text-[#5865F2] transition-colors">Twitter</a>
            <a href="https://lostyo.com/support" className="hover:text-[#5865F2] transition-colors">Support</a>
            <a href="https://lostyo.com/terms" className="hover:text-[#5865F2] transition-colors">Terms</a>
            <a href="https://lostyo.com/privacy" className="hover:text-[#5865F2] transition-colors">Privacy</a>
          </div>
          
          <p>© {new Date().getFullYear()} Lostyo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}