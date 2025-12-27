"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Cpu, Music } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    viewport={{ once: true }}
    className="p-10 glass rounded-[3rem] glass-hover"
  >
    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

export const Services = () => {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">Our Expertise.</h2>
          <p className="text-white/30 text-lg font-medium">We don't just build games; we engineer digital worlds with precision and scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            index={0}
            icon={PencilRuler}
            title="Creative Direction"
            desc="Concept art, level design, and UI/UX that feels native and premium to the next generation of players."
          />
          <ServiceCard 
            index={1}
            icon={Cpu}
            title="Technical Excellence"
            desc="High-performance Luau scripting, custom backend solutions, and data-driven gameplay systems."
          />
          <ServiceCard 
            index={2}
            icon={Music}
            title="Immersive Sound"
            desc="Custom spatial audio and original soundtracks designed to deepen player immersion and emotional connection."
          />
        </div>
      </div>
    </section>
  );
};