import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('discord_user_id')?.value;

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: user } = await supabase
    .from('users')
    .select('access_token')
    .eq('id', userId)
    .single();

  if (!user?.access_token) return NextResponse.json({ error: 'No token found' }, { status: 401 });

  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    const guilds = await response.json();
    
    // Filtrar apenas onde ele tem permissão de gerenciar servidor (MANAGE_GUILD = 0x20 ou ADMINISTRATOR = 0x8)
    const filteredGuilds = guilds.filter((g: any) => (parseInt(g.permissions) & 0x20) === 0x20 || (parseInt(g.permissions) & 0x8) === 0x8);

    return NextResponse.json(filteredGuilds);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}