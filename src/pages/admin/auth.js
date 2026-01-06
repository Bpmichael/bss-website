const KEY = "bss_admin_token";

export function setAdminToken(token) {
  try { localStorage.setItem(KEY, token); } catch {}
}

export function getAdminToken() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function clearAdminToken() {
  try { localStorage.removeItem(KEY); } catch {}
}
