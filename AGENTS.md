# Repository Guidelines

## Mission and Scope

This repository contains the Kenko EPS public website. Use this file as the project-specific source of truth.

- Inspect relevant source files, configuration, and existing patterns before changing code.
- Keep changes focused, prefer the smallest correct implementation, and preserve unrelated user changes.
- Do not add dependencies or abstractions without a concrete need.
- Treat generated files and build output as read-only.

When instructions conflict, prioritize the user's request, these guidelines, official documentation, applicable skills, and existing conventions, in that order.

## Technology Stack

Use the technologies already established in this repository. Exact versions are defined in `package.json`.

- Astro 7 with Vite is the primary framework and build tool (static-first, sin runtime de React).
- TypeScript uses Astro's strict configuration.
- Tailwind CSS 4 is integrated through `@tailwindcss/vite`.
- Bun is the package manager and script runner; Node.js `>=22.22.3` is required.
- Vitest, JSDOM, Testing Library matchers, and Playwright provide quality and test tooling.
- Ultracite (Oxlint + Oxfmt) provides linting and formatting; see `oxlint.config.ts` and `oxfmt.config.ts`.

## Project Structure

- `src/pages/` contains file-based Astro routes, grouped by area such as `afiliados/` and `nosotros/`.
- `src/components/` contains reusable components; `src/layouts/` contains shared page layouts.
- `src/styles/` contains global CSS and Tailwind theme configuration.
- `src/assets/` contains processed images, fonts, and SVG assets; `public/` contains intentionally unprocessed files.
- `tests/unit/` and `tests/integration/` contain unit and integration tests; `tests/e2e/` contains browser tests.
- Do not edit `dist/`, `.astro/`, `node_modules/`, or `test-results/` manually.

## Working Process

For every task:

1. Understand the requested behavior and identify affected files.
2. Inspect the implementation, configuration, available skills, and relevant official documentation.
3. Use only applicable skills and implement the smallest maintainable change using existing patterns.
4. Run focused validation, then broader checks when shared code is affected.
5. Review the final diff for regressions, unrelated changes, and missing tests.
6. Report the changes and validation commands that were run.

## Astro

- Prefer Astro's static-first architecture and server-rendered output.
- Use file-based routing, reusable layouts, components, and the configured `@components/*`, `@layouts/*`, and `@assets/*` aliases.
- Prefer Astro over a framework component when no client-side interactivity is needed.
- Follow the current official Astro documentation for APIs and integrations.

### Images and SVGs

Always consult the official Astro Images documentation when working with images or SVGs, using the configured Astro documentation MCP when available: `https://docs.astro.build/en/guides/images/`

- Prefer local images in `src/`; use `public/` only for intentionally unprocessed assets.
- Use `<Image />` for optimized images, `<Picture />` for multiple formats or responsive sources, and `getImage()` for optimized URLs outside direct HTML.
- Use imported SVG files as Astro components when appropriate; use native `<img>` or `<svg>` only when unprocessed output is intentional.
- Provide meaningful `alt` text for informative images, `alt=""` for decorative images, and preserve dimensions and responsive behavior.

## Styling

### Tailwind CSS

- Use Tailwind CSS 4 as the default styling solution.
- Follow the CSS-first configuration in `src/styles/global.css` and reuse its design tokens.
- Prefer utility composition, reusable components, and mobile-first responsive utilities.
- Avoid unnecessary `@apply`, arbitrary values, excessive specificity, and unmaintainable class lists.

### Modern CSS

Use native CSS when it is clearer, more maintainable, or technically necessary instead of Tailwind. When appropriate in 2026, use cascade layers, nesting, container queries, logical properties, custom properties, `clamp()`, `:focus-visible`, `:has()`, modern color functions, and `prefers-reduced-motion`.

Keep CSS scoped or organized in the existing global stylesheet. Use progressive enhancement and verify browser support for features that affect core functionality.

## Frontend Standards

### Design and Responsive Behavior

- Create clear visual hierarchy using the established Kenko EPS visual language.
- Use typography, spacing, color, and layout intentionally; avoid generic or decorative UI that does not improve comprehension.
- Design default, hover, focus, active, disabled, loading, empty, and error states.
- Design mobile-first, prevent unintended horizontal scrolling, and ensure touch targets are usable.
- Optimize images, fonts, CSS, JavaScript, and hydration to avoid layout shifts and unnecessary client-side work.

### Semantic HTML and Accessibility

- Use meaningful landmarks, logical heading hierarchy, native controls, visible labels, lists, and tables only for tabular data.
- Use buttons for actions and links for navigation. Use ARIA only when native HTML semantics are insufficient.
- Follow WCAG 2.2 AA: support keyboard navigation, visible focus, sufficient contrast, accessible names, useful image alternatives, and clear form errors.
- Do not rely on color alone or placeholder text as the only label. Respect reduced motion and increased text size preferences.
- Test interactive behavior with semantic locators, keyboard-oriented checks, and representative viewport sizes.

## Skills, MCP, and Documentation

Skills may be added, removed, renamed, or updated. Do not rely on a fixed list.

- Inspect skills available in the repository and agent environment before starting a task.
- Read potentially relevant skill instructions and use only applicable skills, on demand.
- If no skill applies, continue using these guidelines and official documentation.
- Treat skills as supporting guidance, not as a replacement for official documentation.
- Inspect the current project configuration before using an MCP; do not assume fixed names or availability.
- For Astro-related work, prioritize the configured official Astro documentation MCP when available. If unavailable, use the official documentation directly.

## Commands

Use Bun instead of npm or npx when an equivalent script exists.

- `bun run dev`, `bun run build`, and `bun run preview` for development and production previews.
- `bun run check` and `bun run fix` for Ultracite lint and format.
- `bun run test:unit` for unit and integration tests.
- `bun run test:e2e`, `bun run test:e2e:ui`, `bun run test:e2e:debug`, and `bun run test:e2e:report` for browser tests.
- `bun run test:all` for the complete test suite.

## Coding and Testing

- Use TypeScript and Astro components with two-space indentation, double quotes, and trailing commas.
- Name components in PascalCase, utilities in concise camelCase, and public routes in lowercase Spanish kebab-case.
- Prefer configured path aliases and follow the formatting conventions above.
- Add focused tests for behavior changes. Name tests `<feature>.test.ts` or `<feature>.spec.ts` and use descriptive Spanish behavior names when appropriate.
- Prefer Playwright roles, labels, and accessible names over implementation-specific selectors.

## Git and Pull Requests

- Follow Conventional Commit messages, such as `feat(site): add shared layout`.
- Keep commits focused and do not include unrelated changes or generated artifacts.
- Review `git diff` before committing.
- Pull requests must explain the user-facing change, list validation commands, include screenshots for visual changes, and mention known limitations.
