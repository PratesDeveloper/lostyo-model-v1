import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const guildId = searchParams.get('guild_id');

    if (!guildId) {
      return NextResponse.json({ active: false, error: 'Missing guild_id' }, { status: 400 });
    }

    // Buscando chaves do ambiente
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[CRITICAL] API CheckBot: Environment variables missing');
      return NextResponse.json({ 
        active: false, 
        error: 'Server configuration error' 
      }, { status: 500 });
    }

    // Inicializando cliente administrativo (Server Side Only)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // Consulta otimizada
    const { data, error } = await supabaseAdmin
      .from('guilds')
      .select('guild_id, state')
      .eq('guild_id', guildId)
      .eq('state', true)
      .maybeSingle();

    if (error) {
      console.error('[DB ERROR] API CheckBot:', error.message);
      return NextResponse.json({ active: false, error: 'Database lookup failed' }, { status: 500 });
    }

    // Retorno de sucesso
    return NextResponse.json({ 
      active: !!data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[FATAL ERROR] API CheckBot:', error.message || error);
    return NextResponse.json({ 
      active: false, 
      error: 'Internal processing error' 
    }, { status: 500 });
  }
}