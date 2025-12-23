import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const guildId = searchParams.get('guild_id');

    if (!guildId) {
      return NextResponse.json({ error: 'Missing guild_id' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[API CheckBot] Missing environment variables');
      return NextResponse.json({ active: false, error: 'Configuration error' }, { status: 500 });
    }

    // Usando Service Role Key no servidor para bypassar RLS e garantir precisão
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    const { data, error } = await supabaseAdmin
      .from('guilds')
      .select('guild_id, state')
      .eq('guild_id', guildId)
      .eq('state', true)
      .maybeSingle();

    if (error) {
      console.error('[API CheckBot] Database error:', error.message);
      return NextResponse.json({ active: false, error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ active: !!data });
  } catch (error: any) {
    console.error('[API CheckBot] Critical error:', error.message || error);
    return NextResponse.json({ active: false, error: 'Internal server error' }, { status: 500 });
  }
}