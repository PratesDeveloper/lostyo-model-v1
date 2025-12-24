"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  Zap, 
  ArrowUpRight,
  Plus,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#141417] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-${color}/20 transition-all`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
        <ArrowUpRight size={12} />
        {change}
      </div>
    </div>
    <h3 className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-2">{title}</h3>
    <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
  </motion.div>
);

export default function DashboardPage() {
  const activeServers = [
    { name: "Gaming Hub", members: "12,402", active: true, icon: "G" },
    { name: "Lostyo Official", members: "45,890", active: true, icon: "L" },
    { name: "Developer Den", members: "2,100", active: true, icon: "D" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">Overview.</h1>
          <p className="text-white/40 font-medium text-lg">Your community health and activity at a glance.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button className="flex-1 md:flex-none h-14 px-8 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-xl shadow-[#5865F2]/20">
            <Plus size={18} className="mr-2" />
            New Server
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Members" value="60,392" change="+12%" icon={Users} color="[#5865F2]" />
        <StatCard title="Messages Sent" value="1.2M" change="+5%" icon={MessageSquare} color="[#5865F2]" />
        <StatCard title="Incidents Blocked" value="242" change="+40%" icon={ShieldCheck} color="[#5865F2]" />
        <StatCard title="Bot Latency" value="24ms" change="99%" icon={Zap} color="[#5865F2]" />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Servers List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase tracking-widest text-xs">Active Communities</h2>
            <button className="text-white/20 hover:text-white text-xs font-bold transition-colors">View All</button>
          </div>
          
          <div className="space-y-3">
            {activeServers.map((server, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#141417] p-5 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 font-black text-xl group-hover:bg-[#5865F2]/10 group-hover:text-[#5865F2] transition-all">
                    {server.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-black tracking-tight text-lg">{server.name}</h4>
                    <p className="text-white/20 text-xs font-bold uppercase tracking-widest">{server.members} Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active</span>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/20">
                    <ExternalLink size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Feed */}
        <div className="space-y-6">
          <h2 className="px-4 text-xl font-black text-white tracking-tight uppercase tracking-widest text-xs">Recent Alerts</h2>
          <div className="bg-[#141417] rounded-[2.5rem] p-8 border border-white/5 h-full min-h-[400px]">
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 4 && <div className="absolute left-5 top-10 bottom-[-20px] w-[2px] bg-white/5" />}
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 z-10">
                    <ShieldCheck size={16} className="text-[#5865F2]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Auto-Mod Triggered</p>
                    <p className="text-white/30 text-xs font-medium mt-1">Spam link detected in #general. User warned.</p>
                    <p className="text-white/10 text-[10px] font-black uppercase mt-2">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}