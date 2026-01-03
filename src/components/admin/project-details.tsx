"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Users, Activity, ExternalLink, 
  Settings, Zap, ShieldCheck, Layers, 
  Terminal, BarChart3, AlertCircle, Cpu, Award, ShoppingBag, TrendingUp
} from 'lucide-react';
import { robloxUtils } from '@/lib/roblox-utils';
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
  <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden group backdrop-blur-sm">
    <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
      <Icon size={80} />
    </div>
    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${color} mb-8 shadow-2xl`}>
      <Icon size={24} />
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">{label}</div>
    <div className="text-4xl font-black text-white tracking-tighter mb-1">{value}</div>
    <div className="text-[10px] font-bold text-white/10 uppercase tracking-widest">{sub}</div>
  </div>
);

export const ProjectDetails = ({ project }: { project: Project }) => {
  const [datastores, setDatastores] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dsRes = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'listDataStores', universeId: project.id })
      });
      const dsData = await dsRes.json();
      setDatastores(dsData.datastores || []);

      const badgeRes = await robloxUtils.getGameBadges(project.id);
      setBadges(badgeRes.data || []);
    } catch (err) {
      toast.error("Failed to load production data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [project.id]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Info */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="px-5 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest">
               Cluster Operational
             </div>
             <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/20 uppercase tracking-widest">
               UNIV {project.id}
             </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">{project.name}</h2>
          <p className="text-white/30 text-xl font-medium max-w-2xl leading-relaxed">
             Centralized node for production management. Cloud data synchronization and high-fidelity metrics active.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => window.open(`https://www.roblox.com/games/${project.roblox_place_id}`, '_blank')}
            className="h-20 px-12 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-white/5"
          >
            Launch Experience <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TechMetric icon={Users} label="Daily Users" value="8.4k" sub="+12% growth" />
        <TechMetric icon={TrendingUp} label="Retention" value="42%" sub="High Tier" color="text-emerald-500" />
        <TechMetric icon={ShoppingBag} label="Avg. ARPU" value="R$12" sub="Optimized" color="text-yellow-500" />
        <TechMetric icon={Cpu} label="System Load" value="18%" sub="Nominal" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Data & Badges */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-4">
              <Database size={20} className="text-blue-500" /> DataStore Clusters
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className="h-28 bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-pulse" />)
              ) : datastores.length > 0 ? (
                datastores.map((ds, i) => (
                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex justify-between items-center group hover:border-blue-500/30 transition-all backdrop-blur-md">
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-500 transition-colors">
                        <Terminal size={24} />
                      </div>
                      <div>
                        <div className="text-xl font-black text-white uppercase tracking-tighter">{ds.name}</div>
                        <div className="text-[10px] font-bold text-white/10 uppercase tracking-widest mt-1">Status: Synced // Key Cluster active</div>
                      </div>
                    </div>
                    <button className="h-12 px-8 bg-white/5 hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                      Access Data
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-20 border-2 border-dashed border-white/5 rounded-[3.5rem] text-center">
                   <AlertCircle size={48} className="text-white/5 mx-auto mb-6" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Awaiting Open Cloud Authentication</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-4">
              <Award size={20} className="text-yellow-500" /> Registered Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.length > 0 ? badges.map((badge, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-yellow-500/30 transition-all backdrop-blur-md">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden">
                    <img src={badge.iconImageId ? `https://www.roblox.com/asset-thumbnail/image?assetId=${badge.iconImageId}&width=150&height=150&format=png` : ''} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-white truncate">{badge.name}</p>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{badge.enabled ? 'Live' : 'Disabled'} Protocol</p>
                  </div>
                </div>
              )) : (
                <div className="col-span-full p-12 bg-white/[0.01] border border-white/5 rounded-[2rem] text-center">
                  <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">No active badges detected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Meta Info */}
        <div className="space-y-10">
           <div className="p-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-blue-900/30">
              <BarChart3 size={56} className="mb-8 opacity-20" />
              <h4 className="text-3xl font-black tracking-tighter uppercase mb-4 leading-tight">Analytics <br /> Engine</h4>
              <p className="text-white/50 text-sm font-medium leading-relaxed mb-12">
                 Deep ingestion of player behavior, retention maps and real-time conversion rates across all servers.
              </p>
              <button className="w-full h-16 bg-white text-black rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl">
                 Open Analytics Hub
              </button>
           </div>

           <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] space-y-10 backdrop-blur-md">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Node Services</h4>
              <div className="space-y-6">
                {[
                  { icon: Zap, label: "Live Gateway", status: "Operational", color: "text-emerald-500" },
                  { icon: ShieldCheck, label: "Encryption Gate", status: "AES-256 Active", color: "text-blue-500" },
                  { icon: Activity, label: "Telemetry Stream", status: "Enabled", color: "text-emerald-500" }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                      <s.icon size={20} />
                    </div>
                    <div className="flex-grow">
                       <div className="text-[11px] font-black text-white uppercase">{s.label}</div>
                       <div className={`text-[9px] font-bold uppercase tracking-widest ${s.color}`}>{s.status}</div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};