# SPEC 01 — Pulido técnico y de UI del portfolio

> **Status:** Implemented · **Depends on:** — · **Date:** 2026-06-25
> **Objective:** Endurecer la base técnica y refinar la UI/accesibilidad del portfolio minimalista sin cambiar su identidad visual.

---

## Section 1 — Why this spec exists

El portfolio funcionaba, pero acumulaba deuda de bajo nivel: `cv.json` se consumía sin tipos, había un bug de solape entre overlays, faltaban defensas de accesibilidad básicas y la PWA no degradaba bien offline. Este spec agrupa arreglos pequeños y contenidos que elevan la calidad sin rediseñar nada. El i18n y la analítica se dejan fuera a propósito porque cada uno abre decisiones mayores.

---

## Scope

**In:**

- Tipar `cv.json` con una `interface CV` y consumirla en los componentes.
- Render condicional del `summary` vacío y resaltado del empleo actual en `Experience`.
- Corregir el solape entre el botón scroll-to-top y el toast de actualización PWA.
- Pulido UI/A11y: `text-left`, `prefers-reduced-motion`, foco visible, tooltip en `:focus`.
- Token de color de acento (variable CSS) aplicado con moderación.
- Página offline real para la PWA y estrategia de navegación en el service worker.
- Content-Security-Policy conservadora vía `<meta>`.
- Autorizar el dominio remoto del avatar para `<Image>`; `decoding="async"` en logos.
- Configurar Prettier (config, ignore, scripts, dependencias).
- Arreglo colateral: `workbox-config.ts` → `.cjs` para que el build complete el paso PWA.

**Out of scope (for future specs):**

- Internacionalización ES/EN (rutas `/es`, JSON por idioma, `hreflang`).
- Analítica respetuosa con la privacidad (Plausible/Umami): requiere elegir proveedor/cuenta.
- Meta `theme-color` por esquema claro/oscuro (descartado por el usuario en esta iteración).
- Casts de tipo en `Header.astro` / `Footer.astro` (descartados por el usuario).
- ESLint (solo se configuró Prettier en esta tanda).

---

## Data model

Este spec no introduce datos nuevos en `cv.json`. Solo formaliza su forma como tipos en `src/types/cv.ts`:

```ts
export interface Job {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null; // null = empleo actual
  summary: string;
  highlights: string[];
}

export interface CV {
  basics: Basics;
  connect: Connect;
  experience: Experience;
  stack: Stack;
}
```

Convención: un `Job` con `endDate === null` se considera el empleo actual y se resalta con el color de acento más un badge `Current`.

El acento es una variable CSS, no un hex fijo:

```css
:root {
  --accent: 37 99 235;
} /* blue-600 */
html.dark {
  --accent: 96 165 250;
} /* blue-400 */
```

---

## Implementation plan

1. Crear `src/types/cv.ts` con la `interface CV` y subtipos.
2. Castear `cvData as CV` en `Hero`, `Stack`, `Layout`, `index`, `Experience`.
3. En `Experience`, render condicional del `summary` y resaltado del job con `endDate: null`.
4. Definir el token `accent` en `tailwind.config.mjs` y las variables CSS en `Layout`.
5. Añadir a `Layout` el foco visible, el tooltip en `:focus` y el bloque `prefers-reduced-motion`.
6. Cambiar `text-justify` → `text-left` en `Hero` y `Experience`.
7. Reubicar el toast PWA (`left-6 right-6 sm:right-auto`) para que no solape el scroll-to-top.
8. Crear `public/offline.html` y añadir `NetworkFirst` + `setCatchHandler` en `src/sw-template.js`.
9. Añadir la `<meta>` CSP en `Layout`.
10. Añadir `image.remotePatterns` en `astro.config.mjs` y `decoding="async"` en los logos de `Stack`.
11. Añadir Prettier: `.prettierrc.json`, `.prettierignore`, `.editorconfig`, scripts y dependencias.
12. Renombrar `workbox-config.ts` → `.cjs` y actualizar el script `PWA`.
13. `npm run build` para validar `astro check` + build + inyección del SW.

---

## Acceptance criteria

- [x] `npm run build` completa los tres pasos (check, build, PWA) sin errores.
- [x] El avatar remoto se optimiza a `.webp` en el build.
- [x] El SW precachea `offline.html` (43 URLs precacheadas).
- [x] El empleo con `endDate: null` muestra el badge `Current` y el dot con acento.
- [x] Los jobs sin `summary` no renderizan un `<p>` vacío.
- [x] El toast PWA y el botón scroll-to-top no se solapan.
- [x] Existe foco visible en enlaces y botones (`:focus-visible`).
- [x] El cambio de tema mueve el valor del acento entre claro y oscuro.
- [x] `npm run format:check` corre y reporta diferencias (Prettier operativo).

---

## Decisions

- **Sí:** acento como variable CSS (`rgb(var(--accent) / <alpha-value>)`). Permite `accent/10`, `accent/20` y adaptarse a claro/oscuro sin duplicar clases.
- **No:** acento como hex fijo. Perdería contraste en uno de los dos temas.
- **Sí:** CSP con `'unsafe-inline'`. El sitio depende de scripts inline (`is:inline`, JSON-LD) y de los estilos inyectados por Tailwind.
- **No:** CSP estricta con hashes/nonces. Requeriría refactorizar todos los scripts inline; su propio spec si se quiere endurecer.
- **Sí:** logos del stack siguen como `<img>`. Viven en `public/` y `<Image>` no procesa assets de `public/`.
- **Sí:** solo Prettier ahora. ESLint añade configuración y ruido; va en otra tanda.
- **No:** reformateo masivo del repo con `--write`. Mezclaría cambios cosméticos en docs con los funcionales; queda a criterio del usuario vía `npm run format`.

---

## Risks

| Risk                                                       | Mitigation                                                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| La CSP `<meta>` bloquea algún recurso externo no previsto  | Es permisiva (`self` + `storage.hectorolea.dev` + `storage.googleapis.com`); revisar consola tras deploy. |
| El SW de Workbox importa desde CDN (`storage.googleapis.com`) | Incluido en `script-src`/`connect-src`; si el CDN cae, el SW no actualiza pero el sitio sirve. |
| `matchPrecache('/offline.html')` no resuelve              | `offline.html` está en `public/` y entra en `globPatterns` (`html`), por lo que se precachea con revisión. |

---

## What is **not** in this spec

- Internacionalización ES/EN.
- Analítica (Plausible/Umami).
- Meta `theme-color` por esquema.
- ESLint.

Cada uno, si se aborda, va en su propio spec.
