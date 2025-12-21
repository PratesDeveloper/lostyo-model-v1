"use client";

import React from 'react';
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { HybridShowcase } from "@/components/landing/hybrid-showcase";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Stats />
        <HybridShowcase />
        <FeaturesGrid />
        <FAQ />
        <CTASection />
      </main>

      <footer className="py-20 bg-[#1E1F22] rounded-t-[4rem]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://cdn.lostyo.com/logo.png?v=2" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-black tracking-tight">Lostyo</span>
              </div>
              <p className="text-white/20 text-sm font-medium max-w-sm leading-relaxed">
                The premium ecosystem for Discord communities. Manage, grow, and protect your server with the most advanced tools available.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Product</h5>
              <ul className="space-y-4 text-white/30 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Support</h5>
              <ul className="space-y-4 text-white/30 text-sm font-medium">
                <li><a href="https://lostyo.com/support" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="https://lostyo.com/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="https://lostyo.com/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/10">
            <p>© {new Date().getFullYear()} Lostyo. Built for builders.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}