"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Search, Database, Users, 
  Settings, ExternalLink, RefreshCw, 
  LogOut, ShieldCheck, Gamepad2, Layers, 
  PieChart, Activity, Globe, Loader2, Plus, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { getProfileByRobloxId } from '@/app/actions/profile';
import { robloxUtils } from '@/lib/roblox-utils';
import { toast, Toaster } from 'sonner';
import { PlayerIntel } from '@/components/admin/player-intel';
import { ProjectDetails } from '@/components/admin/project-details';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'studio' | 'settings'>('explorer');
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
      // Buscar jogos do desenvolvedor
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
    <div className="min-h-screen bg-[#1a1a1e] flex items-center justify-center">
      <Loader2 className="animate-spin text-slate-400" size={32} />
    </div>
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#141417] text-slate-200 flex flex-col lg:flex-row font-sans">
      <Toaster theme="dark" position="bottom-right" />

      {/* Sidebar - Flat Design */}
      <aside className="w-full lg:w-72 bg-[#1C1C21] border-r border-white/[0.05] flex flex-col shrink-0">
        <div className="p-8 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">LOSTYO ADMIN</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main</div>
          <SideButton active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} icon={Globe} label="Global Explorer" />
          <SideButton active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={LayoutDashboard} label="Studio Workspace" />
          
          <div className="pt-6 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">My Projects</div>
          <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar px-2">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => { setSelectedProjectId(p.id); setActiveTab('studio'); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-all ${selectedProjectId === p.id && activeTab === 'studio' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-white/[0.05] bg-black/10">
          <div className="flex items-center gap-3 mb-6">
            <img src={profile?.avatar_url} className="w-10 h-10 rounded-xl bg-white/5 object-cover" alt="" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{profile?.roblox_display_name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Developer</p>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_admin_token'); window.location.href = '/'; }}
            className="w-full h-11 flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl text-xs font-bold transition-all border border-white/[0.05]"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#141417]">
        <header className="h-20 border-b border-white/[0.05] px-8 flex items-center justify-between bg-[#1C1C21]/50 backdrop-blur sticky top-0 z-10">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {activeTab === 'explorer' ? 'Global Roblox Explorer' : `Studio: ${selectedProject?.name || 'Workspace'}`}
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={loadData} className="p-2.5 text-slate-400 hover:bg-white/5 rounded-xl transition-all">
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        <div className="flex-grow p-8 lg:p-12 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'explorer' && (
              <motion.div key="explorer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-12">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Search everything.</h1>
                  <p className="text-slate-400 text-lg">Access real-time public information across the entire Roblox ecosystem.</p>
                </div>
                <PlayerIntel onJumpToData={() => {}} />
              </motion.div>
            )}

            {activeTab === 'studio' && selectedProject && (
              <motion.div key="studio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                <ProjectDetails project={selectedProject} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}

const SideButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${active ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
  >
    <Icon size={18} />
    {label}
  </button>
);