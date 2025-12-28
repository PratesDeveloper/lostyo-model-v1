import { NextResponse } from 'next/server';
import { robloxService } from '@/lib/roblox-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, universeId, datastoreName, entryKey, value } = body;

    if (!action) return NextResponse.json({ error: "No action specified" }, { status: 400 });
    if (!universeId) return NextResponse.json({ error: "No Universe/Place ID specified" }, { status: 400 });

    let result;

    switch (action) {
      case 'getMetrics':
        result = await robloxService.getUniverseMetrics(universeId);
        break;
      case 'listDataStores':
        result = await robloxService.listDataStores(universeId);
        break;
      case 'listKeys':
        result = await robloxService.listDataStoreKeys(universeId, datastoreName);
        break;
      case 'getEntry':
        result = await robloxService.getEntry(universeId, datastoreName, entryKey);
        break;
      case 'setEntry':
        result = await robloxService.setEntry(universeId, datastoreName, entryKey, value);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) {
      // Retorna o erro real vindo do robloxService com status 400 ou 500 dependendo do contexto
      return NextResponse.json({ 
        error: result.error, 
        details: result.details 
      }, { status: 200 }); // Retornamos 200 para que o frontend possa ler o JSON do erro sem estourar o catch do fetch
    }

    return NextResponse.json(result.data);
  } catch (err: any) {
    console.error("[API_ROBLOX_BRIDGE] Critical failure:", err.message);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}