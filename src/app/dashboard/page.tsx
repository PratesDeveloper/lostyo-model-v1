"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  BarChart3, 
  Shield, 
  History, 
  Settings2, 
  Info, 
  Edit3, 
  Users, 
  Zap, 
  ChevronRight,
  LogOut,
  Search,
  Bell
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onboardingComplete = Cookies.get('onboarding_complete') === 'true';
    if (!onboardingComplete) {
      router.push('/start');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  const menuItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "logs", label: "Audit Logs", icon: History },
    { id: "security", label: "Security", icon: Shield },
    { id: "members", label: "Members", icon: Users },
    { id: "settings", label: "Options", icon: Settings2 },
    { id: "info", label: "Information", icon: Info },
    { id: "edit", label: "Customize", icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141417] border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="https://cdn.lostyo.com/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg">LostyoCord</span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                activeTab === item.id 
                  ? "bg-[#5865F2] text-white" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} className={cn(
                activeTab === item.id ? "text-white" : "text-white/20 group-hover:text-white"
              )} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={() => {
              Cookies.remove('lostyo_logged_in');
              Cookies.remove('onboarding_complete');
              router.push('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0B0B0D]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full w-96">
            <Search size={16} className="text-white/20" />
            <input 
              placeholder="Search features..." 
              className="bg-transparent border-none outline-none text-xs font-medium w-full text-white placeholder:text-white/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right">
                <p className="text-xs font-bold">User#0001</p>
                <p className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Premium</p>
              </div>
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src="https://cdn.discordapp.com/embed/avatars/0.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              {menuItems.find(i => i.id === activeTab)?.label}
              <Zap className="text-[#5865F2]" size={24} />
            </h1>
            <p className="text-white/40 font-medium">Manage and monitor your Discord community's performance.</p>
          </div>

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#141417] border-white/5 rounded-3xl p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest">Total Members</CardTitle>
                </CardHeader>
                <div className="text-4xl font-black">12,482</div>
                <div className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
                  +12% this month
                </div>
              </Card>
              <Card className="bg-[#141417] border-white/5 rounded-3xl p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest">Active Users</CardTitle>
                </CardHeader>
                <div className="text-4xl font-black">3,120</div>
                <div className="text-white/20 text-xs font-bold mt-2">Currently online</div>
              </Card>
              <Card className="bg-[#141417] border-white/5 rounded-3xl p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest">Messages/Day</CardTitle>
                </CardHeader>
                <div className="text-4xl font-black">45.2k</div>
                <div className="text-blue-400 text-xs font-bold mt-2">Peak engagement</div>
              </Card>

              <Card className="md:col-span-3 bg-[#141417] border-white/5 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-6">Growth Statistics</h3>
                  <div className="h-64 bg-white/5 rounded-2xl flex items-center justify-center text-white/10">
                    [Growth Chart Placeholder]
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "logs" && (
            <Card className="bg-[#141417] border-white/5 rounded-3xl overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Recent Activities</h3>
                  <Button variant="outline" className="rounded-full border-white/10 text-xs font-bold h-9">Download CSV</Button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                          <History size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">User Profile Updated</p>
                          <p className="text-[10px] text-white/30 uppercase font-black">Action by Moderator#123</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-white/40">2 HOURS AGO</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#141417] border-white/5 rounded-3xl p-8">
                <Shield className="text-green-500 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-2">Automod Active</h3>
                <p className="text-white/40 text-sm mb-6">Protecting your server from spam and malicious links automatically.</p>
                <Button className="w-full rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 font-bold border-none">Configure Filter</Button>
              </Card>
              <Card className="bg-[#141417] border-white/5 rounded-3xl p-8">
                <Lock className="text-[#5865F2] mb-6" size={32} />
                <h3 className="text-xl font-bold mb-2">VPN Detection</h3>
                <p className="text-white/40 text-sm mb-6">Block users trying to bypass bans using VPNs or proxies.</p>
                <Button className="w-full rounded-full bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30 font-bold border-none">Enable Protection</Button>
              </Card>
            </div>
          )}

          {/* Outras abas podem ser implementadas similarmente */}
          {["settings", "info", "edit", "members"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Settings2 className="text-white/20" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Section under construction</h2>
              <p className="text-white/40 max-w-sm">We are working hard to bring this feature to your dashboard. Stay tuned!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}