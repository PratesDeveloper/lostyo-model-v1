"use client";

/** 
 * Obtém o token JWT dos cookies no lado do cliente
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

/** 
 * Remove o cookie de autenticação
 */
export function removeAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `auth-token=; Path=/; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}