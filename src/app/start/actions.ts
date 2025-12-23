"use server";

import { createClient } from '@/integrations/supabase/server';
import { revalidatePath } from 'next/cache';

export async function completeOnboarding() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { error } = await supabase
    .from('profiles')
    .update({ onboarding_complete: true, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, error: error.message };
  }
  
  // Revalidate the path to ensure the Navbar and Start page reflect the change immediately
  revalidatePath('/start');
  revalidatePath('/dashboard');

  return { success: true };
}