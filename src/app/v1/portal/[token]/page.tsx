"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Database, Users, 
  Settings, ExternalLink, RefreshCw, 
  LogOut, ShieldCheck, Globe, Loader2, Binary, ShoppingBag,
  Activity, Zap, Box, Compass, Terminal, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { getProfileByRobloxId } from '@/app/actions/profile';
import { toast, Toaster } from 'sonner';
import { PlayerIntel } from '@/components/admin/player-intel';
import { ProjectDetails } from '@/components/admin/project-details';
import { AssetEngine } from '@/components/admin/asset-engine';
import { SystemHealth } from '@/components/admin/system-health';
import { LiveFeed } from '@/components/admin/live-feed';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'studio' | 'assets' | 'nodes'>('explorer');
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();

  const loadData = async () => {
    const robloxId = Cookies.get('lostyo_roblox_id');
    const adminToken = Cookies.get('lostyo_admin_token');

    if (!robloxId || adminToken !== params.token) {
      router.replace('/v1/access');
      return;
    }

    const profileData = await getProfileByRobloxId(robloxId);
    if (profileData?.is_developer) {
      setProfile(profileData);
      const res = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'listUserUniverses' })
      });
      const data = await res.json();
      if (data.universes) {
        setProjects(data.universes);
        if (data.universes.length > 0) setSelectedProjectId(data.universes[0].id);
      }
    } else {
      router.replace('/');
    }
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  if (isLoading) return (
    <div className="min-h-screen bg-[#08080A] flex flex-col items-center justify-center">
      <div className="relative mb-10">
        <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Binary className="text-blue-500 animate-pulse" size={32} />
        </div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 animate-pulse">Initializing OS</span>
    </div>
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-slate-200 flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" position="bottom-right" />

      {/* Left Dock - Industrial Style */}
      <aside className="w-full lg:w-[350px] bg-[#0E0E11] border-r border-white/5 flex flex-col shrink-0 relative z-20">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-blue-900/20 group cursor-pointer overflow-hidden">
               <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                 <Cpu size={28} className="text-white" />
               </motion.div>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase block leading-none">Lostyo OS</span>
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1">Studio Command Center</span>
            </div>
          </div>
        </div>

        <div className="flex-grow p-8 space-y-12 overflow-y-auto custom-scrollbar">
          <nav className="space-y-2">
            <SideButton active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} icon={Compass} label="Global Network" />
            <SideButton active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={Box} label="Workspace" />
            <SideButton active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={ShoppingBag} label="Revenue Hub" />
          </nav>

          <div className="space-y-6">
            <SystemHealth />
            <LiveFeed />
          </div>

          <div className="space-y-4">
             <h4 className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] px-2">Project Nodes</h4>
             <div className="grid grid-cols-1 gap-2">
                {projects.map(p => (
                  <button 
                    key={p.id} 
                    onClick={() => { setSelectedProjectId(p.id); setActiveTab('studio'); }}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedProjectId === p.id && activeTab === 'studio' ? 'bg-white text-black border-white shadow-2xl shadow-white/10' : 'bg-white/[0.02] border-white/5 text-white/20 hover:text-white/40 hover:bg-white/[0.04]'}`}
                  >
                    {p.name}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/[0.02] rounded-3xl border border-white/5">
            <img src={profile?.avatar_url} className="w-12 h-12 rounded-2xl object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" alt="" />
            <div className="min-w-0">
              <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{profile?.roblox_display_name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-blue-500 font-black uppercase tracking-widest">Admin Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_admin_token'); window.location.href = '/'; }}
            className="w-full h-14 flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/10"
          >
            <LogOut size={16} /> Terminate Tunnel
          </button>
        </div>
      </aside>

      {/* Main Terminal Area */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#0B0B0D] relative">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <header className="h-24 border-b border-white/5 px-12 flex items-center justify-between bg-[#0E0E11]/80 backdrop-blur-3xl sticky top-0 z-10">
          <div className="flex items-center gap-10">
             <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">
                  {activeTab === 'explorer' ? 'Global.Intelligence' : `Node.${selectedProject?.name?.replace(/\s+/g, '.') || 'Workspace'}`}
                </h2>
             </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden xl:flex items-center gap-8 border-x border-white/5 px-10">
               <div className="text-right">
                  <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">Active Threads</p>
                  <p className="text-xs font-mono text-emerald-500">248 Units</p>
               </div>
               <div className="text-right">
                  <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">Network Load</p>
                  <p className="text-xs font-mono text-blue-400">14% Total</p>
               </div>
            </div>
            <button onClick={loadData} className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 transition-all flex items-center justify-center">
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        <div className="flex-grow p-12 xl:p-20 overflow-y-auto custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'explorer' && (
              <motion.div key="explorer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto space-y-20">
                <div className="max-w-4xl space-y-8">
                  <h1 className="text-7xl xl:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85]">Universal <br /> <span className="text-white/10">Archive.</span></h1>
                  <p className="text-white/30 text-2xl font-medium leading-relaxed max-w-2xl">
                    Real-time ingestion of public identity nodes and universe clusters from the decentralized Roblox network.
                  </p>
                </div>
                <PlayerIntel onJumpToData={() => {}} />
              </motion.div>
            )}

            {activeTab === 'studio' && selectedProject && (
              <motion.div key="studio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto">
                <ProjectDetails project={selectedProject} />
              </motion.div>
            )}

            {activeTab === 'assets' && selectedProject && (
              <motion.div key="assets" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto">
                 <AssetEngine universeId={selectedProject.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
      `}</style>
    </div>
  );
}

const SideButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all group ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/30' : 'bg-transparent text-white/20 hover:bg-white/[0.03] hover:text-white/50'}`}
  >
    <div className="flex items-center gap-5">
      <Icon size={20} className={active ? 'text-white' : 'group-hover:text-blue-500 transition-colors'} />
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <Zap size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'text-white/40' : 'text-blue-500/40'}`} />
  </button>
);