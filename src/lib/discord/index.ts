import "server-only";
import { DiscordUser, DiscordGuild, DiscordTokenResponse } from "./types";

const DISCORD_API_URL = "https://discord.com/api/v10";

/**
 * Biblioteca centralizada para interações com a API do Discord.
 * O uso de 'server-only' garante que este código nunca vaze para o bundle do cliente.
 */
export const discordLib = {
  /**
   * Troca o código do OAuth2 por tokens de acesso.
   */
  async exchangeCode(code: string): Promise<DiscordTokenResponse> {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    });

    const response = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Discord Token Exchange Error: ${JSON.stringify(error)}`);
    }

    return response.json();
  },

  /**
   * Busca os dados do usuário atual usando um token de acesso.
   */
  async getUser(accessToken: string): Promise<DiscordUser> {
    const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch Discord user");
    return response.json();
  },

  /**
   * Busca a lista de servidores (guilds) do usuário.
   */
  async getUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
    const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch Discord guilds");
    return response.json();
  },

  /**
   * Utilitário para formatar a URL do avatar do Discord.
   */
  getAvatarUrl(userId: string, avatarHash: string | null): string {
    if (!avatarHash) return `https://cdn.discordapp.com/embed/avatars/${Number(userId) % 5}.png`;
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
  },
  
  /**
   * Verifica se o usuário tem permissão de Administrador em uma guild específica.
   * Usando bitwise operation para verificar a flag 0x8 (ADMINISTRATOR).
   */
  hasAdminPermission(permissions: string): boolean {
    const ADMIN_FLAG = BigInt(0x8);
    const userPerms = BigInt(permissions);
    return (userPerms & ADMIN_FLAG) === ADMIN_FLAG;
  }
};