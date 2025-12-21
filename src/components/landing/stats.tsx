"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-12 rounded-[40px] flex flex-col items-center justify-center text-center shadow-sm"
  >
    <div className="text-5xl font-black text-[#1A1A1E] mb-2 tracking-tighter">{value}</div>
    <div className="text-[10px] font-black text-[#5865F2] uppercase tracking-[0.3em]">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard value="12,000" label="Active Guilds" index={0} />
          <StatCard value="2.5M" label="Global Users" index={1} />
          <StatCard value="100%" label="Flat Design" index={2} />
        </div>
      </div>
    </section>
  );
};