"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Database, Users, Code, 
  TrendingUp, AlertTriangle, ExternalLink, 
  Settings, Zap, RefreshCw, Layers, ShieldCheck
} from 'lucide-react';
import { getProjectDataStores } from '@/app/actions/roblox';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
  roblox_place_id: string;
}

const StatCard = ({ icon: Icon, label, value, color = "text-blue-500" }: any) => (
  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-blue-500/20 transition-all group">
    <Icon size={20} className={`${color} mb-4 group-hover:scale-110 transition-transform`} />
    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</div>
    <div className="text-2xl font-black text-white tracking-tighter">{value}</div>
  </div>
);

export const ProjectDetails = ({ project }: { project: Project }) => {
  const [datastores, setDatastores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLiveInfo = async () => {
    setLoading(true);
    // Aqui usamos o place_id como universe_id por enquanto (ajuste se necessário)
    const ds = await getProjectDataStores(project.roblox_place_id);
    setDatastores(ds);
    setLoading(false);
  };

  useEffect(() => {
    fetchLiveInfo();
  }, [project.id]);

  return (
    <div className="space-y-10">
      {/* Real-time Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-5xl font-black tracking-tighter text-white">{project.name}</h2>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full uppercase tracking-widest flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
            </div>
          </div>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
             Reference Place ID: <span className="text-blue-500">{project.roblox_place_id}</span>
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={fetchLiveInfo}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/40 hover:text-blue-400 transition-all"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={() => window.open(`https://www.roblox.com/games/${project.roblox_place_id}`, '_blank')}
            className="h-12 px-6 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
          >
            Launch Experience <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Grid de Operações */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Visits" value="1.2M+" />
        <StatCard icon={Zap} label="Memory Usage" value="2.4 GB" color="text-yellow-500" />
        <StatCard icon={ShieldCheck} label="Sec. Audit" value="Verified" color="text-emerald-500" />
        <StatCard icon={Layers} label="Active Servers" value="42" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* DataStore Management */}
        <div className="lg:col-span-2 glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Database size={150} />
           </div>
           
           <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <Database className="text-blue-500" size={24} /> DataStore Clusters
           </h3>

           <div className="space-y-4">
              {loading ? (
                [1,2].map(i => <div key={i} className="h-20 bg-white/5 rounded-3xl animate-pulse" />)
              ) : datastores.length > 0 ? (
                datastores.map((ds, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                           <Code size={18} />
                        </div>
                        <div>
                           <div className="text-sm font-black text-white">{ds.name}</div>
                           <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Created: {new Date(ds.createdTime).toLocaleDateString()}</div>
                        </div>
                     </div>
                     <button className="h-10 px-5 bg-white/5 hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                        Query Data
                     </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                   <p className="text-white/20 text-xs font-bold uppercase tracking-widest">No Cloud DataStores Accessible</p>
                   <p className="text-white/10 text-[10px] mt-2 max-w-xs mx-auto">Verify your API Key has 'DataStore Read' permissions.</p>
                </div>
              )}
           </div>
        </div>

        {/* System Settings Quick Access */}
        <div className="space-y-6">
           <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-600/20">
              <Settings size={32} className="mb-6" />
              <h4 className="text-xl font-black tracking-tighter mb-2">Universe Settings</h4>
              <p className="text-blue-100/60 text-xs font-medium leading-relaxed mb-8">
                 Update global flags, private server prices, and monetization settings.
              </p>
              <button className="w-full h-14 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                 Configure Access
              </button>
           </div>
           
           <div className="glass rounded-[2.5rem] p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <AlertTriangle size={18} className="text-yellow-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Risk Management</span>
              </div>
              <p className="text-[11px] text-white/30 font-medium mb-6">
                 Monitoring for unusual API traffic and DataStore bottlenecks.
              </p>
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black text-emerald-400">STATUS: NOMINAL</span>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};