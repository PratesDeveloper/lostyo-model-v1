import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// URL base para a API do Discord
const DISCORD_API_URL = 'https://discord.com/api/v10';

// Variáveis de ambiente (Secrets) que devem ser configuradas no Supabase
const DISCORD_CLIENT_ID = Deno.env.get('DISCORD_CLIENT_ID');
const DISCORD_CLIENT_SECRET = Deno.env.get('DISCORD_CLIENT_SECRET');
const DISCORD_REDIRECT_URI = Deno.env.get('DISCORD_REDIRECT_URI');

serve(async (req) => {
  // 1. CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code) {
      return new Response(JSON.stringify({ error: 'Missing authorization code' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Troca do Código por Tokens de Acesso do Discord
    const tokenResponse = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: DISCORD_REDIRECT_URI!,
        scope: 'identify guilds guilds.join',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Discord Token Exchange Failed:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to exchange code for tokens' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokens;

    // 3. Obter o Perfil do Usuário do Discord
    const userResponse = await fetch(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to fetch Discord user profile');
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const discordUser = await userResponse.json();
    const discordUserId = discordUser.id;

    // 4. Autenticar no Supabase (usando o token de acesso do Discord como JWT)
    // Nota: O Supabase não tem um provedor Discord nativo para autenticação via JWT,
    // mas podemos usar o token de acesso do Discord para identificar o usuário.
    // Para simplificar, vamos usar o Service Role Key para gerenciar o usuário diretamente no banco de dados.
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, // Usando Service Role Key para acesso de escrita
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    // 5. Inserir ou Atualizar o Usuário na Tabela 'users'
    const { data, error: dbError } = await supabaseAdmin
      .from('users')
      .upsert(
        {
          id: discordUserId,
          username: discordUser.username,
          discriminator: discordUser.discriminator,
          avatar: discordUser.avatar,
          access_token: access_token,
          refresh_token: refresh_token,
          expires_at: expiresAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (dbError) {
      console.error('Supabase DB Error:', dbError);
      return new Response(JSON.stringify({ error: 'Database update failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 6. Retornar os tokens e o ID do usuário para o cliente
    return new Response(
      JSON.stringify({
        user_id: discordUserId,
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('General Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});