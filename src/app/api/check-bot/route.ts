import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guild_id');

    if (!guildId) {
      return NextResponse.json({ active: false, error: "guild_id_missing" }, { status: 400 });
    }

    // Usando as variáveis de ambiente padrão do servidor
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json({ 
        active: false, 
        error: "env_vars_missing",
        details: { url: !!url, key: !!key }
      }, { status: 500 });
    }

    const supabase = createClient(url, key);

    // Proteção básica: Verificar se a requisição vem de um usuário autenticado
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (!user) {
        return NextResponse.json({ active: false, error: "unauthorized" }, { status: 401 });
      }
    }

    const { data, error } = await supabase
      .from('guilds')
      .select('state')
      .eq('guild_id', guildId)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ active: !!(data && data.state === true) });

  } catch (e: any) {
    return NextResponse.json({ 
      active: false, 
      error: "internal_error", 
      message: e.message 
    }, { status: 500 });
  }
}