import { NextResponse } from 'next/server';
import { robloxLib } from '@/lib/roblox';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('[AuthCallback] No code provided');
    return NextResponse.redirect(new URL('/login?error=no_code', req.url));
  }

  try {
    // 1. Trocar código por token
    const tokenData = await robloxLib.exchangeCode(code);
    
    // 2. Pegar info do usuário no Roblox
    const userInfo = await robloxLib.getUserInfo(tokenData.access_token);

    // 3. Inicializar Supabase com Service Role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 4. Sincronizar Perfil (Upsert)
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

    // 5. Preparar Resposta de Redirecionamento
    const response = NextResponse.redirect(new URL('/', req.url));
    
    // Configurações de Cookie (Seguro e acessível pelo cliente para a Navbar)
    const cookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    };

    response.cookies.set('lostyo_roblox_logged', 'true', cookieOptions);
    response.cookies.set('lostyo_roblox_id', userInfo.sub, cookieOptions);

    return response;
  } catch (err: any) {
    console.error('[AuthCallback] Error:', err.message);
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
  }
}