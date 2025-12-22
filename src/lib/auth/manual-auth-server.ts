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

  console.log('Verificando variáveis de ambiente no servidor:', {
    DISCORD_CLIENT_ID: DISCORD_CLIENT_ID ? '[CONFIGURADO]' : '[FALTANDO]',
    DISCORD_CLIENT_SECRET: DISCORD_CLIENT_SECRET ? '[CONFIGURADO]' : '[FALTANDO]',
    DISCORD_REDIRECT_URI: DISCORD_REDIRECT_URI ? '[CONFIGURADO]' : '[FALTANDO]'
  });

  if (!DISCORD_CLIENT_ID) {
    throw new Error('DISCORD_CLIENT_ID não está configurado no servidor.');
  }

  if (!DISCORD_CLIENT_SECRET) {
    throw new Error('DISCORD_CLIENT_SECRET não está configurado no servidor.');
  }

  if (!DISCORD_REDIRECT_URI) {
    throw new Error('DISCORD_REDIRECT_URI não está configurado no servidor.');
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

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('Erro na troca de token:', errorText);
    throw new Error(`Falha ao trocar código por token: ${errorText}`);
  }

  const tokenData: DiscordTokenResponse = await tokenResponse.json();

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { authorization: `${tokenData.token_type} ${tokenData.access_token}` },
  });

  if (!userResponse.ok) {
    const errorText = await userResponse.text();
    console.error('Erro ao obter dados do usuário:', errorText);
    throw new Error(`Falha ao obter dados do usuário: ${errorText}`);
  }

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