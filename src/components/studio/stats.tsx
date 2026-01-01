"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isNaN(targetValue)) {
      setDisplayValue(0);
      return;
    }
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-8 md:p-12 bg-[#F5F5F5] rounded-[2.5rem] md:rounded-[3.5rem] w-full"
    >
      <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-black/20 mb-3 md:mb-4">
        {label}
      </span>
      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter">
        {value.includes('M') || value.includes('+') ? `${displayValue}${suffix}` : value}
      </span>
    </motion.div>
  );
};

export const Stats = () => {
  const items = [
    { label: "Global Reach", value: "200M+" },
    { label: "High Fidelity", value: "Premium" },
    { label: "Est. Network", value: "2025" }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {items.map((item, index) => (
            <StatItem 
              key={index}
              index={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};