"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  Shield, 
  Settings, 
  ListTodo, 
  Info, 
  Edit3, 
  Search,
  LayoutDashboard,
  Bell,
  Menu,
  ChevronRight,
  Zap,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm",
      active ? "bg-[#5865F2] text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon size={20} />
    {label}
  </button>
);

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile?.onboarding_complete) {
        router.push('/start');
        return;
      }

      setUser(profile);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "New Members", val: "+1,240", color: "text-green-500" },
                { label: "Message Vol.", val: "42.5k", color: "text-[#5865F2]" },
                { label: "Engagement", val: "84%", color: "text-orange-500" }
              ].map((s, i) => (
                <Card key={i} className="bg-[#141417] p-8 rounded-[2rem] border-white/5">
                  <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-2">{s.label}</p>
                  <p className={cn("text-4xl font-black", s.color)}>{s.val}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Security & Shields</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Anti-Spam Filter", desc: "Blocks rapid duplicate messages", active: true },
                { title: "Raiding Protection", desc: "Auto-quarantine on suspicious joins", active: false },
                { title: "Invite Blocker", desc: "Prevents advertising other servers", active: true }
              ].map((shield, i) => (
                <div key={i} className="bg-[#141417] p-6 rounded-[2rem] flex items-center justify-between border border-white/5">
                  <div>
                    <h4 className="text-white font-bold">{shield.title}</h4>
                    <p className="text-white/30 text-sm">{shield.desc}</p>
                  </div>
                  <Button className={cn("rounded-full h-10 px-6 font-bold", shield.active ? "bg-green-500/20 text-green-500" : "bg-white/5 text-white/40")}>
                    {shield.active ? "Active" : "Disabled"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Audit Logs</h2>
            <div className="bg-[#141417] rounded-[2rem] overflow-hidden border border-white/5">
              {[
                { action: "Role Update", user: "Lostyo", time: "2m ago" },
                { action: "Message Deleted", user: "System", time: "15m ago" },
                { action: "Member Joined", user: "Zack#0001", time: "1h ago" }
              ].map((log, i) => (
                <div key={i} className="p-4 px-8 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#5865F2]" />
                    <span className="text-white font-medium">{log.action}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-white/40 text-xs font-bold">{log.user}</span>
                    <span className="text-white/20 text-xs">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="text-white/20 text-center py-20">Section coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#141417] border-r border-white/5 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-12 pl-2">
          <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-8 h-8" />
          <span className="text-lg font-black tracking-tight text-white uppercase italic">Lostyo</span>
        </div>

        <nav className="space-y-2 flex-grow">
          <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Shield} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <SidebarItem icon={ListTodo} label="Audit Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <SidebarItem icon={Edit3} label="Editor" active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
          <div className="pt-8 pb-4 px-4 text-[10px] font-black text-white/20 uppercase tracking-widest">System</div>
          <SidebarItem icon={Settings} label="Options" active={activeTab === 'options'} onClick={() => setActiveTab('options')} />
          <SidebarItem icon={Info} label="Information" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
        </nav>

        <div className="mt-auto bg-white/5 p-4 rounded-3xl flex items-center gap-3">
          <img src={user?.avatar_url} className="w-10 h-10 rounded-2xl" alt="" />
          <div className="overflow-hidden">
            <p className="text-sm font-black text-white truncate">{user?.username}</p>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Community Manager</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between">
          <div className="relative w-96 hidden lg:block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text" 
              placeholder="Search module or user..." 
              className="bg-white/5 w-full h-11 rounded-full pl-12 pr-6 text-sm font-medium text-white placeholder:text-white/20 focus:bg-white/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-11 w-11 rounded-full p-0 bg-white/5 hover:bg-[#5865F2] hover:text-white text-white/40">
              <Bell size={20} />
            </Button>
            <Button className="h-11 rounded-full bg-[#5865F2] hover:bg-[#4752C4] font-black px-6 gap-2">
              <Zap size={18} />
              Upgrade
            </Button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-grow p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}