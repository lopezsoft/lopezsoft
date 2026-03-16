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
  services: { es: 'servicios', en: 'services' },
  contact:  { es: 'contacto',  en: 'contact' },
  about:    { es: 'nosotros',  en: 'about' },
};
