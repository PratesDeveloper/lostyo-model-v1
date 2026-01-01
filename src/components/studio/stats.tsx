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
      className="p-12 md:p-16 bg-[#F2F3F5] rounded-[4rem] w-full"
    >
      <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#A3A4A6] mb-4">
        {label}
      </div>
      <div className="text-6xl md:text-8xl font-black text-black tracking-tighter">
        {displayValue}{suffix}
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem index={0} label="Global Users" value="200M+" />
          <StatItem index={1} label="Experience" value="Premium" />
          <StatItem index={2} label="Network" value="Active" />
        </div>
      </div>
    </section>
  );
};