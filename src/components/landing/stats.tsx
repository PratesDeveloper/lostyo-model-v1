"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ 
  label, 
  value, 
  index,
  isAnimated = false
}: { 
  label: string, 
  value: string, 
  index: number,
  isAnimated?: boolean 
}) => {
  const [displayValue, setDisplayValue] = useState(isAnimated ? 0 : value);
  
  useEffect(() => {
    if (!isAnimated) return;
    
    const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = 0;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(currentValue));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, isAnimated]);
  
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return val.toString();
    }
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#141417] p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center"
    >
      <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">
        {isAnimated ? formatValue(displayValue) : value}
      </div>
      <div className="text-xs font-bold text-white/20 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section id="stats" className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard value="12000" label="Active Communities" index={0} isAnimated />
          <StatCard value="2500000" label="Total Members" index={1} isAnimated />
          <StatCard value="99.9" label="Core Reliability" index={2} />
        </div>
      </div>
    </section>
  );
};