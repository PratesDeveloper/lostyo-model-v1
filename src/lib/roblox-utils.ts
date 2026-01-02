/**
 * Utilitários para interagir com o Proxy do Roblox de forma tipada.
 */
export const robloxUtils = {
  async getPlayerInfo(userId: string) {
    const res = await fetch(`/api/proxy/roblox?domain=users&endpoint=v1/users/${userId}`);
    return res.json();
  },

  async getPlayerThumbnail(userId: string) {
    const res = await fetch(`/api/proxy/roblox?domain=thumbnails&endpoint=v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
    const data = await res.json();
    return data.data?.[0]?.imageUrl;
  },

  async getUniverseAssets(universeId: string) {
    const res = await fetch(`/api/proxy/roblox?domain=games&endpoint=v1/games/${universeId}/social-links`);
    return res.json();
  },

  async getGamepasses(universeId: string) {
    const res = await fetch(`/api/proxy/roblox?domain=games&endpoint=v1/games/${universeId}/game-passes`);
    return res.json();
  }
};