"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center p-8 border-x border-white/[0.03]"
  >
    <div className="text-5xl font-black text-white mb-2 tracking-tighter">{value}</div>
    <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-20 border-y border-white/[0.03]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <StatItem value="12,000" label="Active Guilds" index={0} />
          <StatItem value="2.5M" label="Users Managed" index={1} />
          <StatItem value="99.9%" label="Core Uptime" index={2} />
        </div>
      </div>
    </section>
  );
};