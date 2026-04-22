// ==========================================================================
// LOPEZSOFT SAS — Configuración Central de Internacionalización
// ==========================================================================

export const DEFAULT_LOCALE = 'es' as const;

export const LOCALES = {
  es: { label: 'Español', code: 'es', flag: '🇨🇴' },
  en: { label: 'English', code: 'en', flag: '🇺🇸' },
} as const;

export type Locale = keyof typeof LOCALES;

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

/**
 * Mapeo de slugs de rutas por idioma.
 * Permite traducir las URLs sin duplicar archivos .astro
 */
export const ROUTE_SLUGS: Record<string, Record<Locale, string>> = {
  services: { es: 'services', en: 'services' },
  hardware: { es: 'hardware', en: 'hardware' },
  contact: { es: 'contact', en: 'contact' },
  about: { es: 'about', en: 'about' },
  privacy: { es: 'privacy', en: 'privacy' },
  'data-protection': { es: 'data-protection', en: 'data-protection' },
};
