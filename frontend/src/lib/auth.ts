export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || "";

const TOKEN_KEY = "casamx_token";

export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t || "");
}
export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

export async function register(email: string, password: string) {
  // ⚠️ Si /auth/register n'existe pas encore côté API, cette requête renverra une erreur (à analyser)
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.json();
}

export async function me(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Me failed: ${res.status}`);
  return res.json();
}
