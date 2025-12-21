"use client";

import React from 'react';
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { HybridShowcase } from "@/components/landing/hybrid-showcase";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0D]">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Stats />
        <HybridShowcase />
        <DashboardPreview />
        <FeaturesGrid />
        <FAQ />
        <CTASection />
      </main>

      <footer className="py-12 bg-[#141417] rounded-t-[3rem] mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="https://cdn.lostyo.com/logo.png?v=2" alt="LostyoCord Logo" className="w-6 h-6 opacity-80" />
              <span className="text-sm font-black tracking-tight text-white/80">LostyoCord</span>
            </div>
            
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="https://lostyo.com/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="https://lostyo.com/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="https://lostyo.com/support" className="hover:text-white transition-colors">Support</a>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
              © {new Date().getFullYear()} LostyoCord
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}