"use client";
import React from 'react';
import { motion, type Variants, type Transition } from 'framer-motion'; // Importando os tipos necessários
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, ShieldCheck } from "lucide-react";

// Definindo os tipos de transição de forma explícita
const defaultTransition: Transition = {
  duration: 0.8,
  ease: "easeOut" // Framer Motion entende strings comuns como 'easeOut'
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: defaultTransition 
  }
};

export const Hero = () => {
  // Depoimentos de usuários
  const testimonials = [
    { id: 1, name: "GamerHub", role: "120k members", text: "Increased engagement by 240% in just one month" },
    { id: 2, name: "DevCommunity", role: "45k members", text: "Moderation time reduced by 85%" },
    { id: 3, name: "ArtLovers", role: "78k members", text: "Built a thriving ecosystem effortlessly" }
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 px-6 bg-[#0B0B0D] overflow-hidden">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#1A1A1E] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5865F2]">
          Community Management
        </motion.div>
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1] text-white"
        >
          The simple way to <br /> <span className="text-white/20">grow your server.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Everything you need to manage, protect, and engage your Discord community in one flat, fast ecosystem.
        </motion.p>
        
        {/* Benefícios únicos */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#5865F2]" size={20} />
            <span className="text-white/80 text-sm font-bold">Automated Moderation</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-[#5865F2]" size={20} />
            <span className="text-white/80 text-sm font-bold">Smart Member Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="text-[#5865F2]" size={20} />
            <span className="text-white/80 text-sm font-bold">Engagement Analytics</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-sm font-bold rounded-full group transition-all"
          >
            Add to Discord <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost" 
            className="bg-[#1A1A1E] text-white/60 hover:text-white px-10 h-14 text-sm font-bold rounded-full"
          >
            View Features
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Depoimentos de usuários */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[#141417] p-6 rounded-2xl border border-[#1A1A1E]"
            >
              <p className="text-white/60 text-sm mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="bg-[#5865F2] w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-[#5865F2] text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};