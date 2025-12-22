"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Settings, Lock, BarChart, Globe, Shield, Zap, Heart } from 'lucide-react';

const FeatureItem = ({ 
  icon: Icon, 
  title, 
  desc,
  screenshot
}: { 
  icon: any, 
  title: string, 
  desc: string,
  screenshot?: string
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2rem] bg-[#141417] hover:bg-[#1A1A1E] transition-all duration-300 border border-[#1A1A1E] hover:border-[#5865F2]/30 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#5865F2] transition-colors mb-6">
      <Icon size={24} />
    </div>
    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
    <p className="text-white/30 text-sm leading-relaxed font-medium mb-4">
      {desc}
    </p>
    {screenshot && (
      <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
        <div className="bg-white/5 h-32 flex items-center justify-center">
          <div className="text-white/20 text-xs">[Screenshot Preview]</div>
        </div>
      </div>
    )}
  </motion.div>
);

export const FeaturesGrid = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Smart Logging",
      desc: "Keep track of every action in your server with beautiful, searchable logs.",
      screenshot: true
    },
    {
      icon: Users,
      title: "Role Management",
      desc: "Automate role assignments based on activity, time, or custom triggers.",
      screenshot: true
    },
    {
      icon: Settings,
      title: "Custom Commands",
      desc: "Create your own bot commands without writing a single line of code.",
      screenshot: true
    },
    {
      icon: Lock,
      title: "Security Audit",
      desc: "Identify potential vulnerabilities in your server settings automatically.",
      screenshot: true
    },
    {
      icon: BarChart,
      title: "Activity Insights",
      desc: "Detailed analytics on member growth and engagement patterns.",
      screenshot: true
    },
    {
      icon: Globe,
      title: "Global Profiles",
      desc: "Synchronized user data across multiple servers for a unified experience.",
      screenshot: true
    }
  ];

  return (
    <section className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Granular Control.</h2>
          <p className="text-white/20 text-lg font-medium max-w-xl mx-auto">
            Every tool is built to be powerful yet simple enough for anyone to master.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              screenshot={feature.screenshot ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};