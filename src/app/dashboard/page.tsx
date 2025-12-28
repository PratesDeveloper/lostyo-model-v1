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
  LogOut,
  Code,
  Wrench,
  ArrowRight // Importação adicionada
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', players: 4000 },
  { name: 'Tue', players: 3000 },
  { name: 'Wed', players: 2000 },
  { name: 'Thu', players: 2780 },
  { name: 'Fri', players: 1890 },
  { name: 'Sat', players: 2390 },
  { name: 'Sun', players: 3490 },
];

const StatCard = ({ icon: Icon, label, value, trend, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass p-8 rounded-[2.5rem] border border-white/5"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{label}</div>
    <div className="text-3xl font-black text-white tracking-tighter">{value}</div>
  </motion.div>
);

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      if (!loggedCookie) {
        window.location.href = '/login';
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (profileData) {
        setProfile(profileData);
        
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

  const isDeveloper = profile?.is_developer ?? false;

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
            ...(isDeveloper ? [{ icon: Code, label: "Dev Tools", link: "/dashboard-admin" }] : []), // Link para Admin
          ].map((item, i) => (
            <Link key={i} href={item.link || '#'} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/30 hover:bg-white/5'}`}>
              <item.icon size={20} />
              <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">{item.label}</span>
            </Link>
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
            {isDeveloper && (
              <div className="h-12 px-6 bg-blue-600/10 rounded-full flex items-center gap-3 border border-blue-600/20">
                <Code className="text-blue-500" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Developer Access</span>
              </div>
            )}
            <button className="h-12 px-6 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-transform whitespace-nowrap">
              <Plus size={16} /> New Project
            </button>
          </div>
        </header>

        {/* Conteúdo em Manutenção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[3rem] p-10 md:p-20 text-center border border-white/5 mt-10"
        >
          <Wrench size={64} className="text-blue-500 mx-auto mb-8" />
          <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Analytics Under Maintenance</h2>
          <p className="text-white/40 max-w-xl mx-auto mb-10">
            We are currently upgrading our real-time analytics engine. Please check back soon for detailed performance metrics.
          </p>
          
          {isDeveloper && (
            <Link href="/dashboard-admin">
              <button className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto">
                Access Admin Tools <ArrowRight size={14} />
              </button>
            </Link>
          )}
        </motion.div>
      </main>
    </div>
  );
}