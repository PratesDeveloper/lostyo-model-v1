import React from 'react';
import { Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 tracking-tight text-[#5865F2]">Dashboard</h1>
        
        <div className="bg-[#141417] p-8 rounded-3xl border border-[#1A1A1E]">
          <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
          <p className="text-white/60 mb-6">
            Your setup is complete. This is your main dashboard area.
          </p>
          
          <div className="flex gap-4">
            <Link href="/" passHref>
              <Button variant="outline" className="bg-[#1A1A1E] border-[#2A2A2E] text-white hover:bg-[#2A2A2E]">
                <Home className="w-4 h-4 mr-2" />
                Back to Landing
              </Button>
            </Link>
            <Link href="/settings" passHref>
              <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
                <Settings className="w-4 h-4 mr-2" />
                Go to Settings (Placeholder)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}