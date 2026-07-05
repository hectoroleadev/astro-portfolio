# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

Personal portfolio / résumé site for Hector Olea, deployed as a static PWA to GitHub Pages at https://hectorolea.dev. Built with Astro + Tailwind CSS. No backend, no client framework — content is data-driven from a single JSON file.

## Commands

- `npm run dev` / `npm start` — local dev server (`astro dev`)
- `npm run build` — full production build: `astro check` (type check) → `astro build` → `npm run PWA`
- `npm run preview` — serve the built `dist/` on port 8080
- `npm run PWA` — inject the Workbox service worker manifest (`workbox injectManifest`); part of `build`

There is no test suite. `astro check` (run via `build`) is the type/diagnostic gate.

## Architecture

- **Content is data, not markup.** All site content (name, summary, work experience, tech stack, social links) lives in `cv.json` at the repo root. Components import it via the `@cv` path alias and render it. To change site content, edit `cv.json` — do not hardcode copy into components.
- **Path aliases** (`tsconfig.json`): `@/*` → `src/*`, `@cv` → `./cv.json`.
- **Pages**: single route `src/pages/index.astro` composes `Hero`, `Experience`, and `Stack` sections inside `Layout`.
- **Layout** (`src/layouts/Layout.astro`): the HTML shell. Owns all `<head>` SEO (meta, Open Graph, Twitter cards, JSON-LD `Person` schema), global styles, theme bootstrap, scroll-to-top, and the PWA update-notification logic. Inline `<script is:inline>` blocks handle dark-mode init, scroll button, tooltips, and service-worker registration (production only).
- **Components** (`src/components/`): `Hero.astro`, `Experience.astro`, `Stack.astro`, plus `shared/Header.astro` and `shared/Footer.astro`. All are `.astro`, server-rendered at build time; client behavior is plain inline `<script>`.
- **Icons**: UI icons in `src/icons/` (used via `astro-icon`); tech-stack logos in `public/logos/` (referenced by path in `cv.json`).

## Conventions

- Astro components with Tailwind utility classes; TypeScript in strict mode (`astro/tsconfigs/strict`).
- Dark mode uses Tailwind's `selector` strategy (`darkMode: 'selector'`) — the `dark` class is toggled on `<html>`. Always provide `dark:` variants for color classes.
- Font is Source Code Pro Variable (monospace) loaded via `@fontsource-variable`; weights are set with `font-variation-settings`.
- Site is fully static and SEO-/PWA-sensitive: keep `cv.json` `basics` fields, the JSON-LD block, and `public/manifest.json` consistent when changing identity/metadata.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and publishes `dist/` to GitHub Pages. The `site` URL is configured in `astro.config.mjs`.


## UI Design

**Always invoke the `frontend-design` skill (`.claude/skills/`, pinned in `skills-lock.json`, source `anthropics/skills`) before building new UI or reshaping existing UI.** It drives distinctive, intentional visual design — palette, typography, layout, motion — and steers away from templated defaults. Use it for any component, page, or visual change; derive concrete color/type/spacing decisions from its process rather than reaching for generic patterns. For charts and data visualization specifically, pair it with the `dataviz` guidance.q