import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get('guild_id');

  if (!guildId) return NextResponse.json({ active: false, reason: 'missing_id' });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('guilds')
    .select('state, guild_id')
    .eq('guild_id', guildId)
    .maybeSingle();

  console.log('Busca:', { requestedId: guildId, foundData: data, error });

  const isActive = data ? Boolean(data.state) : false;

  return NextResponse.json({ 
    active: isActive,
    debug_data: data 
  });
}