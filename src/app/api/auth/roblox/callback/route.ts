import { NextResponse } from 'next/server';
import { robloxLib } from '@/lib/roblox';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.redirect(new URL('/login?error=no_code', req.url));

  try {
    // 1. Trocar código por token
    const tokenData = await robloxLib.exchangeCode(code);
    
    // 2. Pegar info do usuário no Roblox
    const userInfo = await robloxLib.getUserInfo(tokenData.access_token);

    // 3. Inicializar Supabase com Service Role para gerenciar perfis
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 4. Sincronizar com a tabela de perfis
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        roblox_id: userInfo.sub,
        roblox_username: userInfo.preferred_username,
        roblox_display_name: userInfo.nickname || userInfo.preferred_username,
        avatar_url: userInfo.picture,
        updated_at: new Date().toISOString()
      }, { onConflict: 'roblox_id' })
      .select()
      .single();

    if (error) throw error;

    // 5. Redirecionar para a página inicial (não mais para o dashboard)
    const response = NextResponse.redirect(new URL('/', req.url));
    
    // Cookie de segurança para identificar que o usuário está logado
    response.cookies.set('lostyo_roblox_logged', 'true', { 
      path: '/', 
      httpOnly: true, 
      secure: true, 
      sameSite: 'lax' 
    });

    return response;
  } catch (error) {
    console.error('Roblox Auth Error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
  }
}