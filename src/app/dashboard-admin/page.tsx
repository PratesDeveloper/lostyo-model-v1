"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Activity, Code, 
  ShieldOff, Loader2, Gamepad2, Database, Zap, Lock, Power
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
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const robloxId = Cookies.get('lostyo_roblox_id');
      const logged = Cookies.get('lostyo_roblox_logged');

      if (!robloxId || logged !== 'true') {
        router.replace('/login');
        return;
      }

      // Usando Server Action para buscar perfil e projetos com bypass de RLS
      const profileData = await getProfileByRobloxId(robloxId);
      
      if (profileData && profileData.is_developer) {
        setProfile(profileData);
        const projectsData = await getAllProjects();
        setProjects(projectsData);
        if (projectsData.length > 0) setSelectedProject(projectsData[0]);
      } else {
        router.replace('/');
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="animate-spin text-red-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
      <div className="noise opacity-[0.02]" />
      
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 hidden md:flex bg-[#050505] relative z-20">
        <Link href="/" className="flex items-center gap-3 mb-16 px-2 group">
          <img src="https://cdn.lostyo.com/logo.png" className="w-7 h-7" alt="Logo" />
          <span className="font-black tracking-tighter text-xl uppercase">Admin</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          {[
            { icon: LayoutDashboard, label: "Core Console", active: true },
            { icon: Database, label: "Data Clusters" },
            { icon: Activity, label: "Live Feed" },
            { icon: Users, label: "Identity Hub" },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.active ? 'bg-red-600 text-white shadow-2xl shadow-red-600/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} className={item.active ? '' : 'group-hover:text-red-400'} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden">
              <img src={profile?.avatar_url} className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] font-black uppercase truncate">{profile?.roblox_display_name}</div>
              <div className="text-[8px] font-bold text-red-500 uppercase tracking-widest">Root Access</div>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_roblox_id'); window.location.href = '/'; }} 
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
          >
            <Power size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-10 lg:p-14 overflow-y-auto relative z-10 custom-scrollbar">
        <header className="flex justify-between items-end mb-16 pb-8 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-[9px] font-black text-red-500 uppercase tracking-[0.2em] mb-4">
               <Lock size={10} /> Secure Terminal v2.1
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">System Core</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="px-6 h-12 glass rounded-full flex items-center gap-3 border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40">API Status: Optimal</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <ProjectSelector projects={projects} onSelectProject={setSelectedProject} selectedProject={selectedProject} />
          </div>
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-[3.5rem] p-12 border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/[0.02] blur-[100px] -z-10" />
                  <ProjectDetails project={selectedProject} />
                </motion.div>
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center glass rounded-[3.5rem] border-white/5 border-dashed border-2">
                  <Zap size={64} className="text-white/5 mb-6 animate-pulse" />
                  <h3 className="text-2xl font-black text-white/20 uppercase tracking-widest">Standby Mode</h3>
                  <p className="text-white/10 text-sm font-medium mt-2">Initialize a data cluster to begin management.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}