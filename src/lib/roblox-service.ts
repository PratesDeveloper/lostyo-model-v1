import "server-only";

const ROBLOX_BASE_URL = "https://apis.roblox.com";
const ROBLOX_GAMES_API = "https://games.roblox.com";

/**
 * robloxService
 * Camada de abstração para operações seguras no servidor usando Roblox Open Cloud e Web APIs.
 */
export const robloxService = {
  async fetchCloud(endpoint: string, method: string = "GET", body?: any) {
    const url = `${ROBLOX_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      "x-api-key": process.env.API_KEY_ROBLOX || "",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        next: { revalidate: 0 }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[robloxService] API Error", { url, status: response.status, errorText });
        return { error: `Roblox API Error: ${response.status}`, details: errorText };
      }

      if (method === "DELETE") return { success: true };
      
      const data = await response.json();
      return { data, success: true };
    } catch (err: any) {
      console.error("[robloxService] Fetch Exception", { message: err.message });
      return { error: "Network or Internal Error", details: err.message };
    }
  },

  /**
   * Busca todas as experiências públicas de um usuário específico.
   */
  async listUserUniverses(userId: string) {
    const url = `${ROBLOX_GAMES_API}/v2/users/${userId}/games?accessFilter=Public&limit=50&sortOrder=Desc`;
    
    try {
      const response = await fetch(url, { next: { revalidate: 60 } });
      if (!response.ok) throw new Error(`Games API Error: ${response.status}`);
      
      const data = await response.json();
      // Mapeia para o formato esperado pelo nosso frontend
      const universes = data.data.map((game: any) => ({
        id: game.id.toString(),
        name: game.name,
        category: "Experience",
        players_count: 0, // A API v2 não retorna players em tempo real aqui
        status: "Live",
        roblox_place_id: game.rootPlaceId.toString()
      }));

      return { data: { universes }, success: true };
    } catch (err: any) {
      console.error("[robloxService] listUserUniverses Error", err.message);
      return { error: "Failed to fetch games from Roblox", details: err.message };
    }
  },

  /**
   * Universes Metrics (Open Cloud)
   */
  async getUniverseMetrics(universeId: string) {
    return this.fetchCloud(`/universes/v1/universes/${universeId}`);
  },

  /**
   * DataStores
   */
  async listDataStores(universeId: string) {
    return this.fetchCloud(`/datastores/v1/universes/${universeId}/standard-datastores`);
  },

  async listDataStoreKeys(universeId: string, datastoreName: string) {
    return this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries?datastoreName=${datastoreName}`
    );
  },

  async getEntry(universeId: string, datastoreName: string, entryKey: string) {
    return this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=${entryKey}`
    );
  },

  async setEntry(universeId: string, datastoreName: string, entryKey: string, value: any) {
    return this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=${entryKey}`,
      "POST",
      value
    );
  }
};