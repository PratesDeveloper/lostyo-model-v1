// src/lib/auth/manual-auth.ts
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

// Tipos para os dados do token do Discord
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
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  global_name: string | null;
  avatar_decoration_data: any | null;
  banner_color: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
}

interface JWTData {
  [key: string]: any; // Adicionando assinatura de índice
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Configurações do Discord OAuth (agora lidas de variáveis de ambiente)
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

// Chave secreta para assinar os JWTs (deve ser uma variável de ambiente segura)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_aqui' // Use uma chave forte em produção
);

/**
 * Troca o código de autorização por um access token do Discord
 */
export async function exchangeCodeForToken(code: string): Promise<DiscordTokenResponse & { user: DiscordUser }> {
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) {
    throw new Error('Variáveis de ambiente do Discord não configuradas.');
  }

  // 1. Trocar o código por tokens
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    }),
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    console.error('Discord Token Error:', errorData);
    throw new Error(`Falha ao obter token: ${tokenResponse.status} ${tokenResponse.statusText} - ${errorData.error_description || JSON.stringify(errorData)}`);
  }

  const tokenData: DiscordTokenResponse = await tokenResponse.json();

  // 2. Obter informações do usuário usando o access token
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenData.token_type} ${tokenData.access_token}`,
    },
  });

  if (!userResponse.ok) {
    const errorData = await userResponse.json();
    console.error('Discord User Data Error:', errorData);
    throw new Error(`Falha ao obter dados do usuário: ${userResponse.status} ${userResponse.statusText} - ${errorData.message || JSON.stringify(errorData)}`);
  }

  const userData: DiscordUser = await userResponse.json();

  return {
    ...tokenData,
    user: userData,
  };
}

/**
 * Cria um JWT personalizado com os dados do usuário
 */
export async function createJWT(tokenData: DiscordTokenResponse & { user: DiscordUser }): Promise<string> {
  const { access_token, refresh_token, expires_in, user } = tokenData;
  
  const jwtData: JWTData = {
    userId: user.id,
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + expires_in,
  };

  const jwt = await new SignJWT(jwtData)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token válido por 7 dias
    .sign(JWT_SECRET);

  return jwt;
}

/**
 * Verifica e decodifica um JWT
 */
export async function verifyJWT(token: string): Promise<JWTData> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTData; // Convertendo explicitamente
  } catch (error) {
    throw new Error('Token JWT inválido');
  }
}

/**
 * Armazena o JWT em um cookie seguro
 */
export function setAuthCookie(token: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `auth-token=${token}; Path=/; HttpOnly=false; Secure=true; SameSite=Lax; Max-Age=604800`; // 7 dias
  }
}

/**
 * Remove o cookie de autenticação
 */
export function removeAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `auth-token=; Path=/; HttpOnly=false; Secure=true; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
 * Obtém o token JWT dos cookies
 */
export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'auth-token') {
      return value;
    }
  }
  return null;
}