/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DAIA_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}