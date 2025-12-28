import { NextResponse } from 'next/server';
import { robloxService } from '@/lib/roblox-service';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const isLogged = cookieStore.get('lostyo_roblox_logged')?.value === 'true';
    const robloxId = cookieStore.get('lostyo_roblox_id')?.value;
    
    if (!isLogged || !robloxId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { action, universeId, datastoreName, entryKey, value } = await req.json();
    let result;

    switch (action) {
      case 'listUserUniverses': result = await robloxService.listUserUniverses(robloxId); break;
      case 'getDetails': result = await robloxService.getUniverseDetails(universeId); break;
      case 'listDataStores': result = await robloxService.listDataStores(universeId); break;
      case 'listKeys': result = await robloxService.listDataStoreKeys(universeId, datastoreName); break;
      case 'getEntry': result = await robloxService.getEntry(universeId, datastoreName, entryKey); break;
      case 'setEntry': result = await robloxService.setEntry(universeId, datastoreName, entryKey, value); break;
      default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) return NextResponse.json({ error: result.error, details: result.details }, { status: 500 });
    return NextResponse.json(result.data || { success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal Error", details: err.message }, { status: 500 });
  }
}