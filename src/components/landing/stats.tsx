"use client";

import React from 'react';

const StatCard = ({ label, value, description }: { label: string, value: string, description: string }) => (
  <div className="p-8 rounded-2xl bg-[#161618] border border-white/5 text-center group hover:border-[#00D1FF]/30 transition-all">
    <div className="text-3xl md:text-4xl font-bold text-[#00D1FF] mb-2">{value}</div>
    <div className="font-semibold text-lg mb-2 text-white">{label}</div>
    <div className="text-sm text-gray-500 leading-tight">{description}</div>
  </div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-20 bg-[#0D0D0E]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            value="12,400+" 
            label="Active Servers" 
            description="Powering communities across the globe every single day."
          />
          <StatCard 
            value="2.5M+" 
            label="Users Managed" 
            description="Helping admins keep their communities safe and engaged."
          />
          <StatCard 
            value="99.99%" 
            label="System Uptime" 
            description="Our hybrid cloud infrastructure never sleeps."
          />
        </div>
      </div>
    </section>
  );
};