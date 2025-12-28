"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getProfileByRobloxId(robloxId: string) {
  if (!robloxId) return null;
  const { data } = await supabaseAdmin.from('profiles').select('*').eq('roblox_id', robloxId).single();
  return data;
}

export async function getProjectSettings(robloxId: string) {
  const { data, error } = await supabaseAdmin
    .from('project_settings')
    .select('*')
    .eq('roblox_id', robloxId)
    .single();
  
  if (error && error.code === 'PGRST116') {
    // Cria se não existir
    const { data: newData } = await supabaseAdmin
      .from('project_settings')
      .insert({ roblox_id: robloxId })
      .select()
      .single();
    return newData;
  }
  return data;
}

export async function updateProjectSettings(robloxId: string, updates: any) {
  const { data, error } = await supabaseAdmin
    .from('project_settings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('roblox_id', robloxId);
  
  if (error) throw error;
  return data;
}