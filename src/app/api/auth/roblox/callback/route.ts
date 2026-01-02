import { NextResponse } from 'next/server';
import { robloxLib } from '@/lib/roblox';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/v1/access?error=no_code', req.url));
  }

  try {
    const tokenData = await robloxLib.exchangeCode(code);
    const userInfo = await robloxLib.getUserInfo(tokenData.access_token);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Busca o perfil para verificar is_developer
    const { data: profile, error: profileError } = await supabase
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

    if (profileError) throw profileError;

    // Se NÃO for desenvolvedor, redireciona para a home (os usuários normais não devem acessar o portal)
    if (!profile?.is_developer) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Geração de Hash Seguro para o Router Aleatório
    const secureToken = Buffer.from(`${userInfo.sub}-${Date.now()}`).toString('hex').slice(0, 32);
    
    const response = NextResponse.redirect(new URL(`/v1/portal/${secureToken}`, req.url));
    
    const cookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 2, // 2 horas para admin session
      httpOnly: false 
    };

    response.cookies.set('lostyo_roblox_logged', 'true', cookieOptions);
    response.cookies.set('lostyo_roblox_id', userInfo.sub, cookieOptions);
    response.cookies.set('lostyo_admin_token', secureToken, cookieOptions);

    return response;
  } catch (err: any) {
    console.error('[AuthCallback] Error:', err.message);
    return NextResponse.redirect(new URL('/v1/access?error=auth_failed', req.url));
  }
}