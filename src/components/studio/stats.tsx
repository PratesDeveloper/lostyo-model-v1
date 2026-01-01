"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-12 bg-[#F5F5F5] rounded-[3.5rem] w-full"
    >
      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-4">
        {label}
      </span>
      <span className="text-5xl md:text-6xl font-black text-black tracking-tighter">
        {displayValue}{suffix}
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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