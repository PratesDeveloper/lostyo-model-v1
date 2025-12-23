import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get('guild_id');

  if (!guildId) return NextResponse.json({ active: false });

  // Cliente direto com as variáveis de ambiente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Busca simples: procura o ID e retorna o estado
  const { data } = await supabase
    .from('guilds')
    .select('state')
    .eq('guild_id', guildId)
    .maybeSingle();

  return NextResponse.json({ active: !!(data && data.state === true) });
}