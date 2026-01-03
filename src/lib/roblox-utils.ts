export const robloxUtils = {
  // Users
  async getUser(userId: string) {
    const endpoint = encodeURIComponent(`v1/users/${userId}`);
    const res = await fetch(`/api/proxy/roblox?domain=users&endpoint=${endpoint}`);
    return res.json();
  },
  
  async getUserThumb(userId: string) {
    const endpoint = encodeURIComponent(`v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
    const res = await fetch(`/api/proxy/roblox?domain=thumbnails&endpoint=${endpoint}`);
    const data = await res.json();
    return data.data?.[0]?.imageUrl;
  },

  async getUserGroups(userId: string) {
    const endpoint = encodeURIComponent(`v1/users/${userId}/groups/roles`);
    const res = await fetch(`/api/proxy/roblox?domain=groups&endpoint=${endpoint}`);
    return res.json();
  },

  // Jogos (Universos)
  async getGameDetails(universeId: string) {
    const endpoint = encodeURIComponent(`v1/games?universeIds=${universeId}`);
    const res = await fetch(`/api/proxy/roblox?domain=games&endpoint=${endpoint}`);
    const data = await res.json();
    return data.data?.[0];
  },

  async getGamepasses(universeId: string) {
    const endpoint = encodeURIComponent(`v1/games/${universeId}/game-passes?limit=100`);
    const res = await fetch(`/api/proxy/roblox?domain=games&endpoint=${endpoint}`);
    return res.json();
  },

  async getGameBadges(universeId: string) {
    const endpoint = encodeURIComponent(`v1/universes/${universeId}/badges?limit=10&sortOrder=Desc`);
    const res = await fetch(`/api/proxy/roblox?domain=badges&endpoint=${endpoint}`);
    return res.json();
  },

  // Grupos
  async getGroup(groupId: string) {
    const endpoint = encodeURIComponent(`v1/groups/${groupId}`);
    const res = await fetch(`/api/proxy/roblox?domain=groups&endpoint=${endpoint}`);
    return res.json();
  }
};