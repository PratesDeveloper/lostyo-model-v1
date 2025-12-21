"use client";

import React from 'react';

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center justify-center py-24 px-8 border-r border-white/5 last:border-r-0">
    <div className="text-6xl font-black text-white mb-4 tracking-tighter">{value}</div>
    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{label}</div>
  </div>
);

export const Stats = () => {
  return (
    <section id="stats" className="border-y border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <StatItem value="12,000+" label="Guilds" />
          <StatItem value="2.5M" label="Users" />
          <StatItem value="99.9%" label="Uptime" />
        </div>
      </div>
    </section>
  );
};