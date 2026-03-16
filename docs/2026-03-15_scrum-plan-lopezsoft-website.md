# LOPEZSOFT SAS — Plan de Trabajo SCRUM

## Plataforma Web Corporativa (Monorepo: Astro Frontend + NestJS Backend)

**Fecha de creación:** 2026-03-15  
**Última actualización:** 2026-03-15  
**Producto:** Plataforma Web Corporativa LOPEZSOFT SAS  
**Metodología:** SCRUM  
**Duración estimada del Sprint:** 1 semana  
**Estructura:** Monorepo con dos aplicaciones (`front/` y `backend/`)  
**Fase actual:** Frontend (Astro + SCSS + i18n)  

---

## 1. Visión del Producto

Construir una plataforma web corporativa compuesta por un **frontend** minimalista, bilingüe (ES/EN), de alto rendimiento y optimizado para SEO, y un **backend** robusto como API REST para futuros servicios dinámicos. El proyecto se organiza como un **monorepo** con dos directorios principales:

- **`front/`** — Sitio web corporativo con Astro (SSG) y SCSS. **Fase de trabajo inicial.**
- **`backend/`** — API REST con NestJS (última versión). **Fase posterior al frontend.**

Ambas aplicaciones comparten el repositorio, la documentación, los assets corporativos y el pipeline CI/CD, pero son independientes en sus dependencias y procesos de build.

### Principios de Estilo Obligatorios

- **Cero CSS hardcodeado:** Todo estilo debe provenir de variables SCSS, mixins o tokens del sistema de diseño. Queda prohibido cualquier valor literal de color, tamaño o espaciado directamente en componentes.
- **Mobile-First:** Todos los estilos se escriben para pantalla móvil como base. Las adaptaciones para tablet y desktop se aplican mediante breakpoints progresivos (`@include breakpoint(md)`, `@include breakpoint(lg)`).
- **SCSS como fuente única de verdad:** Tailwind CSS se usa exclusivamente como utilidad complementaria para layout/spacing rápido. Los colores, tipografías, sombras, bordes y animaciones se gestionan mediante variables y mixins SCSS.
- **Dual Theme:** El sitio debe soportar dos modos de visualización: **Default (Light)** y **Dark Mode**, controlados por una clase CSS en el `<html>` (`data-theme="light"` / `data-theme="dark"`) y variables SCSS semánticas que se alternan según el tema activo.

### Assets Corporativos (directorio `design/`)

El directorio `design/` contiene los recursos oficiales de identidad visual:

| Archivo | Descripción |
| --- | --- |
| `circulo.png` / `circulo - azul.png` | Logo circular LOPEZSOFT (variante clara y azul) |
| `horizontal.png` / `horizontal - azul.png` | Logo horizontal LOPEZSOFT (variante clara y azul) |
| `Manual de Identidad Corporativa LOPEZSOFT.pdf` | Manual de marca oficial — referencia obligatoria para colores, tipografía y uso del logo |
| `img/ERP 500 X 500.png` / `img/ERP 1920 X 512.png` | Logo MATIAS ERP (cuadrado y banner) |
| `img/API 500 X 500.png` / `img/API 1920 X 512.png` | Logo MATIAS API (cuadrado y banner) |
| `img/Impulso 500 x 500.png` / `img/IMPULSO 1920 X 512.png` | Logo MATIAS IMPULSO (cuadrado y banner) |
| `img/MATIAS 500 X 500.png` | Logo MATIAS suite general |
| `img/logo-icon-exodo.png` / `img/logotipo-asaie exodo.png` | Logo ASAIE EXODO (icono y logotipo) |

> Estos assets deben optimizarse (WebP/AVIF) y copiarse a `front/public/images/` durante el Sprint 0 para consumo en el sitio.

---

## 2. Roles SCRUM

| Rol              | Responsable            | Descripción                                                 |
| ---------------- | ---------------------- | ----------------------------------------------------------- |
| **Product Owner** | Administración LOPEZSOFT | Define prioridades, valida entregables, acepta User Stories |
| **Scrum Master**  | Lewis (Dev Lead)        | Facilita ceremonias, elimina impedimentos                   |
| **Dev Team**      | Lewis + Claude (IA)     | Arquitectura, desarrollo, pruebas, despliegue               |

---

## 3. Épicas (Epics)

| ID    | Épica                                    | Scope      | Prioridad |
| ----- | ---------------------------------------- | ---------- | --------- |
| EP-01 | Arquitectura Monorepo y Configuración    | Global     | Crítica   |
| EP-02 | Sistema de Internacionalización (i18n)   | `front/`   | Crítica   |
| EP-03 | Sistema de Estilos SCSS, Theming y Dark Mode | `front/` | Crítica   |
| EP-04 | Componentes UI Corporativos              | `front/`   | Alta      |
| EP-05 | Páginas del Sitio                        | `front/`   | Alta      |
| EP-06 | SEO, Performance y Accesibilidad         | `front/`   | Media     |
| EP-07 | Testing y Calidad                        | Ambos      | Media     |
| EP-08 | Despliegue y CI/CD                       | Global     | Media     |
| EP-09 | Backend NestJS — Fundación y API Core    | `backend/` | Alta      |

---

## 4. Product Backlog — User Stories

### EP-01: Arquitectura Monorepo y Configuración

| ID      | User Story                                                                                                        | Puntos | Criterios de Aceptación                                                                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-0101 | Como desarrollador, necesito el monorepo inicializado con directorios `front/` y `backend/` separados.            | 3      | - `front/` creado con `create astro`<br>- `backend/` creado con `@nestjs/cli` (última versión)<br>- `.gitignore` raíz unificado<br>- Estructura conforme al árbol aprobado |
| US-0102 | Como desarrollador, necesito `front/astro.config.mjs` configurado con SSG, SCSS global y soporte i18n.            | 5      | - SSG como modo por defecto<br>- SCSS configurado como preprocesador global<br>- Tailwind solo como utilidad complementaria de layout<br>- Configuración i18n con `defaultLocale: 'es'` sin prefijo<br>- `npm run build` exitoso desde `front/` |
| US-0103 | Como desarrollador, necesito SCSS configurado como sistema de estilos principal con variables y tokens globales.   | 5      | - SCSS compilando correctamente en `front/src/styles/`<br>- Variables globales en `_variables.scss` (colores, tipografía, spacing, breakpoints, sombras)<br>- Mixins en `_mixins.scss` (breakpoints mobile-first, theming)<br>- Tokens semánticos para Dark Mode en `_themes.scss`<br>- Tailwind restringido a utilidades de layout/spacing<br>- Cero valores hardcodeados en componentes |
| US-0104 | Como desarrollador, necesito el `front/tsconfig.json` con path aliases (`@components`, `@layouts`, `@i18n`, etc.). | 2      | - Aliases resueltos sin errores en VS Code<br>- Imports funcionando en componentes `.astro` y `.ts` dentro de `front/`                                                 |
| US-0105 | Como desarrollador, necesito el proyecto NestJS inicializado en `backend/` con configuración base.                 | 3      | - NestJS última versión instalado<br>- Estructura modular (módulos, controladores, servicios)<br>- `smart-logger.service` creado<br>- `tsconfig.json` y `.eslintrc.js` configurados<br>- `npm run build` exitoso desde `backend/` |

### EP-02: Sistema de Internacionalización (i18n)

| ID      | User Story                                                                                                              | Puntos | Criterios de Aceptación                                                                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| US-0201 | Como usuario, quiero que el sitio se muestre en Español por defecto sin prefijo `/es` en la URL.                        | 5      | - Home accesible en `/`<br>- Servicios en `/servicios`<br>- Sin redirecciones innecesarias                                               |
| US-0202 | Como usuario anglófono, quiero acceder al sitio en Inglés con el prefijo `/en`.                                         | 5      | - Home EN en `/en`<br>- Services en `/en/services`<br>- Contenido renderizado desde `en.json`                                            |
| US-0203 | Como desarrollador, necesito diccionarios JSON (`es.json`, `en.json`) con las traducciones del sitio.                   | 3      | - Archivos en `src/i18n/locales/`<br>- Estructura tipada con TypeScript<br>- Claves organizadas por sección (nav, hero, services, etc.) |
| US-0204 | Como desarrollador, necesito una utilidad `useTranslations(lang)` que lea el diccionario y retorne las traducciones.     | 5      | - Función helper en `src/i18n/utils.ts`<br>- Type-safe<br>- Fallback al idioma por defecto si falta una clave                           |
| US-0205 | Como desarrollador, necesito un archivo de configuración central i18n para agregar idiomas futuros fácilmente.           | 3      | - Config en `src/i18n/config.ts`<br>- Array de locales, locale por defecto<br>- Agregar idioma = solo nuevo JSON + entrada en config     |
| US-0206 | Como desarrollador, necesito rutas dinámicas `[lang]` que no dupliquen archivos `.astro` por idioma.                    | 8      | - Una sola página `.astro` por ruta<br>- Contenido dinámico según parámetro `lang`<br>- Zero duplicidad de páginas                       |

### EP-03: Sistema de Estilos SCSS, Theming y Dark Mode

| ID      | User Story                                                                                                                        | Puntos | Criterios de Aceptación                                                                                                                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-0301 | Como diseñador, necesito la paleta corporativa definida como variables SCSS y tokens semánticos para theming.                      | 5      | - Variables primitivas: `$color-navy: #0F172A`, `$color-royal: #2563EB`, `$color-accent: #F59E0B`<br>- Tokens semánticos: `$bg-primary`, `$text-primary`, `$border-default` que varían según tema<br>- Paleta reflejada en Tailwind config para utilidades de layout |
| US-0302 | Como diseñador, necesito tipografías definidas con jerarquía visual clara y escalas responsive mobile-first.                       | 3      | - Font principal y secundaria como variables SCSS<br>- Mixin `@include font-size()` con escalas responsivas (mobile → tablet → desktop)<br>- Carga optimizada (preload/swap)<br>- Cero tamaños hardcodeados |
| US-0303 | Como desarrollador, necesito `global.scss` con estilos base, reset, imports centralizados y estrategia mobile-first.               | 3      | - Reset/normalize<br>- Import de `_variables`, `_mixins`, `_themes`<br>- Media queries mobile-first vía mixins<br>- Aplicado en el layout principal                                                       |
| US-0304 | Como usuario, quiero poder alternar entre modo Default (Light) y Dark Mode en el sitio.                                            | 8      | - Toggle de tema en Header (componente `ThemeToggle`)<br>- Clase `data-theme` en `<html>` controla el tema activo<br>- Variables SCSS semánticas cambian según el tema<br>- Persistencia en `localStorage`<br>- Respeta `prefers-color-scheme` del sistema como default<br>- Transición suave entre temas (300ms) |
| US-0305 | Como desarrollador, necesito un archivo `_themes.scss` con los mapas de tokens para cada tema (light/dark).                        | 5      | - Mapa `$theme-light` y `$theme-dark` con tokens: bg, text, border, surface, accent, etc.<br>- Mixin `@include themed()` que genera CSS custom properties<br>- Componentes consumen variables CSS (`var(--bg-primary)`) |
| US-0306 | Como desarrollador, necesito mixins de breakpoints mobile-first estandarizados en `_mixins.scss`.                                  | 3      | - `@include breakpoint(sm)` (≥640px), `(md)` (≥768px), `(lg)` (≥1024px), `(xl)` (≥1280px)<br>- Solo `min-width` (mobile-first obligatorio)<br>- Documentados con comentario de uso                        |
| US-0307 | Como desarrollador, necesito los logos SaaS del directorio `design/img/` optimizados y disponibles en `public/images/`.            | 2      | - Imágenes convertidas a WebP manteniendo PNG como fallback<br>- Nomenclatura normalizada (kebab-case)<br>- Disponibles para `ProductCard` y páginas de servicios                                          |

### EP-04: Componentes UI Corporativos

| ID      | User Story                                                                                                           | Puntos | Criterios de Aceptación                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| US-0401 | Como usuario, quiero un Header con logo, navegación, selector de idioma y toggle de tema, responsive y accesible.    | 5      | - Logo LOPEZSOFT desde `design/`<br>- Links de navegación desde i18n<br>- Selector de idioma funcional<br>- Toggle Dark/Light Mode<br>- Menú hamburguesa en móvil (mobile-first)<br>- Aria labels<br>- Estilos exclusivamente vía SCSS/variables (cero inline) |
| US-0402 | Como usuario, quiero un Footer con información de contacto, enlaces legales y redes sociales.                        | 3      | - Datos de contacto<br>- Links útiles<br>- Iconos sociales<br>- Responsivo<br>- Año dinámico                                          |
| US-0403 | Como usuario, quiero un componente LanguageSwitcher que cambie el idioma sin recargar la estructura.                 | 5      | - Redirige a la ruta equivalente en el otro idioma<br>- Indicador visual del idioma activo<br>- Responsabilidad única (SRP)            |
| US-0404 | Como usuario, quiero Cards de producto/servicio con logo oficial, nombre y descripción del portafolio LOPEZSOFT.     | 3      | - Props tipados<br>- Logos desde `public/images/` (optimizados de `design/img/`)<br>- Diseño con variables SCSS corporativas<br>- Hover effects adaptados a Light/Dark<br>- Componente reutilizable       |
| US-0405 | Como usuario, quiero un componente Hero Section con eslogan, CTA y fondo corporativo adaptable al tema.             | 5      | - Eslogan "SU ALIADO TECNOLÓGICO"<br>- Botón CTA con `var(--color-accent)`<br>- Fondo con `var(--bg-primary)`<br>- Responsivo mobile-first<br>- Apariencia coherente en Light y Dark Mode               |
| US-0406 | Como usuario, quiero un componente Button reutilizable con variantes y soporte de temas.                             | 2      | - Props: variant, size, href<br>- Estilos vía variables SCSS (cero colores hardcodeados)<br>- Variantes adaptadas a Light/Dark Mode<br>- Accesible |

### EP-05: Páginas del Sitio

| ID      | User Story                                                                                                    | Puntos | Criterios de Aceptación                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| US-0501 | Como usuario, quiero una página Home que muestre el Hero, servicios destacados y un CTA de contacto.          | 8      | - Hero con eslogan<br>- Sección de servicios (MATIAS ERP, API, IMPULSO, ASAIE)<br>- CTA contacto<br>- Contenido bilingüe desde JSON        |
| US-0502 | Como usuario, quiero una página de Servicios con el detalle de cada producto del portafolio.                  | 5      | - Listado de productos con Cards<br>- Descripción expandida<br>- Bilingüe<br>- SEO meta tags                                               |
| US-0503 | Como usuario, quiero una página de Contacto con formulario básico.                                            | 5      | - Campos: nombre, email, empresa, mensaje<br>- Validación frontend<br>- Bilingüe<br>- Diseño corporativo                                   |
| US-0504 | Como usuario, quiero una página "Acerca de" que cuente la misión y visión de LOPEZSOFT.                       | 3      | - Contenido corporativo<br>- Bilingüe<br>- Consistente con el diseño                                                                       |

### EP-06: SEO, Performance y Accesibilidad

| ID      | User Story                                                                                                   | Puntos | Criterios de Aceptación                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| US-0601 | Como motor de búsqueda, necesito meta tags dinámicos (title, description, og:image) por página e idioma.     | 5      | - `<SEOHead>` component<br>- Props para title, description, image<br>- Traducciones automáticas según idioma                  |
| US-0602 | Como motor de búsqueda, necesito un `sitemap.xml` con todas las rutas en ambos idiomas.                      | 3      | - Generado automáticamente<br>- Incluye alternates `hreflang`<br>- Integración `@astrojs/sitemap`                              |
| US-0603 | Como motor de búsqueda, necesito `robots.txt` correctamente configurado.                                     | 1      | - Permite rastreo<br>- Referencia al sitemap                                                                                   |
| US-0604 | Como usuario con discapacidad, necesito que el sitio cumpla con WCAG 2.1 nivel AA en ambos temas.            | 5      | - Contraste de colores verificado en Light Y Dark Mode<br>- Navegación por teclado<br>- Aria labels<br>- Alt text en imágenes<br>- Skip to content<br>- Theme toggle accesible |
| US-0605 | Como usuario, necesito que el sitio cargue en menos de 2 segundos (Lighthouse > 90).                         | 3      | - Imágenes optimizadas<br>- Carga diferida (lazy loading)<br>- CSS/JS mínimo<br>- Score Lighthouse > 90 en todas las métricas  |

### EP-07: Testing y Calidad

| ID      | User Story                                                                                                 | Puntos | Criterios de Aceptación                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| US-0701 | Como desarrollador, necesito pruebas unitarias para las utilidades de i18n.                                | 5      | - Tests para `useTranslations`<br>- Tests para generación de rutas<br>- Cobertura > 80% |
| US-0702 | Como desarrollador, necesito pruebas de integración para la renderización de páginas en ambos idiomas.     | 5      | - Snapshot o DOM tests para Home ES y EN<br>- Verificación de contenido correcto        |
| US-0703 | Como QA, necesito linting y formateo automatizado (ESLint + Prettier).                                     | 2      | - Config `.eslintrc` + `.prettierrc`<br>- Scripts en `package.json`<br>- Sin errores     |

### EP-08: Despliegue y CI/CD

| ID      | User Story                                                                                                   | Puntos | Criterios de Aceptación                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------------- |
| US-0801 | Como DevOps, necesito un Dockerfile optimizado para `front/` (Astro SSG + nginx).                            | 3      | - Multi-stage build<br>- Imagen ligera (nginx/alpine)<br>- Build exitoso desde `front/`  |
| US-0802 | Como DevOps, necesito un `docker-compose.yml` en raíz que orqueste `front` y `backend`.                      | 3      | - Servicio `front` (nginx)<br>- Servicio `backend` (NestJS)<br>- Volúmenes y hot reload<br>- Red interna compartida |
| US-0803 | Como DevOps, necesito pipelines CI/CD (GitHub Actions) separados para `front/` y `backend/`.                 | 5      | - `deploy-front.yml`: build + test + deploy frontend<br>- `deploy-backend.yml`: build + test + deploy backend<br>- Triggers independientes por directorio |

### EP-09: Backend NestJS — Fundación y API Core

| ID      | User Story                                                                                                          | Puntos | Criterios de Aceptación                                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-0901 | Como desarrollador, necesito un módulo Health Check en `backend/` con endpoint `GET /api/health`.                   | 3      | - Devuelve `{ status: 'ok', timestamp }` con HTTP 200<br>- Usa `smart-logger.service` para logging<br>- Test e2e pasando                                                     |
| US-0902 | Como usuario, necesito que el formulario de contacto del frontend envíe datos al backend `POST /api/contact`.       | 5      | - DTO validado con `class-validator`<br>- Respuesta JSON estandarizada<br>- Sanitización de inputs (prevención XSS/injection)<br>- Logging vía `smart-logger.service`<br>- CORS configurado para el dominio del frontend |
| US-0903 | Como administrador, necesito un módulo de newsletter/suscripciones `POST /api/subscribe`.                           | 5      | - DTO con email validado<br>- Prevención de duplicados<br>- Respuesta estandarizada<br>- Rate limiting básico                                                                 |
| US-0904 | Como administrador, necesito integración con servicio de email (AWS SES o SMTP) para notificaciones de contacto.    | 5      | - Servicio de email encapsulado (SRP)<br>- Credenciales vía variables de entorno (no hardcodeadas)<br>- Template de email corporativo<br>- Manejo de errores robusto          |
| US-0905 | Como administrador, necesito un módulo de analytics/tracking interno para registrar visitas al sitio.               | 5      | - Endpoint `POST /api/analytics/track`<br>- Registro seguro sin datos sensibles<br>- Compatible con GDPR/RGPD básico                                                         |
| US-0906 | Como desarrollador, necesito documentación API con Swagger/OpenAPI en `backend/`.                                   | 3      | - Swagger UI accesible en `/api/docs` (solo en desarrollo/staging)<br>- Todos los endpoints documentados<br>- DTOs reflejados como schemas                                   |

---

## 5. Planificación de Sprints

### Sprint 0 — Fundación Monorepo (Semana 1)

**Meta:** Tener el monorepo estructurado con `front/` compilando (Astro + SCSS completo) y `backend/` inicializado (NestJS scaffold). Sistema de estilos, temas y breakpoints mobile-first listos.

| User Story | Descripción                                                | Puntos |
| ---------- | ---------------------------------------------------------- | ------ |
| US-0101    | Inicializar monorepo: `front/` (Astro) + `backend/` (NestJS) | 3      |
| US-0102    | Configuración `front/astro.config.mjs` + SCSS global + i18n | 5      |
| US-0103    | SCSS como sistema principal + variables/tokens globales     | 5      |
| US-0104    | Path aliases en `front/tsconfig.json`                      | 2      |
| US-0105    | NestJS inicializado en `backend/` con config base           | 3      |
| US-0205    | Configuración central i18n                                 | 3      |
| US-0301    | Paleta corporativa como variables SCSS + tokens semánticos  | 5      |
| US-0305    | `_themes.scss` con mapas Light/Dark                        | 5      |
| US-0306    | Mixins breakpoints mobile-first en `_mixins.scss`          | 3      |
| US-0307    | Optimizar logos de `design/img/` → `front/public/images/`  | 2      |
| **Total**  |                                                            | **36** |

**Entregables:**
- Monorepo con `front/` y `backend/` compilando sin errores de forma independiente
- `front/`: SCSS como fuente única de estilos (Tailwind solo para layout utilities)
- Sistema de variables: colores, tipografía, spacing, breakpoints, sombras
- Tokens semánticos Light/Dark definidos y generando CSS custom properties
- Mixins mobile-first listos para uso en componentes
- Logos SaaS optimizados disponibles en `front/public/images/`
- Config i18n central lista
- `backend/`: NestJS scaffold con `smart-logger.service` y estructura modular

---

### Sprint 1 — i18n, Layout y Dark Mode (Semana 2)

**Meta:** Sistema de internacionalización 100% funcional, layout principal maquetado con soporte dual theme y mobile-first.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0201    | Español por defecto sin prefijo `/es`          | 5      |
| US-0202    | Inglés con prefijo `/en`                       | 5      |
| US-0203    | Diccionarios JSON (es/en)                      | 3      |
| US-0204    | Utilidad `useTranslations(lang)`               | 5      |
| US-0206    | Rutas dinámicas `[lang]` sin duplicar `.astro` | 8      |
| US-0302    | Tipografías con escalas responsive mobile-first | 3      |
| US-0303    | `global.scss` con imports y estrategia mobile-first | 3  |
| US-0304    | Toggle Dark/Light Mode funcional               | 8      |
| **Total**  |                                                | **40** |

**Entregables:**
- Navegación `/` (ES) y `/en` (EN) funcional
- Traducciones cargadas desde JSON
- Layout principal con estilos SCSS globales (mobile-first)
- Toggle de tema funcional con persistencia en `localStorage`
- Ambos temas (Light/Dark) renderizando correctamente
- Cero duplicidad de archivos `.astro`

---

### Sprint 2 — Componentes UI (Semana 3)

**Meta:** Todos los componentes reutilizables listos y documentados.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0401    | Header (nav, logo, responsive)                 | 5      |
| US-0402    | Footer                                         | 3      |
| US-0403    | LanguageSwitcher                               | 5      |
| US-0404    | Product/Service Cards                          | 3      |
| US-0405    | Hero Section                                   | 5      |
| US-0406    | Button reutilizable                            | 2      |
| **Total**  |                                                | **23** |

**Entregables:**
- Componentes aislados, tipados, responsivos (mobile-first) y con soporte Light/Dark
- Selector de idioma funcional
- Hero con eslogan "SU ALIADO TECNOLÓGICO" adaptable a ambos temas
- Cards con logos oficiales de MATIAS ERP, MATIAS API, MATIAS IMPULSO, ASAIE EXODO
- Cero estilos CSS hardcodeados en componentes — todo vía variables SCSS

---

### Sprint 3 — Páginas y Contenido (Semana 4)

**Meta:** Todas las páginas del sitio ensambladas y con contenido bilingüe.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0501    | Página Home                                    | 8      |
| US-0502    | Página Servicios                               | 5      |
| US-0503    | Página Contacto                                | 5      |
| US-0504    | Página Acerca de                               | 3      |
| **Total**  |                                                | **21** |

**Entregables:**
- 4 páginas funcionales en ES y EN, con apariencia correcta en Light y Dark Mode
- Contenido corporativo LOPEZSOFT inyectado (basado en `design/Manual de Identidad Corporativa LOPEZSOFT.pdf`)
- Portafolio visible con logos oficiales (MATIAS ERP, API, IMPULSO, ASAIE EXODO)
- Formulario de contacto con validación
- Diseño mobile-first verificado en todos los breakpoints

---

### Sprint 4 — SEO, Testing y QA (Semana 5)

**Meta:** Sitio optimizado para motores de búsqueda, accesible y con calidad asegurada.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0601    | Meta tags dinámicos por página/idioma          | 5      |
| US-0602    | `sitemap.xml` con hreflang                     | 3      |
| US-0603    | `robots.txt`                                   | 1      |
| US-0604    | Accesibilidad WCAG 2.1 AA                      | 5      |
| US-0605    | Performance Lighthouse > 90                    | 3      |
| US-0701    | Tests unitarios i18n                           | 5      |
| US-0702    | Tests integración páginas                      | 5      |
| US-0703    | ESLint + Prettier                              | 2      |
| **Total**  |                                                | **29** |

**Entregables:**
- SEO completo con meta tags, sitemap y robots
- Score Lighthouse > 90
- Suite de pruebas funcional
- Linting automático

---

### Sprint 5 — Despliegue Frontend + Scaffold Backend (Semana 6)

**Meta:** Frontend contenerizado y desplegado. Backend NestJS con estructura API lista para desarrollo.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0801    | Dockerfile multi-stage para `front/`           | 3      |
| US-0802    | `docker-compose.yml` desarrollo local (front + backend) | 3      |
| US-0803    | Pipeline CI/CD (GitHub Actions) para ambos     | 5      |
| US-0901    | Módulo de Health Check y configuración base API | 3      |
| US-0902    | Módulo de contacto (POST `/api/contact`)       | 5      |
| **Total**  |                                                | **19** |

**Entregables:**
- Imagen Docker optimizada para `front/`
- Docker Compose con servicios `front` y `backend`
- Deploy automático a staging/producción
- Backend con endpoint `/api/health` y `/api/contact` funcionales
- **Go-Live Frontend**

---

### Sprint 6+ — Backend NestJS: API y Servicios (Post-lanzamiento)

**Meta:** Expandir el backend con módulos API para los servicios dinámicos del sitio.

| User Story | Descripción                                    | Puntos |
| ---------- | ---------------------------------------------- | ------ |
| US-0903    | Módulo de newsletter/suscripciones             | 5      |
| US-0904    | Integración con servicio de email (AWS SES)    | 5      |
| US-0905    | Módulo de analytics/tracking interno           | 5      |
| US-0906    | Documentación API con Swagger/OpenAPI          | 3      |
| **Total**  |                                                | **18** |

**Entregables:**
- API REST documentada con Swagger
- Servicios de contacto, newsletter y analytics funcionales
- Integración front ↔ backend verificada

---

## 6. Árbol de Directorios del Proyecto

```
lopezsoft/                                       # Raíz del monorepo
│
├── .github/
│   └── workflows/
│       ├── deploy-front.yml                     # CI/CD para front/
│       └── deploy-backend.yml                   # CI/CD para backend/
│
├── design/                                      # ⚠️ Assets fuente (NO se sirven directamente)
│   ├── circulo - azul.png                       # Logo circular variante azul
│   ├── circulo.png                              # Logo circular variante clara
│   ├── horizontal - azul.png                    # Logo horizontal variante azul
│   ├── horizontal.png                           # Logo horizontal variante clara
│   ├── Manual de Identidad Corporativa LOPEZSOFT.pdf
│   └── img/                                     # Logos de productos SaaS
│       ├── API 1920 X 512.png
│       ├── API 500 X 500.png
│       ├── ERP 1920 X 512.png
│       ├── ERP 500 X 500.png
│       ├── IMPULSO 1920 X 512.png
│       ├── Impulso 500 x 500.png
│       ├── MATIAS 500 X 500.png
│       ├── logo-icon-exodo.png
│       └── logotipo-asaie exodo.png
│
├── docs/
│   └── 2026-03-15_scrum-plan-lopezsoft-website.md
│
├── front/                                       # 🎨 FRONTEND — Astro + SCSS (fase inicial)
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── images/                              # Assets optimizados para producción
│   │       ├── og-default.png
│   │       ├── logo/
│   │       │   ├── lopezsoft-circle.webp
│   │       │   ├── lopezsoft-circle-blue.webp
│   │       │   ├── lopezsoft-horizontal.webp
│   │       │   └── lopezsoft-horizontal-blue.webp
│   │       └── products/
│   │           ├── matias-erp-500.webp
│   │           ├── matias-erp-banner.webp
│   │           ├── matias-api-500.webp
│   │           ├── matias-api-banner.webp
│   │           ├── matias-impulso-500.webp
│   │           ├── matias-impulso-banner.webp
│   │           ├── matias-suite-500.webp
│   │           ├── asaie-exodo-icon.webp
│   │           └── asaie-exodo-logo.webp
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   ├── HeroSection.astro
│   │   │   ├── LanguageSwitcher.astro
│   │   │   ├── ProductCard.astro
│   │   │   ├── SEOHead.astro
│   │   │   └── ThemeToggle.astro                # Toggle Dark/Light Mode
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   ├── utils.ts
│   │   │   └── locales/
│   │   │       ├── es.json
│   │   │       └── en.json
│   │   ├── layouts/
│   │   │   └── MainLayout.astro
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── servicios.astro
│   │   │   ├── contacto.astro
│   │   │   ├── nosotros.astro
│   │   │   └── [lang]/
│   │   │       ├── index.astro
│   │   │       ├── services.astro
│   │   │       ├── contact.astro
│   │   │       └── about.astro
│   │   ├── scripts/
│   │   │   └── theme.ts                         # Lógica JS para toggle de tema + localStorage
│   │   └── styles/
│   │       ├── global.scss                      # Reset, imports centralizados, estilos base
│   │       ├── _variables.scss                  # Variables primitivas (colores, fonts, spacing, breakpoints)
│   │       ├── _mixins.scss                     # Mixins: breakpoints mobile-first, tipografía, utilidades
│   │       ├── _themes.scss                     # Mapas de tokens Light/Dark → CSS custom properties
│   │       └── components/                      # Estilos SCSS por componente (SRP)
│   │           ├── _header.scss
│   │           ├── _footer.scss
│   │           ├── _hero.scss
│   │           ├── _button.scss
│   │           ├── _product-card.scss
│   │           ├── _language-switcher.scss
│   │           └── _theme-toggle.scss
│   ├── tests/
│   │   ├── i18n.test.ts
│   │   ├── pages.test.ts
│   │   └── theme.test.ts
│   ├── astro.config.mjs
│   ├── tailwind.config.mjs
│   ├── tsconfig.json
│   ├── package.json
│   ├── Dockerfile
│   ├── .eslintrc.cjs
│   └── .prettierrc
│
├── backend/                                     # ⚙️ BACKEND — NestJS (última versión)
│   ├── src/
│   │   ├── main.ts                              # Bootstrap de la aplicación
│   │   ├── app.module.ts                        # Módulo raíz
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── common/                              # Utilidades compartidas
│   │   │   ├── services/
│   │   │   │   └── smart-logger.service.ts       # Logger corporativo (requerido por instrucciones)
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── interceptors/
│   │   │   │   └── logging.interceptor.ts
│   │   │   └── dto/
│   │   │       └── api-response.dto.ts
│   │   ├── health/                              # Módulo Health Check
│   │   │   ├── health.module.ts
│   │   │   └── health.controller.ts
│   │   └── contact/                             # Módulo Contacto (formulario web)
│   │       ├── contact.module.ts
│   │       ├── contact.controller.ts
│   │       ├── contact.service.ts
│   │       └── dto/
│   │           └── create-contact.dto.ts
│   ├── test/
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── nest-cli.json
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   ├── package.json
│   ├── Dockerfile
│   ├── .eslintrc.js
│   └── .prettierrc
│
├── docker-compose.yml                           # Orquesta front + backend + (futuro: DB)
├── .gitignore                                   # Unificado para ambos proyectos
└── README.md
```

---

## 7. Definition of Done (DoD)

Una User Story se considera **TERMINADA** cuando cumple **todos** los siguientes criterios:

- [ ] Código cumple principios SOLID y Clean Code
- [ ] Componentes con responsabilidad única (SRP)
- [ ] **Cero CSS/estilos hardcodeados** — todo valor de color, tamaño, spacing y tipografía proviene de variables SCSS o CSS custom properties
- [ ] **Mobile-first verificado** — estilos base escritos para móvil, breakpoints progresivos vía mixins (`min-width`)
- [ ] **Ambos temas funcionando** — apariencia correcta en Light Mode Y Dark Mode
- [ ] Contenido bilingüe funcionando (ES y EN)
- [ ] Diseño responsivo verificado en mínimo 3 breakpoints (mobile 375px, tablet 768px, desktop 1280px)
- [ ] Build exitoso (`npm run build`) sin errores ni warnings
- [ ] Pruebas escritas y pasando (cuando aplique)
- [ ] Accesibilidad básica (aria labels, contraste en ambos temas, navegación teclado)
- [ ] Code review aprobado
- [ ] Commit siguiendo Conventional Commits

---

## 8. Ceremonias SCRUM

| Ceremonia              | Frecuencia            | Duración  | Descripción                                              |
| ---------------------- | --------------------- | --------- | -------------------------------------------------------- |
| Sprint Planning        | Inicio de cada sprint | 1 hora    | Seleccionar stories del backlog, estimar, definir meta   |
| Daily Stand-up         | Diaria                | 15 min    | Qué hice, qué haré, impedimentos                        |
| Sprint Review          | Fin de cada sprint    | 30 min    | Demo de funcionalidades al Product Owner                 |
| Sprint Retrospective   | Fin de cada sprint    | 30 min    | Qué salió bien, qué mejorar, acciones                   |
| Backlog Refinement     | Mitad de cada sprint  | 30 min    | Detallar y re-priorizar stories del próximo sprint       |

---

## 9. Métricas de Seguimiento

| Métrica              | Objetivo                     |
| -------------------- | ---------------------------- |
| Velocity             | ~20-25 puntos/sprint         |
| Burndown Chart       | Tendencia descendente lineal |
| Lighthouse Score     | > 90 en todas las métricas   |
| Cobertura de Tests   | > 80% en utilidades core     |
| Bugs en producción   | 0 en lanzamiento             |

---

## 10. Riesgos Identificados

| Riesgo                                                  | Impacto | Probabilidad | Mitigación                                                      |
| ------------------------------------------------------- | ------- | ------------ | --------------------------------------------------------------- |
| Complejidad en routing i18n sin duplicar `.astro`       | Alto    | Media        | Priorizar spike técnico en Sprint 0, validar con PoC            |
| Conflictos Tailwind + SCSS en cascada de estilos        | Medio   | Baja         | Convención estricta: Tailwind SOLO para layout/spacing utilities, SCSS para TODO lo visual (colores, tipografía, bordes, sombras, temas) |
| Inconsistencia visual entre temas Light y Dark           | Alto    | Media        | Tokens semánticos obligatorios; QA visual en ambos temas por cada story; checklist en DoD |
| Variables SCSS no aplicadas (CSS hardcodeado filtrado)   | Medio   | Media        | Regla de linting SCSS: prohibir valores hexadecimales/rgb literales fuera de `_variables.scss`; code review obligatorio |
| Retraso por dependencias de contenido corporativo       | Medio   | Media        | Usar contenido del Manual de Identidad (`design/`) + placeholder aprobado desde Sprint 0 |
| Incompatibilidad de integraciones Astro con i18n nativo | Medio   | Baja         | Evaluar `astro-i18next` como fallback                           |
| Desincronización entre front/ y backend/ en monorepo    | Medio   | Media        | Contracts compartidos (tipos/DTOs); docker-compose como entorno unificado; CI independiente por directorio |
| Versión de NestJS con breaking changes                   | Bajo    | Baja         | Fijar versión major en `package.json`; revisar changelog antes de actualizar |

---

## 11. Convenciones del Proyecto

### Conventional Commits

El scope debe indicar el directorio cuando sea relevante:

```
feat(front/component): add Header with responsive navigation
feat(backend/contact): add POST /api/contact endpoint
fix(front/i18n): resolve fallback for missing translation keys
style(front/global): update primary color variables
docs(readme): add project setup instructions
test(front/i18n): add unit tests for useTranslations utility
test(backend/health): add e2e test for health check endpoint
ci(actions): configure GitHub Actions deploy pipelines
chore(monorepo): update shared .gitignore
```

### Branching Strategy (Git Flow simplificado)

```
main          ← producción estable
├── develop   ← integración continua
│   ├── feature/EP01-US0101-init-monorepo
│   ├── feature/EP02-US0201-i18n-default-lang
│   ├── feature/EP03-US0304-dark-mode
│   ├── feature/EP04-US0401-header-component
│   └── feature/EP09-US0901-backend-health-check
└── hotfix/   ← correcciones urgentes en producción
```

---

## 12. Convenciones de Estilos SCSS

### Regla de Oro: Cero Hardcode

```scss
// ❌ PROHIBIDO — valor literal en componente
.hero {
  background-color: #0F172A;
  font-size: 24px;
  padding: 16px;
}

// ✅ CORRECTO — variables y tokens del sistema
.hero {
  background-color: var(--bg-primary);
  font-size: $font-size-xl;
  padding: $spacing-4;
}
```

### Estructura de Variables (`_variables.scss`)

```scss
// Colores primitivos
$color-navy:    #0F172A;
$color-royal:   #2563EB;
$color-accent:  #F59E0B;
$color-white:   #FFFFFF;
$color-gray-50: #F8FAFC;
$color-gray-900:#0F172A;

// Tipografía
$font-primary:   'Inter', system-ui, sans-serif;
$font-secondary: 'JetBrains Mono', monospace;
$font-size-xs:   0.75rem;
$font-size-sm:   0.875rem;
$font-size-base: 1rem;
$font-size-lg:   1.125rem;
$font-size-xl:   1.25rem;
$font-size-2xl:  1.5rem;
$font-size-3xl:  1.875rem;
$font-size-4xl:  2.25rem;

// Spacing (escala de 4px)
$spacing-1: 0.25rem;
$spacing-2: 0.5rem;
$spacing-3: 0.75rem;
$spacing-4: 1rem;
$spacing-6: 1.5rem;
$spacing-8: 2rem;
$spacing-12: 3rem;
$spacing-16: 4rem;

// Breakpoints (mobile-first)
$breakpoint-sm:  640px;
$breakpoint-md:  768px;
$breakpoint-lg:  1024px;
$breakpoint-xl:  1280px;
$breakpoint-2xl: 1536px;

// Sombras, radios, transiciones
$border-radius-sm:  0.25rem;
$border-radius-md:  0.5rem;
$border-radius-lg:  1rem;
$transition-fast:   150ms ease;
$transition-normal: 300ms ease;
```

### Mixins Mobile-First (`_mixins.scss`)

```scss
@mixin breakpoint($size) {
  @if $size == sm  { @media (min-width: $breakpoint-sm)  { @content; } }
  @if $size == md  { @media (min-width: $breakpoint-md)  { @content; } }
  @if $size == lg  { @media (min-width: $breakpoint-lg)  { @content; } }
  @if $size == xl  { @media (min-width: $breakpoint-xl)  { @content; } }
  @if $size == 2xl { @media (min-width: $breakpoint-2xl) { @content; } }
}

// Uso:
.hero {
  padding: $spacing-4;           // mobile (base)
  @include breakpoint(md) {
    padding: $spacing-8;         // tablet+
  }
  @include breakpoint(lg) {
    padding: $spacing-16;        // desktop+
  }
}
```

### Theming (`_themes.scss`)

```scss
// Tokens semánticos por tema
$theme-light: (
  bg-primary:      $color-white,
  bg-secondary:    $color-gray-50,
  text-primary:    $color-gray-900,
  text-secondary:  #64748B,
  accent:          $color-royal,
  accent-warm:     $color-accent,
  border-default:  #E2E8F0,
  surface:         $color-white,
);

$theme-dark: (
  bg-primary:      $color-navy,
  bg-secondary:    #1E293B,
  text-primary:    $color-gray-50,
  text-secondary:  #94A3B8,
  accent:          $color-royal,
  accent-warm:     $color-accent,
  border-default:  #334155,
  surface:         #1E293B,
);

// Generador de CSS custom properties
@mixin apply-theme($theme) {
  @each $key, $value in $theme {
    --#{$key}: #{$value};
  }
}

// Aplicación en global.scss
[data-theme='light'], :root {
  @include apply-theme($theme-light);
}

[data-theme='dark'] {
  @include apply-theme($theme-dark);
}
```

---

## 13. Inventario de Assets Corporativos

Recursos disponibles en `design/` para el contenido del sitio:

### Logos LOPEZSOFT

| Archivo fuente | Uso previsto | Destino optimizado |
| --- | --- | --- |
| `circulo.png` | Logo en Header (móvil), favicon | `front/public/images/logo/lopezsoft-circle.webp` |
| `circulo - azul.png` | Logo variante Dark Mode | `front/public/images/logo/lopezsoft-circle-blue.webp` |
| `horizontal.png` | Logo en Header (desktop) | `front/public/images/logo/lopezsoft-horizontal.webp` |
| `horizontal - azul.png` | Logo variante Dark Mode desktop | `front/public/images/logo/lopezsoft-horizontal-blue.webp` |

### Logos Productos SaaS

| Producto | Formato cuadrado (Cards) | Formato banner (Páginas detalle) |
| --- | --- | --- |
| MATIAS ERP | `img/ERP 500 X 500.png` | `img/ERP 1920 X 512.png` |
| MATIAS API | `img/API 500 X 500.png` | `img/API 1920 X 512.png` |
| MATIAS IMPULSO | `img/Impulso 500 x 500.png` | `img/IMPULSO 1920 X 512.png` |
| MATIAS (Suite) | `img/MATIAS 500 X 500.png` | — |
| ASAIE EXODO | `img/logo-icon-exodo.png` | `img/logotipo-asaie exodo.png` |

### Referencia de Marca

| Documento | Uso |
| --- | --- |
| `Manual de Identidad Corporativa LOPEZSOFT.pdf` | Referencia obligatoria para paleta, tipografía, uso correcto del logo, espaciados y tono de comunicación |

---

> **Nota:** Este documento es un artefacto vivo y debe actualizarse al inicio de cada Sprint Planning conforme evolucione el backlog y se refinen las prioridades del producto.
