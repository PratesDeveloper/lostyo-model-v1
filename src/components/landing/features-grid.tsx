"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Settings, Lock, BarChart, Globe } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 rounded-[2rem] bg-[#141417] hover:bg-[#1A1A1E] transition-colors group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#5865F2] transition-colors mb-6">
      <Icon size={24} />
    </div>
    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
    <p className="text-white/30 text-sm leading-relaxed font-medium">
      {desc}
    </p>
  </div>
);

export const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Granular Control.</h2>
          <p className="text-white/20 text-lg font-medium max-w-xl">Every tool is built to be powerful yet simple enough for anyone to master.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureItem 
            icon={MessageSquare}
            title="Smart Logging"
            desc="Keep track of every action in your server with beautiful, searchable logs."
          />
          <FeatureItem 
            icon={Users}
            title="Role Management"
            desc="Automate role assignments based on activity, time, or custom triggers."
          />
          <FeatureItem 
            icon={Settings}
            title="Custom Commands"
            desc="Create your own bot commands without writing a single line of code."
          />
          <FeatureItem 
            icon={Lock}
            title="Security Audit"
            desc="Identify potential vulnerabilities in your server settings automatically."
          />
          <FeatureItem 
            icon={BarChart}
            title="Activity Insights"
            desc="Detailed analytics on member growth and engagement patterns."
          />
          <FeatureItem 
            icon={Globe}
            title="Global Profiles"
            desc="Synchronized user data across multiple servers for a unified experience."
          />
        </div>
      </div>
    </section>
  );
};