"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  hasBot: boolean;
  botStatus: 'installed' | 'not_installed' | 'error';
  dbState: boolean;
  isOwner: boolean;
  permissions: number;
}

interface UserGuildsHook {
  adminGuilds: Guild[];
  loading: boolean;
  error: string | null;
  totalAdminGuilds: number;
  guildsWithBot: number;
  refetch: () => Promise<void>;
}

const EDGE_FUNCTION_URL = 'https://wxlltninzxsmlzenkctw.supabase.co/functions/v1/check-user-guilds';

export function useUserGuilds(): UserGuildsHook {
  const [adminGuilds, setAdminGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAdminGuilds, setTotalAdminGuilds] = useState(0);
  const [guildsWithBot, setGuildsWithBot] = useState(0);

  const fetchUserGuilds = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get user ID from cookies or session
      // For now, we'll use a placeholder - you'll need to implement proper user ID retrieval
      const userId = Cookies.get('discord_user_id');
      
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch guilds');
      }

      const data = await response.json();
      
      setAdminGuilds(data.adminGuilds || []);
      setTotalAdminGuilds(data.totalAdminGuilds || 0);
      setGuildsWithBot(data.guildsWithBot || 0);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load guilds: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGuilds();
  }, []);

  return {
    adminGuilds,
    loading,
    error,
    totalAdminGuilds,
    guildsWithBot,
    refetch: fetchUserGuilds,
  };
}