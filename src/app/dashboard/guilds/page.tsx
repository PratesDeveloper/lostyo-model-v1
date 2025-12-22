"use client";

import React from 'react';
import { GuildSelector } from '@/components/guilds/GuildSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GuildsPage() {
  const handleGuildSelect = (guildId: string) => {
    // Redirect to guild management page or open modal
    console.log('Selected guild:', guildId);
    // You can implement navigation to a specific guild management page
    // or open a modal with guild-specific settings
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-block mb-4">
            <Button variant="ghost" className="text-white/60 hover:text-white">
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Your Communities</h1>
          <p className="text-white/40">
            Manage servers where you have administrator permissions
          </p>
        </div>

        {/* Guild Selector */}
        <GuildSelector onGuildSelect={handleGuildSelect} />
      </div>
    </div>
  );
}