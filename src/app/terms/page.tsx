"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/studio/navbar';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';

const Section = ({ title, content, icon: Icon }: any) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
        <Icon size={20} />
      </div>
      <h2 className="text-2xl font-black text-white tracking-tighter">{title}</h2>
    </div>
    <div className="text-white/40 leading-relaxed font-medium space-y-4 pl-14">
      {content}
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
              Legal Framework
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Terms of Service.</h1>
            <p className="text-white/30 text-lg font-medium max-w-xl mx-auto">
              Please review the protocols governing the use of Lostyo Studios' systems and assets.
            </p>
          </motion.div>

          <div className="glass rounded-[3rem] p-10 md:p-20 border border-white/5">
            <Section 
              icon={Scale}
              title="1. Acceptance of Protocol"
              content={
                <p>By accessing the Lostyo Studios dashboard or using our integrated Roblox experiences, you acknowledge and agree to be bound by these Terms of Service and all applicable laws and regulations in the metaverse ecosystem.</p>
              }
            />

            <Section 
              icon={FileText}
              title="2. Intellectual Property"
              content={
                <>
                  <p>All source code, environments, custom Luau scripts, and visual assets developed by Lostyo Studios are protected by international copyright and intellectual property laws.</p>
                  <p>Unauthorized distribution, reverse engineering, or asset extraction is strictly prohibited and subject to DMCA protocols and platform-level sanctions.</p>
                </>
              }
            />

            <Section 
              icon={Shield}
              title="3. User Conduct"
              content={
                <p>Users are expected to maintain the integrity of our communities. Exploiting, hacking, or attempting to bypass security layers within our experiences will result in immediate and permanent termination of access across the entire Lostyo ecosystem.</p>
              }
            />

            <Section 
              icon={AlertCircle}
              title="4. Limitation of Liability"
              content={
                <p>Lostyo Studios provides its services "as is". While we strive for 99.9% uptime and peak performance, we are not liable for any platform-side fluctuations (Roblox outages) or data loss resulting from unauthorized third-party tools.</p>
              }
            />

            <div className="pt-12 border-t border-white/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
                Last updated: October 2025 • Revision 2.1
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}