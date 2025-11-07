/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_RECAPTCHA_SITE_KEY?: string;
  readonly RECAPTCHA_SECRET_KEY?: string;
  readonly RECAPTCHA_MIN_SCORE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
