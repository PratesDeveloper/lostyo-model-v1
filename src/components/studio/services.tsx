"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Cpu, Music, ChevronRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="p-10 md:p-14 bg-neutral-50 rounded-[3rem] group hover:bg-blue-600 transition-all duration-500"
  >
    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-blue-600 group-hover:bg-white group-hover:scale-110 transition-all mb-10">
      <Icon size={28} />
    </div>
    <h3 className="text-3xl font-black text-neutral-950 group-hover:text-white mb-6 tracking-tighter uppercase">{title}</h3>
    <p className="text-neutral-500 group-hover:text-blue-50 text-base leading-relaxed font-medium mb-10">
      {desc}
    </p>
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:text-white">
      Learn More <ChevronRight size={14} />
    </div>
  </motion.div>
);

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="text-blue-600 text-[11px] font-black uppercase tracking-[0.4em] mb-4">Our Specialization</div>
          <h2 className="text-5xl md:text-8xl font-black text-neutral-950 tracking-tighter uppercase leading-[0.9]">
            ENGINEERING <br /> EXCELLENCE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard index={0} icon={PencilRuler} title="Creative" desc="Next-gen environment design and social UI that redefines player immersion." />
          <ServiceCard index={1} icon={Cpu} title="Technical" desc="Optimized Luau systems and backend architecture built for global scale." />
          <ServiceCard index={2} icon={Music} title="Audio" desc="Custom soundscapes and spatial audio scores for maximum emotional impact." />
        </div>
      </div>
    </section>
  );
};