"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, LayoutDashboard, Shield, Settings, FileText, BarChart, Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { UserDropdown } from '../auth/user-dropdown';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/dashboard/logs', icon: FileText, label: 'Logs' },
  { href: '/dashboard/security', icon: Shield, label: 'Security' },
  { href: '/dashboard/options', icon: Settings, label: 'Options' },
  { href: '/dashboard/info', icon: Info, label: 'Information' },
];

const Sidebar = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => {
  const pathname = usePathname();
  
  return (
    <nav className={cn("flex flex-col space-y-2 p-4", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} onClick={onLinkClick}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-12 rounded-xl text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                  : "text-white/60 hover:bg-[#1A1A1E] hover:text-white"
              )}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 bg-[#141417] border-r border-[#1A1A1E] flex flex-col p-4 pt-8 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-8 px-4">
            <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-8 h-8" />
            <span className="text-lg font-black tracking-tight text-white">LostyoCord</span>
          </div>
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0B0B0D] p-4 border-b border-[#1A1A1E] flex items-center justify-between">
          {isMobile ? (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#141417] border-r border-[#1A1A1E] p-0 pt-8">
                <div className="flex items-center gap-3 mb-8 px-8">
                  <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-8 h-8" />
                  <span className="text-lg font-black tracking-tight text-white">LostyoCord</span>
                </div>
                <Sidebar className="px-4" onLinkClick={() => setIsSheetOpen(false)} />
              </SheetContent>
            </Sheet>
          ) : (
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          )}
          
          <div className="flex items-center gap-4">
            {isMobile && (
              <div className="flex items-center gap-3">
                <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-7 h-7" />
                <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
              </div>
            )}
            <UserDropdown />
          </div>
        </header>

        <div className="p-6 md:p-10 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};