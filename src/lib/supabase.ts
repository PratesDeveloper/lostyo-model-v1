import { createClient } from '@supabase/supabase-js';

// Tipos para os dados
export interface Guild {
  guild_id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  updated_at: string;
  onboarding_complete: boolean;
}

export interface Infraction {
  id: string;
  user_id: string;
  guild_id: string;
  type: string;
  reason: string;
  moderator_id: string;
  created_at: string;
}

export interface Member {
  id: string;
  username: string;
  avatar_url: string | null;
  role: string;
  join_date: string;
  message_count: number;
}

// Inicializar o cliente do Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Funções para buscar dados
export const getGuilds = async (userId: string): Promise<Guild[]> => {
  const { data, error } = await supabase
    .from('guilds')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching guilds:', error);
    return [];
  }
  
  return data || [];
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
};

export const getInfractions = async (guildId: string): Promise<Infraction[]> => {
  const { data, error } = await supabase
    .from('infractions')
    .select('*')
    .eq('guild_id', guildId);
  
  if (error) {
    console.error('Error fetching infractions:', error);
    return [];
  }
  
  return data || [];
};

export const getMembers = async (guildId: string): Promise<Member[]> => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('guild_id', guildId);
  
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  
  return data || [];
};

export const getLogs = async (guildId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .eq('guild_id', guildId);
  
  if (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
  
  return data || [];
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<boolean> => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) {
    console.error('Error updating profile:', error);
    return false;
  }
  
  return true;
};

export const updateSettings = async (guildId: string, updates: any): Promise<boolean> => {
  const { error } = await supabase
    .from('guilds')
    .update(updates)
    .eq('guild_id', guildId);
  
  if (error) {
    console.error('Error updating settings:', error);
    return false;
  }
  
  return true;
};