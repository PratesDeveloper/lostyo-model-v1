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
          className="bg-[#5865F2] rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight relative z-10">
            Start growing <br /> today.
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 font-medium max-w-xl mx-auto relative z-10">
            Join thousands of communities that trust LostyoCord for their daily operations.
          </p>
          
          {/* Benefícios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <Icon className="text-white mb-2" size={24} />
                  <span className="text-white/80 text-sm font-bold">{benefit.text}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 px-12 h-16 text-base font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Add to Discord
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-white hover:bg-white/10 px-12 h-16 text-base font-bold rounded-full"
            >
              Contact Support
            </Button>
          </div>
          
          {/* Contador de usuários */}
          <div className="mt-12 text-white/60 text-sm font-bold relative z-10">
            Join 12,000+ communities already using LostyoCord
          </div>
        </motion.div>
      </div>
    </section>
  );
};