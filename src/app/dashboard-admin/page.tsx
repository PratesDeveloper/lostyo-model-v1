"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Activity, 
  Code,
  ShieldOff,
  Loader2,
  ArrowRight,
  Gamepad2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectSelector } from '@/components/admin/project-selector';
import { ProjectDetails } from '@/components/admin/project-details';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
  roblox_place_id: string;
}

const AdminSidebar = ({ isDeveloper }: { isDeveloper: boolean }) => {
  const handleLogout = () => {
    Cookies.remove('lostyo_roblox_logged');
    window.location.href = '/';
  };

  return (
    <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col p-6 hidden md:flex bg-[#050505]">
      <div className="flex items-center gap-4 mb-12 lg:px-4">
        <Link href="/">
          <img src="https://cdn.lostyo.com/logo.png" className="w-8 h-8 cursor-pointer" alt="Logo" />
        </Link>
        <span className="font-black tracking-tighter text-xl hidden lg:block">Admin</span>
      </div>

      <nav className="space-y-2 flex-grow">
        {[
          { icon: LayoutDashboard, label: "Overview", active: true },
          { icon: Users, label: "User Management" },
          { icon: Code, label: "API Keys" },
          { icon: Activity, label: "System Logs" },
        ].map((item, i) => (
          <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-white/30 hover:bg-white/5'}`}>
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
          <ShieldOff size={20} />
          <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Logout Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      if (!loggedCookie) {
        router.replace('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (profileData && profileData.is_developer) {
        setProfile(profileData);
        
        // Buscar projetos do estúdio (todos, já que é o painel admin)
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*');
        
        if (projectsData) {
          setProjects(projectsData as Project[]);
          if (projectsData.length > 0) {
            setSelectedProject(projectsData[0] as Project);
          }
        }
      } else {
        router.replace('/dashboard');
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

  if (!profile) return null; 

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      <AdminSidebar isDeveloper={true} />

      <main className="flex-grow p-6 lg:p-12 max-h-screen overflow-y-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 pb-6 border-b border-white/5"
        >
          <div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-2 text-red-400">ADMIN PANEL</h1>
            <p className="text-white/30 text-sm font-medium">High-level system management and developer tools.</p>
          </div>
          <div className="h-12 px-6 bg-red-600/10 rounded-full flex items-center gap-3 border border-red-600/20">
            <Code className="text-red-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Developer Mode</span>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Coluna de Seleção de Projeto */}
          <div className="lg:col-span-1">
            <ProjectSelector 
              projects={projects} 
              onSelectProject={setSelectedProject} 
              selectedProject={selectedProject} 
            />
          </div>

          {/* Coluna de Detalhes do Projeto */}
          <div className="lg:col-span-3">
            <div className="glass rounded-[3rem] p-10 border border-white/5">
              {selectedProject ? (
                <ProjectDetails project={selectedProject} />
              ) : (
                <div className="py-20 text-center">
                  <Gamepad2 size={48} className="text-white/5 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white/40">Select a Project to Manage</h3>
                  <p className="text-white/20 text-sm">Use the sidebar to choose an experience.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}