import "server-only";

const ROBLOX_AUTH_URL = "https://apis.roblox.com/oauth/v1/authorize";
const ROBLOX_TOKEN_URL = "https://apis.roblox.com/oauth/v1/token";
const ROBLOX_USERINFO_URL = "https://apis.roblox.com/oauth/v1/userinfo";

/**
 * Biblioteca de integração Roblox OAuth 2.0.
 * Executada apenas no servidor para proteger o client_secret.
 */
export const robloxLib = {
  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: process.env.ROBLOX_CLIENT_ID!,
      redirect_uri: process.env.ROBLOX_REDIRECT_URI!,
      scope: "openid profile group:read group:write", 
      response_type: "code",
      // Mudança crucial: 'consent' força a exibição da tela de permissões
      prompt: "consent" 
    });
    return `${ROBLOX_AUTH_URL}?${params.toString()}`;
  },

  async exchangeCode(code: string) {
    const params = new URLSearchParams({
      client_id: process.env.ROBLOX_CLIENT_ID!,
      client_secret: process.env.ROBLOX_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.ROBLOX_REDIRECT_URI!,
    });

    const response = await fetch(ROBLOX_TOKEN_URL, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Roblox Token Error: ${error.error_description || error.error}`);
    }
    return response.json();
  },

  async getUserInfo(accessToken: string) {
    const response = await fetch(ROBLOX_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error("Failed to fetch Roblox user info");
    return response.json();
  }
};