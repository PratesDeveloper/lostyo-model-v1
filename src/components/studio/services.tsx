"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Cpu, Music } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="p-12 md:p-16 bg-[#F2F3F5] rounded-[4rem] group hover:bg-[#3B82F6] transition-all duration-500"
  >
    <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-[#3B82F6] mb-12 shadow-sm">
      <Icon size={32} />
    </div>
    <h3 className="text-4xl font-black text-black group-hover:text-white mb-6 tracking-tighter uppercase leading-none">{title}</h3>
    <p className="text-[#666] group-hover:text-white/80 text-lg leading-snug font-medium transition-colors">
      {desc}
    </p>
  </motion.div>
);

export const Services = () => {
  return (
    <section id="services" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="text-[#3B82F6] text-[12px] font-black uppercase tracking-[0.4em] mb-6">Our DNA</div>
          <h2 className="text-6xl md:text-9xl font-black text-black tracking-tighter uppercase leading-[0.85]">
            BUILT TO <br /> <span className="text-[#3B82F6]">LAST.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard index={0} icon={PencilRuler} title="Creative" desc="Premium art direction and environment design for next-gen social play." />
          <ServiceCard index={1} icon={Cpu} title="Technical" desc="High-performance backend systems built for massive concurrent users." />
          <ServiceCard index={2} icon={Music} title="Audio" desc="Spatial soundscapes and original scores that define the social atmosphere." />
        </div>
      </div>
    </section>
  );
};