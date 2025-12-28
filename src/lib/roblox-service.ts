import "server-only";

const ROBLOX_BASE_URL = "https://apis.roblox.com";

export const robloxService = {
  async fetchCloud(endpoint: string, method: string = "GET", body?: any) {
    const url = `${ROBLOX_BASE_URL}${endpoint}`;
    
    // Verificação de segurança da chave
    if (!process.env.API_KEY_ROBLOX) {
      console.error("[robloxService] API_KEY_ROBLOX is missing in environment variables");
      return { success: false, error: "Server Configuration Error: API Key missing" };
    }

    const headers: Record<string, string> = {
      "x-api-key": process.env.API_KEY_ROBLOX,
      "Content-Type": "application/json",
    };

    try {
      console.log(`[robloxService] Requesting: ${method} ${url}`);
      
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        next: { revalidate: 0 }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[robloxService] Roblox API Rejection:", { 
          status: response.status, 
          url, 
          response: errorText 
        });
        return { 
          success: false, 
          error: `Roblox API Error ${response.status}`, 
          details: errorText 
        };
      }

      if (method === "DELETE") return { success: true, data: {} };
      
      const data = await response.json();
      return { success: true, data };
    } catch (err: any) {
      console.error("[robloxService] Runtime Exception:", err.message);
      return { success: false, error: "Network or Internal Error", details: err.message };
    }
  },

  async getUniverseMetrics(universeId: string) {
    return this.fetchCloud(`/universes/v1/universes/${universeId}`);
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