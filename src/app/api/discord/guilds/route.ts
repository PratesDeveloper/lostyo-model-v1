import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('lostyo_user_id')?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Pegar o token do usuário no banco
  const { data: user } = await supabase
    .from('users')
    .select('access_token')
    .eq('id', userId)
    .single();

  if (!user?.access_token) {
    return NextResponse.json({ error: 'Token not found' }, { status: 401 });
  }

  // 2. Buscar guildas no Discord
  const discordResponse = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });

  if (!discordResponse.ok) {
    return NextResponse.json({ error: 'Failed to fetch Discord guilds' }, { status: discordResponse.status });
  }

  const allGuilds = await discordResponse.json();

  // 3. Filtrar por Admin (0x8) ou Owner
  const adminGuilds = allGuilds.filter((guild: any) => {
    const isAdmin = (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8);
    return isAdmin || guild.owner;
  });

  // 4. Verificar bot no Supabase
  const guildIds = adminGuilds.map((g: any) => g.id);
  const { data: botGuilds } = await supabase
    .from('guilds')
    .select('guild_id, state')
    .in('guild_id', guildIds);

  const botStatusMap = new Map(botGuilds?.map(g => [g.guild_id, g.state]) || []);

  // 5. Formatar resposta final
  const result = adminGuilds.map((guild: any) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
    banner: guild.banner ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png` : null,
    active: botStatusMap.get(guild.id) || false,
    permissions: guild.permissions
  }));

  return NextResponse.json(result);
}