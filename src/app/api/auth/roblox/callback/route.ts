import { NextResponse } from 'next/server';
import { robloxLib } from '@/lib/roblox';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', req.url));
  }

  try {
    const tokenData = await robloxLib.exchangeCode(code);
    const userInfo = await robloxLib.getUserInfo(tokenData.access_token);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('profiles')
      .upsert({
        roblox_id: userInfo.sub,
        roblox_username: userInfo.preferred_username,
        roblox_display_name: userInfo.nickname || userInfo.preferred_username,
        avatar_url: userInfo.picture,
        updated_at: new Date().toISOString()
      }, { onConflict: 'roblox_id' });

    if (error) throw error;

    const response = NextResponse.redirect(new URL('/', req.url));
    
    // IMPORTANTE: httpOnly deve ser false para que o js-cookie consiga ler no navegador
    const cookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false 
    };

    response.cookies.set('lostyo_roblox_logged', 'true', cookieOptions);
    response.cookies.set('lostyo_roblox_id', userInfo.sub, cookieOptions);

    return response;
  } catch (err: any) {
    console.error('[AuthCallback] Error:', err.message);
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
  }
}