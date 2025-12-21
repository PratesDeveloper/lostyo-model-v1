"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center py-24 border-r border-white/5 last:border-r-0"
  >
    <div className="text-6xl font-black text-white mb-2 tracking-tighter">{value}</div>
    <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="border-y border-white/5 bg-[#0B0B0D]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <StatItem value="12,000" label="Communities" index={0} />
          <StatItem value="2.5M" label="Active Users" index={1} />
          <StatItem value="100%" label="Uptime" index={2} />
        </div>
      </div>
    </section>
  );
};