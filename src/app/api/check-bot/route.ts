import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get('guild_id');

  if (!guildId) return NextResponse.json({ active: false });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from('guilds')
    .select('state')
    .eq('guild_id', guildId)
    .maybeSingle();

  return NextResponse.json({ 
    active: !!data?.state 
  });
}