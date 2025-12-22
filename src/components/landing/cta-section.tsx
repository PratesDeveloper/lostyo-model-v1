"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Users, Clock } from 'lucide-react';

export const CTASection = () => {
  const benefits = [
    { icon: ShieldCheck, text: "30-day money-back guarantee" },
    { icon: Zap, text: "Setup in under 60 seconds" },
    { icon: Users, text: "24/7 dedicated support" },
    { icon: Clock, text: "Free forever tier available" }
  ];

  return (
    <section id="install" className="py-32 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#141417] rounded-[3rem] p-12 md:p-20 text-center border border-[#1A1A1E]"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to transform <br /> your community?
            </h2>
            <p className="text-white/60 text-lg mb-12 font-medium max-w-2xl mx-auto">
              Join thousands of communities that trust LostyoCord for their daily operations.
            </p>
            
            {/* Benefícios */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center mb-3">
                      <Icon className="text-[#5865F2]" size={24} />
                    </div>
                    <span className="text-white/80 text-xs font-bold text-center">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 text-sm font-bold rounded-full transition-all"
              >
                Add to Discord
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#2A2A2E] bg-[#1A1A1E] text-white hover:bg-[#2A2A2E] px-10 h-14 text-sm font-bold rounded-full"
              >
                Contact Support
              </Button>
            </div>
            
            {/* Contador de usuários */}
            <div className="mt-10 text-white/40 text-sm font-bold">
              Join 12,000+ communities already using LostyoCord
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};