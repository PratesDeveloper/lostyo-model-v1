import "server-only";

const ROBLOX_BASE_URL = "https://apis.roblox.com";

interface RobloxOptions {
  universeId?: string;
  datastoreName?: string;
  key?: string;
  value?: any;
}

/**
 * robloxService
 * Camada de abstração para operações seguras no servidor usando Roblox Open Cloud.
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
        next: { revalidate: 0 } // Bypass cache para dados em tempo real
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
   * Universes
   */
  async getUniverseMetrics(universeId: string) {
    // Busca informações básicas do universo
    return this.fetchCloud(`/universes/v1/universes/${universeId}`);
  },

  /**
   * DataStores
   */
  async listDataStores(universeId: string) {
    const result = await this.fetchCloud(`/datastores/v1/universes/${universeId}/standard-datastores`);
    return result;
  },

  async listDataStoreKeys(universeId: string, datastoreName: string) {
    const result = await this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries?datastoreName=${datastoreName}`
    );
    return result;
  },

  async getEntry(universeId: string, datastoreName: string, entryKey: string) {
    const result = await this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=${entryKey}`
    );
    return result;
  },

  async setEntry(universeId: string, datastoreName: string, entryKey: string, value: any) {
    // Nota: O valor no Roblox DataStore Open Cloud deve ser passado no corpo da requisição
    return this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=${entryKey}`,
      "POST",
      value
    );
  },

  async deleteEntry(universeId: string, datastoreName: string, entryKey: string) {
    return this.fetchCloud(
      `/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=${entryKey}`,
      "DELETE"
    );
  }
};