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
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
      <div className="noise opacity-[0.02]" />
      
      {/* Sidebar - Tema Blue Studio */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 hidden md:flex bg-[#050505] relative z-20">
        <Link href="/" className="flex items-center gap-3 mb-16 px-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-all">
             <img src="https://cdn.lostyo.com/logo.png" className="w-5 h-5" alt="Logo" />
          </div>
          <span className="font-black tracking-tighter text-xl uppercase">Studio</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          {[
            { icon: LayoutDashboard, label: "Command Center", active: true },
            { icon: Database, label: "Cloud Engine" },
            { icon: Activity, label: "Performance" },
            { icon: Users, label: "Access Control" },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} className={item.active ? '' : 'group-hover:text-blue-400'} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden bg-blue-600/10 p-0.5">
              <img src={profile?.avatar_url} className="w-full h-full rounded-lg object-cover" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] font-black uppercase truncate">{profile?.roblox_display_name}</div>
              <div className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Root Authority</div>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_roblox_id'); window.location.href = '/'; }} 
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
          >
            <Power size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-10 lg:p-14 overflow-y-auto relative z-10 custom-scrollbar">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 pb-8 border-b border-white/5 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">
               <Lock size={10} /> SECURE PROTOCOL V2.1
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">Command Center</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="px-6 h-12 glass rounded-full flex items-center gap-3 border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Cloud Connection: Stable</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          <div className="xl:col-span-1">
            <ProjectSelector projects={projects} onSelectProject={setSelectedProject} selectedProject={selectedProject} />
          </div>
          
          <div className="xl:col-span-3">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-[4rem] p-10 md:p-14 border-white/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.02] blur-[120px] -z-10" />
                  <ProjectDetails project={selectedProject} />
                </motion.div>
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center glass rounded-[4rem] border-white/5 border-dashed border-2">
                  <Zap size={64} className="text-blue-500/20 mb-6 animate-bounce" />
                  <h3 className="text-2xl font-black text-white/20 uppercase tracking-widest">Interface Standby</h3>
                  <p className="text-white/10 text-sm font-medium mt-2">Link a universe cluster to initialize remote management.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
      `}</style>
    </div>
  );
}