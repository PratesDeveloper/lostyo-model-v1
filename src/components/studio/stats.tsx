"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-10 md:p-14 bg-neutral-50 rounded-[3rem] w-full"
    >
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-4">
        {label}
      </div>
      <div className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter">
        {value.includes('M') || value.includes('+') ? `${displayValue}${suffix}` : value}
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <StatItem index={0} label="Global Users" value="200M+" />
          <StatItem index={1} label="Experience Tier" value="Premium" />
          <StatItem index={2} label="Network Active" value="2025" />
        </div>
      </div>
    </section>
  );
};