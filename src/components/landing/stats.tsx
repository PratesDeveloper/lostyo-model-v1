"use client";

import React from 'react';

const StatCard = ({ label, value, description }: { label: string, value: string, description: string }) => (
  <div className="p-6 rounded-2xl bg-[#2B2D31] border border-white/5 text-center">
    <div className="text-3xl md:text-4xl font-bold text-[#5865F2] mb-1">{value}</div>
    <div className="font-semibold text-lg mb-2">{label}</div>
    <div className="text-sm text-gray-400 leading-tight">{description}</div>
  </div>
);

export const Stats = () => {
  return (
    <section id="stats" className="py-20 bg-[#232428]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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