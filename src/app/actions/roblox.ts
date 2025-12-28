"use server";

import { robloxCloud } from '@/lib/roblox/open-cloud';

// Nota: O Place ID e Universe ID são diferentes. No banco estamos usando o Place ID.
// Geralmente, para gerenciar dados, precisamos do Universe ID.
// Vou assumir que o place_id fornecido pode ser usado ou convertido.

export async function getLiveProjectStats(universeId: string) {
  try {
    const info = await robloxCloud.getUniverseInfo(universeId);
    if (!info) return null;
    
    // Simulando alguns dados que a API Cloud ainda não expõe diretamente de forma simples
    // como contagem de jogadores em tempo real (que exige outras permissões)
    return {
      name: info.name,
      id: info.id,
      creator: info.creatorTargetId,
      rootPlaceId: info.rootPlaceId,
      live: true
    };
  } catch (error) {
    console.error("[Roblox Action] Error:", error);
    return null;
  }
}

export async function getProjectDataStores(universeId: string) {
  return await robloxCloud.listDataStores(universeId);
}