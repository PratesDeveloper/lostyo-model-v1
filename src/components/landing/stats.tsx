"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-[#141417] p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center"
  >
    <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">{value}</div>
    <div className="text-xs font-bold text-white/20 uppercase tracking-widest">{label}</div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard value="12,000+" label="Active Communities" index={0} />
          <StatCard value="2.5M" label="Total Members" index={1} />
          <StatCard value="99.9%" label="Core Reliability" index={2} />
        </div>
      </div>
    </section>
  );
};