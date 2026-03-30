/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DAIA_API: string;
  readonly VITE_DAIA_ACADEMY_API: string;
  readonly VITE_LANDING_URL: string;
  readonly VITE_HUB_URL: string;
  readonly VITE_ACADEMY_URL: string;
  readonly VITE_ADMIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
