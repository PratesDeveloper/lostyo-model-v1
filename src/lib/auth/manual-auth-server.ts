import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

interface JWTData {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_para_desenvolvimento_apenas'
);

export async function exchangeCodeForToken(code: string) {
  const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) {
    throw new Error('Configuração do Discord incompleta no servidor.');
  }

  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    }),
  });

  if (!tokenResponse.ok) throw new Error('Falha ao trocar código por token');
  const tokenData: DiscordTokenResponse = await tokenResponse.json();

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { authorization: `${tokenData.token_type} ${tokenData.access_token}` },
  });

  if (!userResponse.ok) throw new Error('Falha ao obter dados do usuário');
  const userData: DiscordUser = await userResponse.json();

  return { ...tokenData, user: userData };
}

export async function createJWT(tokenData: any): Promise<string> {
  return await new SignJWT({
    userId: tokenData.user.id,
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + tokenData.expires_in,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<JWTData> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as unknown as JWTData;
}