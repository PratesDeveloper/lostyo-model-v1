// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DISCORD_API_URL = 'https://discord.com/api/v10';
const DISCORD_CLIENT_ID = Deno.env.get('DISCORD_CLIENT_ID');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user ID from request
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing user ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get access token from database
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('access_token, expires_at')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return new Response(JSON.stringify({ error: 'User not found or no access token' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(userData.expires_at);
    
    if (now >= expiresAt) {
      return new Response(JSON.stringify({ error: 'Access token expired' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user's guilds from Discord
    const guildsResponse = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${userData.access_token}`,
      },
    });

    if (!guildsResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch guilds from Discord' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const guilds = await guildsResponse.json();

    // Filter guilds where user is admin or owner
    // Permissions bit for ADMINISTRATOR is 8 (0x8)
    const ADMIN_PERMISSION = 8;
    
    const adminGuilds = guilds.filter((guild: any) => {
      const isOwner = guild.owner;
      const hasAdmin = (guild.permissions & ADMIN_PERMISSION) === ADMIN_PERMISSION;
      return isOwner || hasAdmin;
    });

    // For each admin guild, check if bot is present
    const guildsWithBotStatus = await Promise.all(
      adminGuilds.map(async (guild: any) => {
        try {
          // Fetch guild members to check if bot is present
          // Note: This requires the bot to be in the guild and have permissions
          const membersResponse = await fetch(
            `${DISCORD_API_URL}/guilds/${guild.id}/members?limit=100`,
            {
              headers: {
                Authorization: `Bot ${Deno.env.get('DISCORD_BOT_TOKEN')}`,
              },
            }
          );

          if (!membersResponse.ok) {
            return {
              ...guild,
              hasBot: false,
              botStatus: 'error',
            };
          }

          const members = await membersResponse.json();
          const botPresent = members.some((member: any) => 
            member.user?.id === DISCORD_CLIENT_ID
          );

          return {
            ...guild,
            hasBot: botPresent,
            botStatus: botPresent ? 'installed' : 'not_installed',
          };
        } catch (error) {
          return {
            ...guild,
            hasBot: false,
            botStatus: 'error',
          };
        }
      })
    );

    // Also check guilds from our database
    const { data: dbGuilds } = await supabaseAdmin
      .from('guilds')
      .select('guild_id, state')
      .in('guild_id', adminGuilds.map((g: any) => g.id));

    // Merge database state with Discord data
    const finalGuilds = guildsWithBotStatus.map((guild: any) => {
      const dbGuild = dbGuilds?.find((g: any) => g.guild_id === guild.id);
      return {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        hasBot: guild.hasBot,
        botStatus: guild.botStatus,
        dbState: dbGuild?.state || false,
        isOwner: guild.owner,
        permissions: guild.permissions,
      };
    });

    return new Response(
      JSON.stringify({
        adminGuilds: finalGuilds,
        totalAdminGuilds: finalGuilds.length,
        guildsWithBot: finalGuilds.filter((g: any) => g.hasBot).length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});