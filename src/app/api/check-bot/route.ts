import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get('guild_id');

  // Caso 1: Sem ID
  if (!guildId) {
    return NextResponse.json({ 
      active: false, 
      status_message: 'Faltou o guild_id na URL' 
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('guilds')
    .select('state, guild_id')
    .eq('guild_id', guildId)
    .maybeSingle(); // maybeSingle evita erro se não encontrar nada, retorna null

  // Lógica de diagnósticos
  let statusMessage = '';
  let isActive = false;

  if (error) {
    statusMessage = `Erro no Supabase: ${error.message}`;
  } else if (!data) {
    statusMessage = 'Não achou o doc (Guild não registrada)';
  } else if (!data.state) {
    statusMessage = 'Achou o doc, mas não achou o state (State false/null)';
  } else {
    isActive = true;
    statusMessage = 'Tá confirmado (Doc existe e State true)';
  }

  console.log(`[DEBUG] Guild: ${guildId} | Status: ${statusMessage}`);

  return NextResponse.json({ 
    active: isActive,
    status_message: statusMessage,
    debug_data: data 
  });
}