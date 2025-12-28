import { NextResponse } from 'next/server';
import { robloxService } from '@/lib/roblox-service';
import { cookies } from 'next/headers';

/**
 * API Bridge
 * MODO TESTE: Permite acesso sem validação rigorosa de cookie por enquanto.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, universeId, datastoreName, entryKey, value } = body;

    if (!action) return NextResponse.json({ error: "No action specified" }, { status: 400 });

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
      case 'deleteEntry':
        result = await robloxService.deleteEntry(universeId, datastoreName, entryKey);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error, details: result.details }, { status: 500 });
    }

    return NextResponse.json(result.data || { success: true });
  } catch (err: any) {
    console.error("[API_ROBLOX_BRIDGE] critical error", { message: err.message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}