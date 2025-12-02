// /root/casametrix-ui/src/hooks/useAuthToken.ts
import { useMemo } from "react";

/**
 * Hook simple pour lire le token JWT stocké dans localStorage.
 * Exemple d'utilisation :
 *   const token = useAuthToken();
 */
export function useAuthToken() {
  const token = useMemo(() => localStorage.getItem("casamx_token") || "", []);
  return token;
}
