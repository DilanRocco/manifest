/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAX_CHARS_PER_USER: number
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_KEY: string
    readonly VITE_AUTH_TOKEN_STR: string
    readonly VITE_API_BASE_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }