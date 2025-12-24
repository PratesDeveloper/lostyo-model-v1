import { NextResponse } from 'next/server';
import { discordLib } from '@/lib/discord';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

    // Inicializa o cliente com service role para permitir upsert manual
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Troca o código pelo token
    const tokenData = await discordLib.exchangeCode(code);
    
    // 2. Busca o usuário do Discord
    const discordUser = await discordLib.getUser(tokenData.access_token);

    // 3. Sincroniza com Profiles usando o ID do Discord como identificador único
    // Em um cenário real, você vincularia isso ao auth.users, aqui usamos a tabela profiles diretamente
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        id: discordUser.id, // ID do Discord
        username: discordUser.username,
        avatar_url: discordLib.getAvatarUrl(discordUser.id, discordUser.avatar),
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      user: profile,
      access_token: tokenData.access_token // Opcional: retornar para o cliente se precisar de mais dados
    });
  } catch (error: any) {
    console.error('Manual Auth Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}