// src/lib/api.ts
// Petit client API centralisé pour Casametrix (front public)

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL &&
  import.meta.env.VITE_API_BASE_URL.trim().length > 0
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")
    : "https://api.casametrix.com";

// Adresse telle que renvoyée par le backend /addresses/ban-log
// et telle qu’on la manipule côté front.
export interface Address {
  id?: string;
  // champs renvoyés par FastAPI
  address?: string;
  postal_code?: string;
  city?: string;
  lat?: number;
  lng?: number;
  // champs côté front/BAN
  label?: string;
  postalCode?: string;
  [key: string]: unknown;
}

/**
 * Enregistre une adresse sélectionnée via la BAN dans le golden index Casametrix.
 * Utilise l’endpoint backend POST /addresses/ban-log.
 *
 * Le paramètre peut être un objet Address ou tout payload compatible attendu
 * par l’API backend (on le passe tel quel en JSON).
 */
export async function saveBanSelection(
  selection: Address | Record<string, any>
): Promise<Address> {
  const payload = {
    ...selection,
  };

  const response = await fetch(`${API_BASE_URL}/addresses/ban-log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // credentials: "include" // à activer si tu utilises des cookies d’auth
  });

  if (!response.ok) {
    // On essaie de remonter un message d’erreur utile pour le front
    const text = await response.text().catch(() => "");
    throw new Error(
      text || "Échec de l’enregistrement de l’adresse dans Casametrix."
    );
  }

  // On renvoie le JSON si dispo
  return (await response.json().catch(() => ({}))) as Address;
}

// ============================================================================
// BAN autocomplete : suggestions depuis l'API /addresses/ban-autocomplete
// ============================================================================

export type BanSuggestion = {
  label: string;
  city?: string | null;
  postal_code?: string | null;
  lat?: number | null;
  lng?: number | null;
  score?: number | null;
  source?: string | null;
};

/**
 * Récupère les suggestions d'adresse auprès de l'API Casametrix, elle-même
 * branchée sur la Base Adresse Nationale (BAN).
 */
export async function fetchBanSuggestions(
  query: string
): Promise<BanSuggestion[]> {
  const q = query.trim();
  if (!q) return [];

  const url =
    `${API_BASE_URL}/addresses/ban-autocomplete?` +
    new URLSearchParams({ q, limit: "8" }).toString();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`BAN autocomplete failed with status ${res.status}`);
  }

  const data = await res.json();

  // L'API retourne déjà les bons champs, on normalise juste un peu
  return (data ?? []).map((item: any) => ({
    label: item.label ?? "",
    city: item.city ?? null,
    postal_code: item.postal_code ?? null,
    lat: item.lat ?? null,
    lng: item.lng ?? null,
    score: item.score ?? null,
    source: item.source ?? "ban",
  }));
}
