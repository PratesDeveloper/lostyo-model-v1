import { NextResponse } from 'next/server';
import { robloxService } from '@/lib/roblox-service';
import { cookies } from 'next/headers';

/**
 * API Bridge
 * Valida a autorização do administrador e executa a ação solicitada na API do Roblox.
 */
export async function POST(req: Request) {
  console.log("[API_ROBLOX_BRIDGE] Incoming request started");
  
  try {
    const cookieStore = await cookies();
    const isLogged = cookieStore.get('lostyo_roblox_logged')?.value === 'true';
    const robloxId = cookieStore.get('lostyo_roblox_id')?.value;
    
    if (!isLogged || !robloxId) {
      console.warn("[API_ROBLOX_BRIDGE] Unauthorized access attempt", { isLogged, robloxId });
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }

    const body = await req.json();
    const { action, universeId, datastoreName, entryKey, value } = body;

    console.log(`[API_ROBLOX_BRIDGE] Action: ${action}`, { universeId, datastoreName, entryKey });

    if (!action) {
      console.error("[API_ROBLOX_BRIDGE] Missing action in request body");
      return NextResponse.json({ error: "No action specified" }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'listUserUniverses':
        result = await robloxService.listUserUniverses(robloxId);
        break;
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
        console.error(`[API_ROBLOX_BRIDGE] Invalid action received: ${action}`);
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) {
      console.error(`[API_ROBLOX_BRIDGE] Action '${action}' failed`, result);
      return NextResponse.json({ 
        error: result.error, 
        details: result.details,
        action 
      }, { status: 500 });
    }

    console.log(`[API_ROBLOX_BRIDGE] Action '${action}' completed successfully`);
    return NextResponse.json(result.data || { success: true });
  } catch (err: any) {
    console.error("[API_ROBLOX_BRIDGE] Critical crash", { 
      message: err.message, 
      stack: err.stack 
    });
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: err.message,
      stack: err.stack 
    }, { status: 500 });
  }
}