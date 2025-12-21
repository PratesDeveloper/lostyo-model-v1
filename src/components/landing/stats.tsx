"use client";

import React from 'react';

const StatCard = ({ label, value, description }: { label: string, value: string, description: string }) => (
  <div className="p-8 rounded-3xl bg-[#1E1F22] border border-white/[0.03] text-center transition-all hover:border-white/10 hover:bg-[#232428] relative group overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5865F2]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{value}</div>
    <div className="font-bold text-gray-200 text-sm uppercase tracking-[0.2em] mb-3">{label}</div>
    <div className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto font-medium">{description}</div>
  </div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-24 bg-[#1E1F22]/50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,101,242,0.03)_0%,transparent_70%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            value="12K+" 
            label="Servers" 
            description="Powering major communities worldwide."
          />
          <StatCard 
            value="2.5M" 
            label="Managed" 
            description="Active users within our ecosystem."
          />
          <StatCard 
            value="99.9%" 
            label="Uptime" 
            description="Engineered for high-availability."
          />
        </div>
      </div>
    </section>
  );
};