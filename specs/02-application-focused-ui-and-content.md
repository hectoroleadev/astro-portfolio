# SPEC 02 — Refinamiento de UI y contenido orientado a postulaciones

> **Status:** Implemented · **Depends on:** SPEC 01 · **Date:** 2026-07-05
> **Objective:** Refinar la jerarquía visual y el contenido del portfolio para que
> respalde postulaciones como Full-Stack/Java Developer con uso real de IA,
> sin cambiar su identidad minimalista.

---

## Scope

**In:**

- Reescribir `basics.summary` en `cv.json`: mantener el posicionamiento Full-Stack/Java
  y añadir una línea honesta sobre desarrollo asistido por IA (Claude Code, Copilot, MCP).
- Actualizar el empleo actual: `company` → "Tata Consultancy Services (at USAA)" y
  highlights reales — resolución de vulnerabilidades, refactorizaciones y pruebas de
  regresión con Cypress, sobre Java, Python, React, AWS, Terraform y GitLab.
- Repulir la redacción de los highlights del resto de empleos: verbos fuertes,
  impacto primero, estilo consistente. Sin inventar métricas nuevas.
- Añadir la categoría `AI Tools` al stack en `cv.json` (Claude Code, GitHub Copilot,
  MCP) con sus logos SVG en `public/logos/`.
- Añadir Cypress y JUnit al stack (ya aparecen en la experiencia pero no en el stack).
- Marcar tecnologías "core" (`core: true` en los logos de `cv.json`) y darles
  tratamiento visual destacado en `Stack.astro`; extender los tipos en `src/types/cv.ts`.
- Mover la sección Stack antes de Experience en `src/pages/index.astro`.
- Refinamiento visual de jerarquía, spacing y presencia del acento en `Hero`, `Stack`
  y `Experience`, guiado por la skill `frontend-design` (sin cambiar paleta base ni tipografía).

**Out of scope (for future specs):**

- Secciones nuevas de página (Projects, Certifications, Education).
- Título dinámico/rotatorio o vistas por rol.
- Rediseño de identidad visual (paleta, tipografía, layout general).
- Años de experiencia por tecnología en el stack (descartado en favor de "core").
- Internacionalización ES/EN (sigue fuera, como en SPEC 01).
- Contenido de prompt engineering más allá del uso real de herramientas.
- Actualizar el PDF del résumé (`storage.hectorolea.dev/hector-olea-resume.pdf`) —
  es un asset externo; quedará desincronizado del sitio hasta que lo regeneres.

---

## Data model

Este spec extiende el modelo existente de SPEC 01 en dos puntos: un flag `core`
en los logos del stack y una categoría nueva. El resto es reescritura de contenido,
no de estructura.

**`src/types/cv.ts`** — el tipo del logo gana un flag opcional:

```ts
export interface Logo {
  src: string;
  alt: string;
  core?: boolean; // true = tecnología principal, tratamiento visual destacado
}
```

**`cv.json`** — forma de los cambios (extracto ilustrativo, no contenido final):

```jsonc
// Empleo actual renombrado
{ "company": "Tata Consultancy Services (at USAA)", "position": "Full-Stack Developer" }

// Logos con flag core (solo los principales lo llevan)
{ "src": "/logos/java.svg", "alt": "Java", "core": true }

// Categoría nueva al final del stack
{
  "name": "AI Tools",
  "logos": [
    { "src": "/logos/claude-code.svg", "alt": "Claude Code" },
    { "src": "/logos/github-copilot.svg", "alt": "GitHub Copilot" },
    { "src": "/logos/mcp.svg", "alt": "MCP" }
  ]
}
```

**Tecnologías `core` (9):** Java, Spring Boot, TypeScript, React, Kafka, PostgreSQL,
AWS, Docker, Terraform.

**Ubicación de las tecnologías nuevas:** Cypress en Frontend, JUnit en Backend
(sin categoría "Testing" propia).

**Assets nuevos:** `public/logos/claude-code.svg`, `public/logos/github-copilot.svg`,
`public/logos/mcp.svg`, `public/logos/cypress.svg`, `public/logos/junit.svg`.
Mismo tratamiento monocromo que los existentes (`brightness-0 dark:invert`).

Convención: `core` es opcional y ausente significa `false`; ningún componente
rompe si el flag no existe (compatible con el JSON actual).

---

## Implementation plan

1. Extender `src/types/cv.ts`: añadir `core?: boolean` a la interfaz del logo.
   Test manual: `npx astro check` pasa sin errores (el flag es opcional).
2. Reescribir contenido en `cv.json` (solo texto, sin cambios de estructura):
   - `basics.summary`: mantener posicionamiento Full-Stack/Java + frase final sobre
     desarrollo asistido por IA (Claude Code, Copilot, MCP) como multiplicador de
     productividad, no como título.
   - Empleo actual: `company` → "Tata Consultancy Services (at USAA)"; highlights
     reales: remediación de vulnerabilidades, refactorización y pruebas de regresión
     con Cypress sobre Java, Python, React, AWS, Terraform y GitLab.
   - Repulir highlights del resto de empleos: verbo fuerte + impacto primero,
     sin inventar métricas.
   Test manual: `npm run dev`, leer Hero y Experience, verificar que no hay copy rota.
3. Añadir SVGs monocromos a `public/logos/`: `claude-code.svg`, `github-copilot.svg`,
   `mcp.svg`, `cypress.svg`, `junit.svg`.
4. Actualizar el stack en `cv.json`: categoría `AI Tools` al final, Cypress en
   Frontend, JUnit en Backend, y flag `core: true` en las 9 tecnologías acordadas.
   Test manual: los chips nuevos renderizan con logo visible en claro y oscuro.
5. Reordenar `src/pages/index.astro`: Stack antes de Experience.
   Test manual: el orden visual es Hero → Stack → Experience; los anchors
   (`#tech-stack`, `#work-experience`) siguen funcionando.
6. Tratamiento visual `core` en `Stack.astro`: los chips core se distinguen con el
   token de acento existente (`--accent`) y se ordenan primero dentro de su categoría.
   Los chips no-core conservan el estilo actual.
   Test manual: en cada categoría se distinguen los core de un vistazo, en ambos temas.
7. Pase de refinamiento visual en `Hero.astro`, `Stack.astro` y `Experience.astro`:
   jerarquía tipográfica, ritmo de spacing entre secciones y presencia medida del
   acento, aplicando el proceso de la skill `frontend-design` (sin tocar paleta base,
   tipografía ni layout de una columna).
   Test manual: comparación visual antes/después en móvil y escritorio, ambos temas.

---

## Acceptance criteria

- [x] `npm run build` completa los tres pasos (check, build, PWA) sin errores.
- [x] El empleo actual muestra "Tata Consultancy Services (at USAA)" con el badge
      `Current` y highlights que mencionan vulnerabilidades, refactorización y
      pruebas de regresión.
- [x] `basics.summary` menciona el desarrollo asistido por IA y ningún texto del
      sitio afirma experiencia de IA más allá del uso de herramientas.
- [x] El orden de secciones en la página es Hero → Tech stack → Work experience.
- [x] La categoría `AI Tools` renderiza con Claude Code, GitHub Copilot y MCP,
      con logos visibles en tema claro y oscuro.
- [x] Cypress aparece en Frontend y JUnit en Backend.
- [x] Las 9 tecnologías core se distinguen visualmente de las no-core y aparecen
      primero dentro de su categoría.
- [x] Un logo sin flag `core` renderiza idéntico a como lo hace hoy (compatibilidad
      con entradas antiguas del JSON).
- [x] Los enlaces internos `#tech-stack` y `#work-experience` siguen resolviendo.
- [x] Ningún highlight contiene métricas que no existieran en `cv.json` o que no
      haya proporcionado el usuario.
- [x] El foco visible, `prefers-reduced-motion` y los contrastes de SPEC 01 se
      conservan tras el pase visual (verificación manual con teclado y ambos temas).

---

## Decisions

- **Sí:** título se mantiene "Full-Stack Developer"; Java e IA viven en summary y
  stack. Un título multi-rol diluye el posicionamiento y uno dinámico añade
  complejidad sin evidencia de que convierta mejor.
- **No:** sección propia de "AI & Prompt Engineering". Sin proyectos ni material
  verificable, una sección dedicada prometería más de lo que respalda. Si ese
  material aparece, va en su propio spec.
- **Sí:** la IA se presenta como herramienta de productividad (Claude Code, Copilot,
  MCP), no como especialidad. Es lo honesto con el material disponible.
- **Sí:** flag `core: true` por logo. Señal binaria, bajo mantenimiento, y le dice
  al recruiter dónde está la fuerza en segundos.
- **No:** años de experiencia por tecnología. Más informativo pero envejece mal y
  exige mantenimiento constante.
- **Sí:** Stack antes de Experience. Tras el summary, el stack es lo primero que
  escanea un recruiter técnico; la experiencia detallada es lectura de segundo nivel.
- **Sí:** Cypress a Frontend y JUnit a Backend. Categoría "Testing" propia
  fragmentaría un stack de 27+ items en grupos de 2.
- **Sí:** refinamiento sobre la identidad actual (mono, grises, acento azul).
  El rediseño agresivo fue descartado por el usuario; la identidad es reconocible
  y el spec 01 ya invirtió en ella.
- **No:** actualizar el PDF del résumé en este spec. Es un asset externo
  (`storage.hectorolea.dev`); se regenera fuera del repo.
- **Sí:** el pase visual (paso 7) se guía por la skill `frontend-design`, según
  la regla de `CLAUDE.md`, con dos restricciones fijas: paleta base y tipografía
  no cambian; el gasto de "riesgo estético" se limita al tratamiento core del stack.

---

## Risks

| Risk                                                                 | Mitigation                                                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| El PDF del résumé queda desincronizado del sitio (empresa, summary)  | Fuera de scope a propósito; regenerar el PDF y resubirlo a `storage.hectorolea.dev` tras implementar este spec.      |
| No existen SVGs monocromos oficiales de Claude Code o MCP            | Usar la marca simplificada a un solo path; validar que `brightness-0 dark:invert` los deja legibles en ambos temas. |
| El tratamiento `core` con acento compite con el badge `Current`      | El acento en el stack se usa en dosis menor (borde/tinte, no relleno); revisar ambas secciones juntas en el paso 7.  |
| Nombrar "USAA" públicamente en el sitio                              | Mismo patrón ya usado con Walmart, MetLife, etc.; si el contrato con TCS restringe nombrar al cliente, se omite.     |

---

## What is **not** in this spec

- Secciones nuevas (Projects, Certifications, Education).
- Título dinámico o vistas por rol.
- Rediseño de identidad visual.
- Internacionalización ES/EN.
- Regeneración del PDF del résumé.
- Analítica y ESLint (heredados de "out" de SPEC 01).

Cada uno, si se aborda, va en su propio spec.
