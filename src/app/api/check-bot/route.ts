import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  console.log(">>> [API CHECK-BOT] Iniciando verificação...");
  
  try {
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guild_id');
    console.log(">>> [API CHECK-BOT] Guild ID recebido:", guildId);

    if (!guildId) {
      console.log(">>> [API CHECK-BOT] Erro: guild_id ausente");
      return NextResponse.json({ active: false, error: "guild_id_missing" }, { status: 400 });
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log(">>> [API CHECK-BOT] Checando variáveis de ambiente...");
    if (!url || !key) {
      console.log(">>> [API CHECK-BOT] Erro: SUPABASE_URL ou SERVICE_ROLE_KEY não configurados");
      return NextResponse.json({ 
        active: false, 
        error: "env_vars_missing",
        details: { url: !!url, key: !!key }
      }, { status: 500 });
    }

    console.log(">>> [API CHECK-BOT] Conectando ao Supabase...");
    const supabase = createClient(url, key);

    console.log(">>> [API CHECK-BOT] Executando query na tabela 'guilds'...");
    const { data, error } = await supabase
      .from('guilds')
      .select('state')
      .eq('guild_id', guildId)
      .maybeSingle();

    if (error) {
      console.log(">>> [API CHECK-BOT] Erro do Supabase:", error.message);
      return NextResponse.json({ active: false, error: "database_error", message: error.message }, { status: 500 });
    }

    console.log(">>> [API CHECK-BOT] Resultado da query:", data);
    const isActive = !!(data && data.state === true);
    
    console.log(">>> [API CHECK-BOT] Finalizado. Ativo:", isActive);
    return NextResponse.json({ active: isActive });

  } catch (e: any) {
    console.log(">>> [API CHECK-BOT] ERRO CRÍTICO:", e.message);
    return NextResponse.json({ 
      active: false, 
      error: "internal_exception", 
      message: e.message 
    }, { status: 500 });
  }
}