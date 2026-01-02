import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Proxy universal para APIs do Roblox.
 * Uso: /api/proxy/roblox?domain=users&endpoint=v1/users/7468377959
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain') || 'users';
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
  }

  try {
    const url = `https://${domain}.roblox.com/${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 } // Cache de 5 minutos
    });

    if (!response.ok) throw new Error(`Roblox API responded with ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[Roblox Proxy Error]:", err.message);
    return NextResponse.json({ error: 'Failed to fetch from Roblox', details: err.message }, { status: 500 });
  }
}