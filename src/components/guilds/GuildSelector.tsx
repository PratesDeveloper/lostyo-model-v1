"use client";

import React from 'react';
import { useUserGuilds } from '@/hooks/useUserGuilds';
import { Button } from '@/components/ui/button';
import { Bot, CheckCircle2, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface GuildSelectorProps {
  onGuildSelect?: (guildId: string) => void;
}

export function GuildSelector({ onGuildSelect }: GuildSelectorProps) {
  const { adminGuilds, loading, error, totalAdminGuilds, guildsWithBot, refetch } = useUserGuilds();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <p className="text-white/60 mb-4">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2" size={16} />
          Try Again
        </Button>
      </div>
    );
  }

  if (adminGuilds.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-white font-bold text-lg mb-2">No Admin Guilds Found</h3>
        <p className="text-white/60 mb-4">
          You need to be a server owner or have administrator permissions to manage guilds.
        </p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2" size={16} />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#141417] border-[#1A1A1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Admin Guilds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalAdminGuilds}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#141417] border-[#1A1A1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">With Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{guildsWithBot}</div>
          </CardContent>
        </Card>
      </div>

      {/* Guilds List */}
      <div className="space-y-3">
        {adminGuilds.map((guild) => (
          <Card 
            key={guild.id} 
            className="bg-[#141417] border-[#1A1A1E] hover:border-[#5865F2]/30 transition-colors"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Guild Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#1A1A1E] flex items-center justify-center overflow-hidden">
                  {guild.icon ? (
                    <img 
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                      alt={guild.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white/30 font-bold text-sm">
                      {guild.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Guild Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold">{guild.name}</h4>
                    {guild.isOwner && (
                      <span className="text-[10px] bg-[#5865F2] text-white px-2 py-0.5 rounded-full font-bold">
                        OWNER
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-xs">
                    ID: {guild.id}
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3">
                {guild.hasBot ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-bold">Installed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white/40">
                    <Bot size={20} />
                    <span className="text-sm font-bold">Not Installed</span>
                  </div>
                )}
                
                <Button 
                  size="sm"
                  onClick={() => onGuildSelect?.(guild.id)}
                  className={guild.hasBot ? "bg-[#5865F2]" : "bg-green-600"}
                >
                  {guild.hasBot ? 'Manage' : 'Add Bot'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button onClick={refetch} variant="ghost" className="text-white/60 hover:text-white">
          <RefreshCw className="mr-2" size={16} />
          Refresh Guilds
        </Button>
      </div>
    </div>
  );
}