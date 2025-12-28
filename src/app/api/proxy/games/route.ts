import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Proxy de API para Roblox Games
 * Resolve problemas de CORS ao buscar dados públicos da Roblox no servidor.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universeIds = searchParams.get('ids');

  if (!universeIds) {
    return NextResponse.json({ error: 'Missing universe ids' }, { status: 400 });
  }

  try {
    // O fetch no servidor não é bloqueado pelo CORS da Roblox
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // Cache opcional de 1 minuto
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Proxy Roblox] API Error:", errorText);
      throw new Error('Failed to fetch from Roblox');
    }

    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("[Proxy Roblox] Critical Error:", error.message);
    return NextResponse.json({ 
      error: 'Proxy Connection Error', 
      details: error.message 
    }, { status: 500 });
  }
}