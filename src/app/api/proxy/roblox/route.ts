import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain') || 'users';
  // Pegamos o endpoint bruto da query string para evitar quebras com '?' e '&'
  const urlObj = new URL(req.url);
  const fullSearch = urlObj.search;
  const endpointMatch = fullSearch.match(/endpoint=([^&]+)/);
  
  if (!endpointMatch) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  const endpoint = decodeURIComponent(endpointMatch[1]);
  // Reconstruímos a URL com os parâmetros adicionais que podem ter vindo no proxy
  const additionalParams = fullSearch.split(endpointMatch[0])[1] || '';
  const finalEndpoint = endpoint + additionalParams;

  try {
    const targetUrl = `https://${domain}.roblox.com/${finalEndpoint}`;
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: 'Roblox API Error', details: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: 'Proxy Exception', details: err.message }, { status: 500 });
  }
}