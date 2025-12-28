"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Users, 
  CircleDollarSign, 
  Activity, 
  Plus, 
  Settings,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Buscar perfil do usuário logado (baseado na última atualização do Roblox para simplicidade)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (profileData) {
        setProfile(profileData);
        
        // 2. Buscar projetos reais deste usuário
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('owner_id', profileData.roblox_id);
        
        if (projectsData) setProjects(projectsData);
      }
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('lostyo_roblox_logged');
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Activity className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-4 mb-12 lg:px-4">
          <Link href="/">
            <img src="https://cdn.lostyo.com/logo.png" className="w-8 h-8 cursor-pointer" alt="Logo" />
          </Link>
          <span className="font-black tracking-tighter text-xl hidden lg:block">Lostyo</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Gamepad2, label: "Experiences" },
            { icon: Users, label: "Community" },
            { icon: Activity, label: "Analytics" },
            { icon: CircleDollarSign, label: "Monetization" },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/30 hover:bg-white/5'}`}>
              <item.icon size={20} />
              <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/30 hover:bg-white/5">
            <Settings size={20} />
            <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Settings</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500/60 hover:bg-red-500/5 hover:text-red-500 transition-all">
            <LogOut size={20} />
            <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 max-h-screen overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter mb-2">Welcome, {profile?.roblox_display_name}.</h1>
            <p className="text-white/30 text-sm font-medium">Managing your digital ecosystem from the studio.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="h-12 px-6 bg-white/5 rounded-full flex items-center gap-3 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio Verified</span>
            </div>
            <button className="h-12 px-6 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-transform whitespace-nowrap">
              <Plus size={16} /> New Project
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-xl font-black tracking-tighter mb-8 flex items-center gap-3">
                    <Gamepad2 className="text-blue-500" /> Your Experiences
                  </h3>
                  
                  {projects.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                       <Gamepad2 size={48} className="text-white/5 mx-auto mb-4" />
                       <p className="text-white/20 text-sm font-medium mb-6">No projects synchronized yet.</p>
                       <button className="h-10 px-6 bg-white/5 hover:bg-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-widest transition-all">
                          Link Experience
                       </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       {projects.map((project, i) => (
                         <div key={i} className="p-6 bg-white/5 rounded-3xl flex justify-between items-center border border-white/5">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                                  <Gamepad2 size={24} />
                               </div>
                               <div>
                                  <div className="text-sm font-black uppercase">{project.name}</div>
                                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{project.category}</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-xs font-black">{project.players_count} Players</div>
                               <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{project.status}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Right Column: Group & Profile */}
          <div className="space-y-8">
             {/* Profile Card */}
             <div className="glass rounded-[3rem] p-10 border border-white/5 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-blue-600/20 p-1 mx-auto mb-6">
                   <img 
                    src={profile?.avatar_url} 
                    className="w-full h-full rounded-full object-cover" 
                    alt="Profile" 
                   />
                </div>
                <h4 className="text-xl font-black tracking-tighter mb-1">{profile?.roblox_display_name}</h4>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">@{profile?.roblox_username}</p>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Total Bits</div>
                      <div className="text-sm font-black">1.2M</div>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Rank</div>
                      <div className="text-sm font-black text-blue-500">Whale</div>
                   </div>
                </div>
             </div>

            {/* Group Status Card */}
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-900/20 rounded-[3rem] p-10 border border-blue-500/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={120} />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Users size={20} className="text-white" />
                     </div>
                     <h3 className="text-xs font-black uppercase tracking-widest text-white">Lostyo Group</h3>
                  </div>
                  <h4 className="text-xl font-black tracking-tighter mb-2">Join our Community</h4>
                  <p className="text-white/40 text-xs font-medium mb-8 leading-relaxed">
                     Get exclusive developer access and early testing for new metaverse assets.
                  </p>
                  <button 
                    onClick={() => window.open('https://www.roblox.com/share/g/122525496', '_blank')}
                    className="w-full h-14 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Enter Group <ExternalLink size={14} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}