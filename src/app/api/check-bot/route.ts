import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guildId = searchParams.get('guild_id');

  if (!guildId) {
    return NextResponse.json({ error: 'Missing guild_id' }, { status: 400 });
  }

  // O cliente Supabase é instanciado APENAS no servidor
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { data, error } = await supabaseAdmin
      .from('guilds')
      .select('guild_id')
      .eq('guild_id', guildId)
      .eq('state', true)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ active: !!data });
  } catch (error) {
    console.error('[API CheckBot] Error:', error);
    return NextResponse.json({ active: false, error: 'Server error' }, { status: 500 });
  }
}