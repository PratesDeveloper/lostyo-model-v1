import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('No code provided in callback');
    return NextResponse.redirect(new URL('/login?error=no_code', req.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI || 'https://lostyo.com/auth/callback';

  if (!clientId || !clientSecret) {
    console.error('Missing Discord Environment Variables');
    return NextResponse.redirect(new URL('/login?error=server_config_error', req.url));
  }

  try {
    // 1. Trocar o código pelo Access Token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const tokens = await tokenResponse.json();
    if (tokens.error) {
      console.error('Discord Token Exchange Error:', tokens);
      return NextResponse.redirect(new URL(`/login?error=${tokens.error}`, req.url));
    }

    // 2. Buscar info do usuário
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    
    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('Discord User Info Error:', errorData);
      return NextResponse.redirect(new URL('/login?error=user_info_failed', req.url));
    }

    const userData = await userResponse.json();

    // 3. Salvar no Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    const { error: dbError } = await supabase.from('users').upsert({
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error('Supabase DB Upsert Error:', dbError);
      throw dbError;
    }

    // 4. Setar cookies de sessão
    const cookieStore = await cookies();
    const cookieOptions = { 
      path: '/', 
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: 'lax' as const
    };

    cookieStore.set('lostyo_logged_in', 'true', cookieOptions);
    cookieStore.set('lostyo_user_id', userData.id, cookieOptions);

    return NextResponse.redirect(new URL('/start', req.url));
  } catch (err: any) {
    console.error('Critical Callback Failure:', err.message || err);
    return NextResponse.redirect(new URL('/login?error=internal_server_error', req.url));
  }
}