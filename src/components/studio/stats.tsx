"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Stats = () => {
  const items = [
    { label: "Global Scale", value: "200M+" },
    { label: "Boutique Quality", value: "Premium" },
    { label: "Studio Established", value: "2025" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">
                {item.label}
              </span>
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};