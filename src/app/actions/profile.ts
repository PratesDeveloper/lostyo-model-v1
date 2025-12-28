"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getProfileByRobloxId(robloxId: string) {
  if (!robloxId) return null;

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('roblox_id', robloxId)
    .single();

  if (error) {
    console.error("[Action] Error fetching profile:", error.message);
    return null;
  }

  return data;
}

export async function getAllProjects() {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*');

  if (error) {
    console.error("[Action] Error fetching projects:", error.message);
    return [];
  }

  return data;
}