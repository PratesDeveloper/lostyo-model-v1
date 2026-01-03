"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Search, Database, Users, 
  Settings, ExternalLink, RefreshCw, 
  LogOut, ShieldCheck, Gamepad2, Layers, 
  PieChart, Activity, Globe, Loader2, Plus, ArrowRight, Binary, ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { getProfileByRobloxId } from '@/app/actions/profile';
import { robloxUtils } from '@/lib/roblox-utils';
import { toast, Toaster } from 'sonner';
import { PlayerIntel } from '@/components/admin/player-intel';
import { ProjectDetails } from '@/components/admin/project-details';
import { AssetEngine } from '@/components/admin/asset-engine';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'studio' | 'assets' | 'settings'>('explorer');
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
    <div className="min-h-screen bg-[#0F0F12] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 mb-6" size={48} />
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 animate-pulse">Initializing Lostyo OS</span>
    </div>
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#0F0F12] text-slate-200 flex flex-col lg:flex-row font-sans selection:bg-blue-500/30">
      <Toaster theme="dark" position="bottom-right" />

      {/* Sidebar - Premium Studio OS */}
      <aside className="w-full lg:w-[320px] bg-[#141417] border-r border-white/[0.03] flex flex-col shrink-0 relative z-20">
        <div className="p-10 border-b border-white/[0.03]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="font-black text-lg tracking-tighter text-white uppercase block">Lostyo OS</span>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Central Authority</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-5 py-4 text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Core Systems</div>
          <SideButton active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} icon={Globe} label="Global Explorer" />
          <SideButton active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={LayoutDashboard} label="Studio Workspace" />
          <SideButton active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={ShoppingBag} label="Monetization" />
          
          <div className="pt-10 px-5 py-4 text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Universe Nodes</div>
          <div className="space-y-1.5 px-2">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => { setSelectedProjectId(p.id); setActiveTab('studio'); }}
                className={`w-full text-left px-5 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${selectedProjectId === p.id && activeTab === 'studio' ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-white/30 hover:bg-white/5 hover:text-white/50'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-8 border-t border-white/[0.03] bg-black/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <img src={profile?.avatar_url} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 object-cover" alt="" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-[#141417]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black text-white truncate uppercase">{profile?.roblox_display_name}</p>
              <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">Root Dev</p>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_admin_token'); window.location.href = '/'; }}
            className="w-full h-14 flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/10"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#0F0F12] relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/[0.02] blur-[160px] pointer-events-none" />
        
        <header className="h-24 border-b border-white/[0.03] px-12 flex items-center justify-between bg-[#141417]/40 backdrop-blur-2xl sticky top-0 z-10">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Protocol Stable</span>
             </div>
             <h2 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">
               {activeTab === 'explorer' ? 'Global Network Intelligence' : `Node: ${selectedProject?.name || 'Workspace'}`}
             </h2>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={loadData} className="p-3.5 text-white/20 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10">
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        <div className="flex-grow p-12 lg:p-16 overflow-y-auto custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'explorer' && (
              <motion.div key="explorer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-16">
                <div className="max-w-4xl space-y-6">
                  <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">Universal <br /> Explorer.</h1>
                  <p className="text-white/30 text-2xl font-medium leading-relaxed">Access real-time intelligence across the entire Roblox network from a single centralized terminal.</p>
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
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.2); }
      `}</style>
    </div>
  );
}

const SideButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-5 px-6 py-4.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all group ${active ? 'bg-white text-black shadow-2xl' : 'text-white/30 hover:bg-white/5 hover:text-white/50'}`}
  >
    <Icon size={20} className={active ? 'text-blue-600' : 'group-hover:text-blue-500 transition-colors'} />
    {label}
  </button>
);