// src/lib/http.ts
// Client HTTP centralisé Casametrix

// URL de base de l'API (prod : https://api.casametrix.com)
const API_BASE_URL =
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim().length > 0
    ? import.meta.env.VITE_API_URL.replace(/\/+$/, '')
    : 'http://127.0.0.1:8000';

// Alias pour compatibilité avec l'ancien code
export const API_URL = API_BASE_URL;

export interface HttpOptions {
  auth?: boolean; // ajoute automatiquement le Bearer depuis le cookie casamx_session
  query?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
}

/**
 * Récupère le token JWT stocké dans le cookie "casamx_session".
 * (front domaine : .casametrix.com)
 */
function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(
    /(?:^|;\s*)casamx_session=([^;]+)/
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Construit l'URL complète vers l'API en ajoutant éventuellement les query params.
 */
function buildUrl(path: string, query?: HttpOptions['query']): string {
  const cleanBase = API_BASE_URL.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(cleanBase + cleanPath);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
}

/**
 * Fonction bas niveau : envoie une requête HTTP (JSON)
 */
async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: HttpOptions = {}
): Promise<T> {
  const url = buildUrl(path, options.query);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  // Auth automatique via cookie si demandé
  if (options.auth) {
    const token = getTokenFromCookie();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    credentials: 'include', // pour envoyer les cookies casamx_session
  });

  if (!response.ok) {
    let detail: unknown;
    try {
      detail = await response.json();
    } catch {
      detail = await response.text();
    }
    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${JSON.stringify(
        detail
      )}`
    );
  }

  if (response.status === 204) {
    // Pas de contenu
    return undefined as T;
  }

  return (await response.json()) as T;
}

// -----------------------------------------------------------------------------
// Helpers JSON publics
// -----------------------------------------------------------------------------

export function httpGet<T>(
  path: string,
  options?: HttpOptions
): Promise<T> {
  return request<T>('GET', path, undefined, options);
}

export function httpPost<T>(
  path: string,
  body?: unknown,
  options?: HttpOptions
): Promise<T> {
  return request<T>('POST', path, body, options);
}

export function httpPut<T>(
  path: string,
  body?: unknown,
  options?: HttpOptions
): Promise<T> {
  return request<T>('PUT', path, body, options);
}

export function httpDelete<T>(
  path: string,
  options?: HttpOptions
): Promise<T> {
  return request<T>('DELETE', path, undefined, options);
}

// -----------------------------------------------------------------------------
// Helpers supplémentaires pour compatibilité (Login.tsx & co)
// -----------------------------------------------------------------------------

/**
 * POST x-www-form-urlencoded (pour /auth/login style OAuth2 password)
 */
export async function httpPostForm<T>(
  path: string,
  data: Record<string, string>,
  options: HttpOptions = {}
): Promise<T> {
  const url = buildUrl(path, options.query);

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...(options.headers ?? {}),
  };

  if (options.auth) {
    const token = getTokenFromCookie();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const body = new URLSearchParams(data);

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
    credentials: 'include',
  });

  if (!response.ok) {
    let detail: unknown;
    try {
      detail = await response.json();
    } catch {
      detail = await response.text();
    }
    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${JSON.stringify(
        detail
      )}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/**
 * GET avec auth forcée (utilisé typiquement pour /auth/me)
 */
export function httpGetAuth<T>(
  path: string,
  options?: Omit<HttpOptions, 'auth'>
): Promise<T> {
  return httpGet<T>(path, { ...(options ?? {}), auth: true });
}

// export de la base URL pour d'autres modules si besoin
export { API_BASE_URL };
