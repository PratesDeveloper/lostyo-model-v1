"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Shield, 
  Settings, 
  BarChart3, 
  Users, 
  MessageSquare, 
  ChevronRight,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Shield, label: "Moderation", href: "/dashboard/moderation" },
    { icon: MessageSquare, label: "Logs", href: "/dashboard/logs" },
    { icon: Users, label: "Members", href: "/dashboard/members" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#0B0B0D] overflow-hidden">
        {/* Sidebar Customizada */}
        <Sidebar className="border-r border-white/5 bg-[#0F0F12]">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-8 h-8" />
              <span className="font-black text-white tracking-tighter text-xl">Lostyo</span>
            </Link>
            
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all group">
                    <item.icon size={20} className="group-hover:text-[#5865F2] transition-colors" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </SidebarHeader>
          
          <SidebarContent className="mt-auto p-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all group"
            >
              <LogOut size={20} />
              <span className="text-sm font-bold">Logout</span>
            </button>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col flex-1 bg-[#0B0B0D]">
          {/* Header Superior */}
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0B0D]/50 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden text-white" />
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search servers..." 
                  className="bg-white/5 border-none rounded-full pl-10 pr-4 py-2 text-xs font-bold text-white w-64 focus:ring-1 ring-[#5865F2]/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/40">
                <Bell size={20} />
              </Button>
              <div className="h-8 w-[1px] bg-white/5 mx-2" />
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-white tracking-tight">{profile?.username || 'User'}</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Administrator</p>
                </div>
                <Avatar className="h-10 w-10 border-2 border-white/5">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-[#5865F2] text-white">U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Conteúdo Principal */}
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}