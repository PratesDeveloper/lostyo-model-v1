"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/studio/navbar';
import { Lock, Eye, Server, ShieldCheck, Cpu, Globe } from 'lucide-react';

const SecurityBadge = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 glass rounded-[2.5rem] border border-white/5 flex flex-col gap-6">
    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-black text-white tracking-tighter mb-2">{title}</h3>
      <p className="text-white/30 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-40 pb-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Verified Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Enterprise Grade Security.</h1>
            <p className="text-white/40 text-lg font-medium">
              We engineer our systems with the same precision as our digital worlds. 
              Your data remains encrypted, private, and under your control.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <SecurityBadge 
              icon={Lock}
              title="Secure Auth"
              desc="Full integration with Roblox OAuth 2.0. We never see, store, or process your passwords. Verification is handled directly by the platform."
            />
            <SecurityBadge 
              icon={Eye}
              title="Privacy First"
              desc="Minimal data collection policy. We only store IDs required for permission management and high-fidelity persistence in-game."
            />
            <SecurityBadge 
              icon={Server}
              title="Cloud Encryption"
              desc="All dashboard data is encrypted at rest using AES-256 standards. Our backend is isolated from public access via secure VPCs."
            />
            <SecurityBadge 
              icon={Cpu}
              title="Anti-Exploit"
              desc="Proprietary server-side validation for all Luau scripts, preventing memory injection and unauthorized remote calls."
            />
            <SecurityBadge 
              icon={Globe}
              title="GDPR Ready"
              desc="Compliance with global data protection standards. You can request full data deletion or portability at any time through our portal."
            />
            <SecurityBadge 
              icon={ShieldCheck}
              title="Vulnerability Disclosure"
              desc="Active bug bounty program for security researchers. We prioritize the hardening of our metaverse assets."
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-32 glass rounded-[4rem] p-12 md:p-20 text-center border border-white/5 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">Built for Peace of Mind.</h2>
            <p className="text-white/30 text-lg font-medium mb-10">
              Report a security concern or request a data audit.
            </p>
            <button className="h-16 px-12 glass glass-hover rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform">
              Contact Security Team
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}