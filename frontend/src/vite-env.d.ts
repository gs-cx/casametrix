/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_BASE?: string;
  readonly VITE_API_URL?: string;

  // Tu peux ajouter d'autres variables VITE_ ici si besoin :
  // readonly VITE_SENTRY_DSN?: string;
  // readonly VITE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
