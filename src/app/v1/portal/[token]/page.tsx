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
import { DataStoreExplorer } from '@/components/admin/datastore-explorer';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'studio' | 'assets' | 'datastores'>('explorer');
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();

  const callRobloxAPI = async (action: string, paramsObj: any = {}) => {
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, universeId: selectedProjectId, ...paramsObj })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (err: any) {
      toast.error(err.message);
      return null;
    }
  };

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
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 mb-6" size={48} />
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 animate-pulse">Establishing Lostyo Link</span>
    </div>
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" position="bottom-right" />

      {/* Modern Dock Sidebar */}
      <aside className="w-full lg:w-[320px] bg-[#0A0A0A] border-r border-white/[0.03] flex flex-col shrink-0 relative z-20">
        <div className="p-10 border-b border-white/[0.03]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl">
              <Binary size={24} />
            </div>
            <div>
              <span className="font-black text-xl tracking-tighter text-white uppercase block">Lostyo OS</span>
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">v5.2 Platinum</span>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 space-y-12 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1.5">
            <SideButton active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} icon={Compass} label="Network Explorer" />
            <SideButton active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={Box} label="Studio Node" />
            <SideButton active={activeTab === 'datastores'} onClick={() => setActiveTab('datastores')} icon={Database} label="Cloud Clusters" />
            <SideButton active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={ShoppingBag} label="Monetization" />
          </nav>

          <div className="space-y-8">
            <SystemHealth />
            <LiveFeed />
          </div>

          <div className="space-y-4">
             <h4 className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] px-2">Production Nodes</h4>
             <div className="grid grid-cols-1 gap-2">
                {projects.map(p => (
                  <button 
                    key={p.id} 
                    onClick={() => { setSelectedProjectId(p.id); setActiveTab('studio'); }}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedProjectId === p.id && (activeTab === 'studio' || activeTab === 'datastores') ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white/40 hover:bg-white/[0.02]'}`}
                  >
                    {p.name}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/[0.03] bg-black/20">
          <div className="flex items-center gap-4 mb-8">
            <img src={profile?.avatar_url} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" alt="" />
            <div className="min-w-0">
              <p className="text-[11px] font-black text-white truncate uppercase">{profile?.roblox_display_name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-blue-500 font-black uppercase tracking-widest">Admin Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_admin_token'); window.location.href = '/'; }}
            className="w-full h-14 flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/10"
          >
            <LogOut size={16} /> Terminate Tunnel
          </button>
        </div>
      </aside>

      {/* Terminal Viewport */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#050505] relative">
        <header className="h-24 border-b border-white/[0.03] px-12 flex items-center justify-between bg-black/40 backdrop-blur-3xl sticky top-0 z-10">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
               <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">System Active</span>
             </div>
             <h2 className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em]">
               {activeTab === 'explorer' ? 'Global.Intelligence' : `Cluster.${selectedProject?.name?.replace(/\s+/g, '.') || 'Workspace'}`}
             </h2>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={loadData} className="p-3.5 text-white/20 hover:bg-white/5 rounded-2xl transition-all">
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        <div className="flex-grow p-12 xl:p-16 overflow-y-auto custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'explorer' && (
              <motion.div key="explorer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-16">
                <div className="max-w-4xl space-y-6">
                  <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85]">Central <br /> <span className="text-white/10">Archives.</span></h1>
                  <p className="text-white/30 text-2xl font-medium leading-relaxed max-w-2xl">Accessing deep-level identity matrices and universe clusters from the decentralized network.</p>
                </div>
                <PlayerIntel onJumpToData={() => {}} />
              </motion.div>
            )}

            {activeTab === 'studio' && selectedProject && (
              <motion.div key="studio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                <ProjectDetails project={selectedProject} />
              </motion.div>
            )}

            {activeTab === 'assets' && selectedProject && (
              <motion.div key="assets" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                 <AssetEngine universeId={selectedProject.id} />
              </motion.div>
            )}

            {activeTab === 'datastores' && selectedProject && (
              <motion.div key="datastores" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                 <DataStoreExplorer 
                   selectedProject={selectedProject} 
                   settings={{}} 
                   callRobloxAPI={callRobloxAPI} 
                   isSyncing={false} 
                   setIsCreateModalOpen={() => {}} 
                   isCreateModalOpen={false} 
                 />
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
    className={`w-full flex items-center gap-5 px-6 py-4.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all group ${active ? 'bg-white text-black shadow-2xl shadow-white/20' : 'text-white/20 hover:bg-white/[0.03] hover:text-white/50'}`}
  >
    <Icon size={20} className={active ? 'text-blue-600' : 'group-hover:text-blue-500 transition-colors'} />
    {label}
  </button>
);