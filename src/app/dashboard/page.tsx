"use client";

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useUser } from '@/integrations/supabase/auth/session-provider';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, CheckCircle2, Users, Shield, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { isLoading, isAuthenticated, profile } = useUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
      </div>
    );
  }

  // Access Control: Redirect if not authenticated or onboarding is incomplete
  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }
  
  if (!profile?.onboarding_complete) {
    router.replace('/start');
    return null;
  }

  // Mock Data for Dashboard Overview
  const stats = [
    { title: "Total Members", value: "25,000", icon: Users, color: 'text-[#5865F2]' },
    { title: "Moderation Actions", value: "1,200", icon: Shield, color: 'text-red-500' },
    { title: "Active Commands", value: "45", icon: Zap, color: 'text-green-500' },
    { title: "Uptime (Last 30d)", value: "99.9%", icon: Clock, color: 'text-yellow-500' },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-black text-white mb-8 tracking-tight">
        Welcome back, {profile?.first_name || 'Commander'}!
      </h1>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#141417] border-[#1A1A1E] text-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/60">{stat.title}</CardTitle>
                <Icon size={20} className={stat.color} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-white/40 mt-1">+20.1% from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Area - Placeholder */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-[#141417] border-[#1A1A1E] text-white rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-white/40">
              Activity data will appear here. (Go to Logs for details)
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#141417] border-[#1A1A1E] text-white rounded-2xl">
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Bot Connection</span>
                <span className="text-green-500 font-bold flex items-center"><CheckCircle2 size={16} className="mr-1" /> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Premium Status</span>
                <span className="text-yellow-500 font-bold">Free Tier</span>
              </div>
              <Link href="/dashboard/options">
                <Button className="w-full mt-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl">
                  Configure Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}