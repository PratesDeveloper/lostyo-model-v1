"use client";

import React from 'react';
import { motion, Easing } from 'framer-motion'; // Importando Easing
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, Settings, Lock, BarChart, Globe } from "lucide-react"; // Importando ícones

export const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as Easing } } // Corrigido aqui
  };

  // Ícones para o efeito de animação
  const animatedIcons = [
    { icon: MessageSquare, delay: 0.2, size: 24, opacity: 0.5 },
    { icon: Users, delay: 0.5, size: 32, opacity: 0.3 },
    { icon: Settings, delay: 0.8, size: 28, opacity: 0.4 },
    { icon: Lock, delay: 1.1, size: 20, opacity: 0.2 },
    { icon: BarChart, delay: 1.4, size: 36, opacity: 0.5 },
    { icon: Globe, delay: 1.7, size: 26, opacity: 0.3 },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 px-6 bg-[#0B0B0D] overflow-hidden"> {/* Adicionado overflow-hidden */}
      {/* Efeito de ícones animados */}
      {animatedIcons.map((iconData, index) => (
        <motion.div
          key={index}
          initial={{ x: -200, opacity: iconData.opacity }}
          animate={{ 
            x: [ -200, window.innerWidth + 200 ], // Move para fora da tela
            opacity: [iconData.opacity, 0], // Fade out
            scale: [1, 1.5, 1] // Pequena animação de escala para dar mais vida
          }}
          transition={{
            delay: iconData.delay,
            duration: 15 + Math.random() * 10, // Duração aleatória entre 15 e 25 segundos
            ease: "linear", // Movimento constante
            loop: Infinity // Repete indefinidamente
          }}
          className="absolute top-1/4" // Posição inicial
          style={{
            left: '-100px', // Começa fora da tela à esquerda
            fontSize: `${iconData.size}px`,
            opacity: iconData.opacity,
            color: '#ffffff' // Cor branca para os ícones
          }}
        >
          <iconData.icon size={iconData.size} />
        </motion.div>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-4xl relative z-10" // Adicionado relative z-10 para garantir que fique acima dos ícones
      >
        <motion.div 
          variants={item}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#1A1A1E] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5865F2]"
        >
          Community Management
        </motion.div>
        
        <motion.h1 
          variants={item}
          className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1] text-white"
        >
          The simple way to <br />
          <span className="text-white/20">grow your server.</span>
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Everything you need to manage, protect, and engage your Discord community in one flat, fast ecosystem.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-sm font-bold rounded-full group transition-all">
            Add to Discord <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="ghost" className="bg-[#1A1A1E] text-white/60 hover:text-white px-10 h-14 text-sm font-bold rounded-full">
            View Features
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};