"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Database, Users, Code, 
  TrendingUp, AlertTriangle, ExternalLink, 
  Settings, Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
  roblox_place_id: string;
}

interface ProjectDetailsProps {
  project: Project;
}

const mockAnalytics = [
  { day: 'Mon', active: 1200 },
  { day: 'Tue', active: 1500 },
  { day: 'Wed', active: 1100 },
  { day: 'Thu', active: 1800 },
  { day: 'Fri', active: 2500 },
  { day: 'Sat', active: 3200 },
  { day: 'Sun', active: 2800 },
];

const StatBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
    <Icon size={20} className={`${color} mb-3`} />
    <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">{label}</div>
    <div className="text-xl font-black text-white tracking-tighter">{value}</div>
  </div>
);

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <motion.div 
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-white/5">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white mb-1">{project.name}</h2>
          <p className="text-white/40 text-sm font-medium">Place ID: {project.roblox_place_id}</p>
        </div>
        <button 
          onClick={() => window.open(`https://www.roblox.com/games/${project.roblox_place_id}`, '_blank')}
          className="h-10 px-5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-all"
        >
          View Live <ExternalLink size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatBox icon={Users} label="Current Players" value={project.players_count.toLocaleString()} color="text-red-400" />
        <StatBox icon={Zap} label="Server Health" value="99.9%" color="text-emerald-400" />
        <StatBox icon={Database} label="DataStores" value="12 Active" color="text-blue-400" />
        <StatBox icon={AlertTriangle} label="Infractions" value="0 Critical" color="text-yellow-400" />
      </div>

      {/* Analytics Chart */}
      <div className="glass rounded-[2.5rem] p-8 border border-white/5">
        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
          <Activity size={14} /> Daily Active Users (DAU)
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalytics}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}
              />
              <Bar dataKey="active" fill="#ef4444" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 bg-red-600/10 border border-red-500/20 rounded-3xl text-left hover:bg-red-600/20 transition-colors">
          <Database size={24} className="text-red-400 mb-3" />
          <h4 className="text-sm font-black text-white">DataStore Access</h4>
          <p className="text-[10px] font-medium text-white/40">View and edit player data.</p>
        </button>
        <button className="p-6 bg-red-600/10 border border-red-500/20 rounded-3xl text-left hover:bg-red-600/20 transition-colors">
          <Code size={24} className="text-red-400 mb-3" />
          <h4 className="text-sm font-black text-white">API Key Management</h4>
          <p className="text-[10px] font-medium text-white/40">Rotate and manage server keys.</p>
        </button>
        <button className="p-6 bg-red-600/10 border border-red-500/20 rounded-3xl text-left hover:bg-red-600/20 transition-colors">
          <Settings size={24} className="text-red-400 mb-3" />
          <h4 className="text-sm font-black text-white">Server Configuration</h4>
          <p className="text-[10px] font-medium text-white/40">Adjust live game settings.</p>
        </button>
      </div>
    </motion.div>
  );
};