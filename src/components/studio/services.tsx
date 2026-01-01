"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Cpu, Music } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-14 bg-[#F5F5F5] rounded-[4rem] group hover:bg-[#3B82F6] transition-all duration-700"
  >
    <div className="w-16 h-16 rounded-[1.5rem] bg-black/5 flex items-center justify-center text-[#3B82F6] group-hover:bg-white group-hover:text-[#3B82F6] mb-10 transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-3xl font-black text-black group-hover:text-white mb-6 tracking-tighter uppercase">{title}</h3>
    <p className="text-black/40 group-hover:text-white/70 text-base leading-relaxed font-medium transition-colors">
      {desc}
    </p>
  </motion.div>
);

export const Services = () => {
  return (
    <section id="services" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter mb-8 uppercase">Expertise.</h2>
          <p className="text-black/30 text-2xl font-medium">We engineer digital worlds with absolute precision and creative scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            index={0}
            icon={PencilRuler}
            title="Creative"
            desc="Concept art, environment design, and UI/UX that feels premium and natively social."
          />
          <ServiceCard 
            index={1}
            icon={Cpu}
            title="Technical"
            desc="High-performance Luau scripting, custom backend solutions, and robust systems."
          />
          <ServiceCard 
            index={2}
            icon={Music}
            title="Audio"
            desc="Spatial audio and original scores designed to deepen immersion and connection."
          />
        </div>
      </div>
    </section>
  );
};