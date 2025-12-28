"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Gamepad2, Users, Activity, 
  Settings, LogOut, Code, Wrench, Plus, ArrowRight 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      const robloxId = Cookies.get('lostyo_roblox_id');

      if (!loggedCookie || !robloxId) {
        window.location.href = '/login';
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('roblox_id', robloxId)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Activity className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      {/* Sidebar Simples */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 hidden md:flex">
        <Link href="/" className="flex items-center gap-4 mb-12">
          <img src="https://cdn.lostyo.com/logo.png" className="w-8 h-8" alt="Logo" />
          <span className="font-black tracking-tighter text-xl">Lostyo</span>
        </Link>
        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-600 text-white">
            <LayoutDashboard size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
          </button>
        </nav>
        <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500/60 hover:bg-red-500/5">
          <LogOut size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
        </button>
      </aside>

      <main className="flex-grow p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter mb-2 text-mask">Welcome, {profile?.roblox_display_name}.</h1>
          <p className="text-white/30 text-sm font-medium">Standard access protocol active.</p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[3rem] p-20 text-center border border-white/5">
          <Wrench size={64} className="text-blue-500 mx-auto mb-8" />
          <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Analytics Engine Offline</h2>
          <p className="text-white/40 max-w-xl mx-auto">We are currently synchronizing data with Roblox servers. Your performance metrics will appear here shortly.</p>
        </motion.div>
      </main>
    </div>
  );
}