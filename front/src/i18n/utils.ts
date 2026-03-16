// ==========================================================================
// LOPEZSOFT SAS — Utilidades de Internacionalización
// ==========================================================================

import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, ROUTE_SLUGS } from './config';
import type { Locale } from './config';

import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

const dictionaries: Record<Locale, Record<string, unknown>> = {
  es: esTranslations,
  en: enTranslations,
};

/**
 * Obtiene un valor anidado de un objeto usando notación de puntos.
 * Ejemplo: getNestedValue(obj, 'nav.home') → obj.nav.home
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof value === 'string' ? value : path;
}

/**
 * Obtiene un valor anidado sin forzar string (para arrays u objetos).
 */
function getNestedRaw(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Retorna una función `t(key)` que resuelve traducciones del diccionario
 * para el idioma especificado, con fallback al idioma por defecto.
 */
export function useTranslations(lang: Locale) {
  const dictionary = dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE];
  const fallback = dictionaries[DEFAULT_LOCALE];

  function t(key: string): string {
    const value = getNestedValue(dictionary, key);
    if (value !== key) return value;

    // Fallback al idioma por defecto
    if (lang !== DEFAULT_LOCALE) {
      return getNestedValue(fallback, key);
    }

    return key;
  }

  t.raw = function tRaw(key: string): unknown {
    const value = getNestedRaw(dictionary, key);
    if (value !== undefined) return value;

    if (lang !== DEFAULT_LOCALE) {
      return getNestedRaw(fallback, key);
    }

    return undefined;
  };

  return t;
}

/**
 * Valida si un string es un locale soportado.
 */
export function isValidLocale(lang: string): lang is Locale {
  return LOCALE_CODES.includes(lang as Locale);
}

/**
 * Obtiene el locale actual a partir de la URL.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment && isValidLocale(segment)) {
    return segment;
  }
  return DEFAULT_LOCALE;
}

/**
 * Genera la URL equivalente en otro idioma.
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');

  // Determinar el locale actual y el path sin prefijo de idioma
  let currentLocale: Locale = DEFAULT_LOCALE;
  let pathWithoutLocale = cleanPath;

  if (segments[0] && isValidLocale(segments[0])) {
    currentLocale = segments[0];
    pathWithoutLocale = segments.slice(1).join('/');
  }

  // Traducir el slug de la ruta si existe en el mapeo
  const translatedPath = translateRouteSlug(pathWithoutLocale, currentLocale, targetLocale);

  // Si el idioma destino es el default, no añadir prefijo
  if (targetLocale === DEFAULT_LOCALE) {
    return translatedPath ? `/${translatedPath}` : '/';
  }

  return translatedPath ? `/${targetLocale}/${translatedPath}` : `/${targetLocale}`;
}

/**
 * Traduce los slugs de una ruta entre idiomas.
 */
function translateRouteSlug(path: string, fromLocale: Locale, toLocale: Locale): string {
  if (!path) return '';

  for (const [, slugs] of Object.entries(ROUTE_SLUGS)) {
    if (slugs[fromLocale] === path) {
      return slugs[toLocale];
    }
  }

  return path;
}

/**
 * Retorna todos los locales disponibles (para uso en getStaticPaths)
 */
export function getAvailableLocales(): Locale[] {
  return [...LOCALE_CODES];
}

/**
 * Retorna la info del locale (label, flag, etc.)
 */
export function getLocaleInfo(locale: Locale) {
  return LOCALES[locale];
}
