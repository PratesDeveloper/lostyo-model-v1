"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, Activity, Code, ShieldOff, Loader2, Gamepad2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectSelector } from '@/components/admin/project-selector';
import { ProjectDetails } from '@/components/admin/project-details';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const robloxId = Cookies.get('lostyo_roblox_id');
      if (!robloxId) {
        router.replace('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('roblox_id', robloxId)
        .single();
      
      if (profileData && profileData.is_developer) {
        setProfile(profileData);
        const { data: projectsData } = await supabase.from('projects').select('*');
        if (projectsData) {
          setProjects(projectsData);
          if (projectsData.length > 0) setSelectedProject(projectsData[0]);
        }
      } else {
        router.replace('/dashboard');
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [router]);

  if (isLoading) return <div className="min-h-screen bg-[#030303] flex items-center justify-center"><Loader2 className="animate-spin text-red-500" size={48} /></div>;

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 hidden md:flex bg-[#050505]">
        <Link href="/" className="flex items-center gap-4 mb-12"><img src="https://cdn.lostyo.com/logo.png" className="w-8 h-8" alt="Logo" /><span className="font-black tracking-tighter text-xl">Admin</span></Link>
        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-600 text-white shadow-xl shadow-red-600/20"><LayoutDashboard size={20} /><span className="text-xs font-bold uppercase tracking-widest">Control Core</span></button>
        </nav>
        <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500/60 hover:bg-red-500/5 transition-all"><ShieldOff size={20} /><span className="text-xs font-bold uppercase tracking-widest">Terminal Exit</span></button>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-white/5">
          <div><h1 className="text-6xl font-black tracking-tighter mb-2 text-red-400 uppercase">System Core</h1><p className="text-white/30 text-sm font-medium">Root access verified for {profile?.roblox_display_name}.</p></div>
          <div className="h-12 px-6 bg-red-600/10 rounded-full flex items-center gap-3 border border-red-600/20"><Code className="text-red-500" size={16} /><span className="text-[10px] font-black uppercase tracking-widest text-red-400">Admin Mode</span></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1"><ProjectSelector projects={projects} onSelectProject={setSelectedProject} selectedProject={selectedProject} /></div>
          <div className="lg:col-span-3"><div className="glass rounded-[3rem] p-10 border border-white/5">{selectedProject ? <ProjectDetails project={selectedProject} /> : <div className="py-20 text-center"><Gamepad2 size={48} className="text-white/5 mx-auto mb-4" /><h3 className="text-xl font-black text-white/40">Select Interface</h3></div>}</div></div>
        </div>
      </main>
    </div>
  );
}