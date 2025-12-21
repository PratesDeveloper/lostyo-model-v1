"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: index * 0.15, duration: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center py-20 px-8 border-r last:border-r-0 border-white/[0.03]"
  >
    <div className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter tabular-nums">{value}</div>
    <div className="text-[9px] font-black text-[#5865F2] uppercase tracking-[0.4em]">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="border-y border-white/[0.03] bg-[#0F1012]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <StatItem value="12K+" label="Active Servers" index={0} />
          <StatItem value="2.5M" label="Users Managed" index={1} />
          <StatItem value="99.9%" label="Reliability" index={2} />
        </div>
      </div>
    </section>
  );
};