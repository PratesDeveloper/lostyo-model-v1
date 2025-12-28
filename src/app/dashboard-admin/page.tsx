"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Activity, Code, 
  ShieldCheck, Loader2, Gamepad2, Database, 
  Zap, Lock, Power, RefreshCcw, LayoutGrid
} from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectSelector } from '@/components/admin/project-selector';
import { ProjectDetails } from '@/components/admin/project-details';
import { getProfileByRobloxId, getAllProjects } from '@/app/actions/profile';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const loadData = async () => {
    const robloxId = Cookies.get('lostyo_roblox_id');
    const logged = Cookies.get('lostyo_roblox_logged');

    if (!robloxId || logged !== 'true') {
      router.replace('/login');
      return;
    }

    const profileData = await getProfileByRobloxId(robloxId);
    
    if (profileData && profileData.is_developer) {
      setProfile(profileData);
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      if (projectsData.length > 0 && !selectedProject) {
        setSelectedProject(projectsData[0]);
      }
    } else {
      router.replace('/');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await loadData();
    setTimeout(() => setIsSyncing(false), 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="relative">
          <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
          <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-blue-500/30">
      <div className="noise opacity-[0.02] pointer-events-none" />
      
      {/* Sidebar de Operações */}
      <aside className="w-80 border-r border-white/5 flex flex-col hidden xl:flex bg-[#080808] relative z-20">
        <div className="p-10">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:rotate-6 transition-transform">
              <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg uppercase leading-none">Studio</span>
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Internal Systems</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {[
              { icon: LayoutGrid, label: "Universes", active: true },
              { icon: Database, label: "Cloud Storage" },
              { icon: Activity, label: "Network Health" },
              { icon: Users, label: "Access Rights" },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden bg-blue-600/10 p-0.5">
              <img src={profile?.avatar_url} className="w-full h-full rounded-xl object-cover" alt="Profile" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-black uppercase truncate">{profile?.roblox_display_name}</span>
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Root Authority</span>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_roblox_id'); window.location.href = '/'; }} 
            className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5 group"
          >
            <Power size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest">Terminate Terminal</span>
          </button>
        </div>
      </aside>

      {/* Workspace Area */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden relative z-10">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#080808]/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Command Center // v2.1.0</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase text-blue-400">Secure Environment</span>
            </div>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCcw size={18} className={isSyncing ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        <div className="flex-grow flex overflow-hidden">
          {/* Sub-Sidebar: Seleção de Jogo */}
          <div className="w-96 border-r border-white/5 overflow-y-auto p-8 custom-scrollbar">
            <ProjectSelector 
              projects={projects} 
              onSelectProject={setSelectedProject} 
              selectedProject={selectedProject} 
            />
          </div>

          {/* Área de Visualização Técnica */}
          <div className="flex-grow overflow-y-auto p-10 custom-scrollbar bg-[#060606]">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="max-w-6xl mx-auto"
                >
                  <ProjectDetails project={selectedProject} />
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <Gamepad2 size={80} strokeWidth={1} className="mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-[0.5em]">Standby</h3>
                  <p className="text-xs mt-2 uppercase tracking-widest font-bold">Waiting for Universe selection</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
      `}</style>
    </div>
  );
}