"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, index }: { label: string, value: string, index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 segundos de animação
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">
        {label}
      </span>
      <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
        {displayValue}{suffix}
      </span>
    </motion.div>
  );
};

export const Stats = () => {
  const items = [
    { label: "Global Scale", value: "200M+" },
    { label: "Boutique Quality", value: "Premium" },
    { label: "Studio Established", value: "2025" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
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