import { Guild } from './supabase';

// Tipos para a API do Discord
interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

// Função para buscar guildas do Discord
export const getDiscordGuilds = async (accessToken: string): Promise<Guild[]> => {
  try {
    const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Discord guilds');
    }
    
    const discordGuilds: DiscordGuild[] = await response.json();
    
    // Converter para o tipo Guild
    const guilds: Guild[] = discordGuilds.map(guild => ({
      guild_id: guild.id,
      name: guild.name,
      icon: guild.icon,
      owner: guild.owner,
      permissions: guild.permissions,
      features: guild.features,
      // Valores padrão para campos que não vêm da API do Discord
      approximate_member_count: 0,
      approximate_presence_count: 0
    }));
    
    return guilds;
  } catch (error) {
    console.error('Error fetching Discord guilds:', error);
    return [];
  }
};

// Função para verificar se o bot está em uma guilda
export const isBotInGuild = async (guildId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
    const data = await response.json();
    return data.active;
  } catch (error) {
    console.error('Error checking bot presence:', error);
    return false;
  }
};