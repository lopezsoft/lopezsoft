// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lopezsoft.com',
  output: 'static',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['./src/styles'],
          additionalData: (source, filename) => {
            const normalized = filename.replace(/\\/g, '/');
            // No inyectar en archivos que definen las propias variables/mixins/temas
            if (
              normalized.includes('_variables.scss') ||
              normalized.includes('_mixins.scss') ||
              normalized.includes('_themes.scss')
            ) {
              return source;
            }
            return `@use "variables" as *;\n@use "mixins" as *;\n${source}`;
          },
        },
      },
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CO',
          en: 'en-US',
        },
      },
    }),
  ],
});