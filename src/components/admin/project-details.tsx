"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Users, Activity, ExternalLink, 
  Settings, Zap, ShieldCheck, Layers, 
  Terminal, BarChart3, AlertCircle, Cpu
} from 'lucide-react';
import { getProjectDataStores } from '@/app/actions/roblox';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
  roblox_place_id: string;
}

const TechMetric = ({ icon: Icon, label, value, sub, color = "text-blue-500" }: any) => (
  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color} mb-6`}>
      <Icon size={20} />
    </div>
    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</div>
    <div className="text-3xl font-black text-white tracking-tighter mb-1">{value}</div>
    <div className="text-[9px] font-bold text-white/10 uppercase tracking-widest">{sub}</div>
  </div>
);

export const ProjectDetails = ({ project }: { project: Project }) => {
  const [datastores, setDatastores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRealData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'listDataStores', universeId: project.id })
      });
      const data = await response.json();
      setDatastores(data.datastores || []);
    } catch (err) {
      toast.error("Failed to load Cloud data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRealData();
  }, [project.id]);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-widest">
               Cluster Active
             </div>
             <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest">
               ID: {project.id}
             </div>
          </div>
          <h2 className="text-7xl font-black tracking-tighter text-white uppercase leading-none">{project.name}</h2>
          <p className="text-white/30 text-lg font-medium max-w-xl">
             Connected to production universe. System metrics and cloud data synchronization active.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => window.open(`https://www.roblox.com/games/${project.roblox_place_id}`, '_blank')}
            className="h-16 px-10 bg-white text-black rounded-3xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/5"
          >
            Launch Production <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TechMetric icon={Users} label="Daily Peak" value="4.2k" sub="Live Sessions" />
        <TechMetric icon={Zap} label="API Latency" value="12ms" sub="Optimal" color="text-emerald-500" />
        <TechMetric icon={Cpu} label="Compute Load" value="28%" sub="Server Side" color="text-yellow-500" />
        <TechMetric icon={ShieldCheck} label="Sec. Status" value="Safe" sub="Firewall Active" color="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cloud Data Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
              <Database size={16} className="text-blue-500" /> Standard DataStores
            </h3>
            <button className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest">Manage Clusters</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />)
            ) : datastores.length > 0 ? (
              datastores.map((ds, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex justify-between items-center group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-500 transition-colors">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{ds.name}</div>
                      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Last Entry: 2m ago</div>
                    </div>
                  </div>
                  <button className="h-10 px-6 bg-white/5 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Fetch Key
                  </button>
                </div>
              ))
            ) : (
              <div className="p-16 border-2 border-dashed border-white/5 rounded-[3rem] text-center">
                 <AlertCircle size={40} className="text-white/10 mx-auto mb-4" />
                 <p className="text-xs font-black uppercase tracking-widest text-white/20">Cloud Access Required</p>
                 <p className="text-[10px] text-white/10 mt-2">Initialize Roblox Open Cloud credentials to view DataStore clusters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Utilities */}
        <div className="space-y-6">
           <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
              <BarChart3 size={40} className="mb-6 opacity-40" />
              <h4 className="text-2xl font-black tracking-tighter mb-2">Analytics</h4>
              <p className="text-blue-100/50 text-xs font-medium leading-relaxed mb-10">
                 Real-time ingestion of player behavior, retention maps and conversion rates.
              </p>
              <button className="w-full h-14 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                 Open Metrics Hub
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};