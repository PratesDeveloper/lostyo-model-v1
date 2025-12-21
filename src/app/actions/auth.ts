"use server";

import { exchangeCodeForToken, createJWT } from "@/lib/auth/manual-auth-server";
import { cookies } from "next/headers";
import { supabase } from "@/integrations/supabase/client";

export async function handleDiscordAuth(code: string) {
  try {
    const tokenData = await exchangeCodeForToken(code);
    const jwtToken = await createJWT(tokenData);

    // Salvar no banco de dados via server-side
    const { error: upsertError } = await supabase.from('users').upsert({
      id: tokenData.user.id,
      username: tokenData.user.username,
      avatar: tokenData.user.avatar,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
    }, { onConflict: 'id' });

    if (upsertError) throw upsertError;

    // Definir cookie via Next.js 15 cookies API
    const cookieStore = await cookies();
    cookieStore.set('auth-token', jwtToken, {
      path: '/',
      httpOnly: false, // Mantido false para o ManualAuthProvider ler no cliente
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    });

    return { success: true };
  } catch (error: any) {
    console.error("Auth Action Error:", error);
    return { success: false, error: error.message };
  }
}