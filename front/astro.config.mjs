// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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
});