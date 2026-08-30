# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 7 website for Kenko EPS, with React available for interactive islands and Tailwind CSS 4 for styling. Application code lives in `src/`:

- `src/pages/` contains file-based routes; keep public-facing pages grouped by area, such as `afiliados/` and `nosotros/`.
- `src/components/` holds reusable Astro components, organized by feature when useful.
- `src/layouts/` contains shared page shells; use `Layout.astro` for consistent document structure and metadata.
- `src/styles/` contains global styles, and `src/assets/` holds bundled fonts, images, and SVG icons. Put directly served files in `public/`.
- `tests/unit/` is for Vitest tests and `tests/e2e/` is for Playwright browser coverage.

## Build, Test, and Development Commands

Use Bun to run project scripts (Node `>=22.22.3` is required):

- `bun run dev` starts the Astro development server.
- `bun run build` creates the production build in `dist/`.
- `bun run preview` serves the built site locally.
- `bun run lint` checks TypeScript, Astro, and test files; `bun run lint:fix` applies safe ESLint fixes.
- `bun run format:check` validates Prettier formatting; `bun run format` writes formatting changes.
- `bun run test:unit` runs Vitest; `bun run test:e2e` builds first, then runs Playwright across Chromium, Firefox, and WebKit. Use `bun run test:all` before substantial PRs.

## Coding Style & Naming Conventions

Use TypeScript and Astro components with two-space indentation, double quotes, and trailing commas, matching existing files. Name components in PascalCase (`BaseHead.astro`), utilities in concise camelCase (`sum.ts`), and route files in lowercase Spanish kebab-case (`preguntas-frecuentes.astro`). Prefer the configured `@components/*` import alias for shared components. Let Prettier and ESLint enforce formatting and lint rules; do not hand-format generated output.

## Testing Guidelines

Write unit tests as `tests/unit/<feature>.test.ts` or `.spec.ts`, using descriptive Spanish behavior names where appropriate. Put browser journeys in `tests/e2e/<page>.spec.ts` and assert user-visible behavior with Playwright locators. No coverage threshold is configured; add or update focused tests for each behavior change.

## Commit & Pull Request Guidelines

Follow the Conventional Commit style used in history: `feat(site): add shared layout`, `test: add homepage coverage`, or `chore(project): scaffold workspace`. Keep commits focused. PRs should explain the user-facing change, link relevant issues, list validation commands run, and include screenshots for visual changes. Do not commit `dist/`, test artifacts, or local environment files.
