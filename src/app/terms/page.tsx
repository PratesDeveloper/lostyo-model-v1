"use client";

import React from 'react';
import { Navbar } from "@/components/landing/navbar";
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141417] rounded-[3rem] p-8 md:p-16 border border-[#1A1A1E]"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Terms of Service.</h1>
          
          <div className="space-y-8 text-white/60 font-medium leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By adding LostyoCord to your server or using our dashboard, you agree to comply with these terms and Discord's Developer Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Usage Rights</h2>
              <p>LostyoCord provides tools for community management. You are responsible for any content processed through the bot in your server.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Premium Services</h2>
              <p>Optional paid features are subject to their own pricing. Refunds are handled on a case-by-case basis within 30 days of purchase.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Termination</h2>
              <p>We reserve the right to suspend access to servers that violate Discord's ToS or engage in malicious activity.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}