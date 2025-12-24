import { NextResponse } from 'next/server';
import { discordLib } from '@/lib/discord';
import { supabase } from '@/integrations/supabase/client';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

    // 1. Troca o código pelo token
    const tokenData = await discordLib.exchangeCode(code);
    
    // 2. Busca o usuário do Discord
    const discordUser = await discordLib.getUser(tokenData.access_token);

    // 3. Sincroniza com Supabase Auth / Profiles
    // Nota: Como é manual, aqui você usaria a lógica para criar uma sessão ou registrar o user.
    // Para simplificar e manter a persistência, usamos o Supabase para gerenciar o perfil.
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        id: discordUser.id, // Supondo que a tabela use ID do Discord ou UUID linkado
        username: discordUser.username,
        avatar_url: discordLib.getAvatarUrl(discordUser.id, discordUser.avatar),
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: profile });
  } catch (error: any) {
    console.error('Manual Auth Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}