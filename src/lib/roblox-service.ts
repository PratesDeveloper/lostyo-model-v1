import "server-only";

const ROBLOX_BASE_URL = "https://apis.roblox.com";
const ROBLOX_GAMES_API = "https://games.roblox.com";

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
        return { error: `Roblox API Error: ${response.status}`, details: errorText, success: false };
      }
      const data = await response.json();
      return { data, success: true };
    } catch (err: any) {
      return { error: "Network Error", details: err.message, success: false };
    }
  },

  async listUserUniverses(userId: string) {
    const url = `${ROBLOX_GAMES_API}/v2/users/${userId}/games?accessFilter=Public&limit=50&sortOrder=Desc`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const games = data.data || [];
      const universes = games.map((game: any) => ({
        id: game.id.toString(),
        name: game.name,
        category: "Experience",
        players_count: 0,
        status: "Live",
        roblox_place_id: game.rootPlaceId.toString()
      }));
      return { data: { universes }, success: true };
    } catch (err: any) {
      return { error: "Failed to fetch games", details: err.message, success: false };
    }
  },

  async getUniverseDetails(universeId: string) {
    const url = `${ROBLOX_GAMES_API}/v1/games?universeIds=${universeId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data: data.data?.[0] || null, success: true };
    } catch (err: any) {
      return { error: "Failed to fetch details", details: err.message, success: false };
    }
  },

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