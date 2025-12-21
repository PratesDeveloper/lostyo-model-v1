"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center py-16 px-8 border-r last:border-r-0 border-white/5"
  >
    <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">{value}</div>
    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="border-y border-white/5 bg-[#0F1012]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <StatItem value="12,000+" label="Servers Active" index={0} />
          <StatItem value="2.5M" label="Users Sync" index={1} />
          <StatItem value="100%" label="Uptime Goal" index={2} />
        </div>
      </div>
    </section>
  );
};