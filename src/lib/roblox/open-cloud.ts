import "server-only";

/**
 * Interface para interagir com a API de Nuvem do Roblox (Open Cloud)
 * Documentação: https://create.roblox.com/docs/open-cloud
 */
const ROBLOX_CLOUD_URL = "https://apis.roblox.com";

export const robloxCloud = {
  /**
   * Busca informações básicas do universo (experiência)
   */
  async getUniverseInfo(universeId: string) {
    const response = await fetch(`${ROBLOX_CLOUD_URL}/universes/v1/universes/${universeId}`, {
      headers: { 'x-api-key': process.env.API_KEY_ROBLOX! }
    });
    if (!response.ok) return null;
    return response.json();
  },

  /**
   * Lista todos os DataStores de um universo
   */
  async listDataStores(universeId: string) {
    const url = `${ROBLOX_CLOUD_URL}/datastores/v1/universes/${universeId}/standard-datastores`;
    const response = await fetch(url, {
      headers: { 'x-api-key': process.env.API_KEY_ROBLOX! }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.datastores || [];
  },

  /**
   * Busca as chaves de um DataStore específico
   */
  async getDataStoreKeys(universeId: string, datastoreName: string) {
    const url = `${ROBLOX_CLOUD_URL}/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries?datastoreName=${datastoreName}`;
    const response = await fetch(url, {
      headers: { 'x-api-key': process.env.API_KEY_ROBLOX! }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.keys || [];
  }
};