import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import { selectJsPlugins } from "ultracite/oxlint/js-plugins";
import vitest from "ultracite/oxlint/vitest";

const jsPlugins = selectJsPlugins(["sonarjs"]);

// Va al final de `extends` para que prevalezca sobre los overrides
// de los presets extendidos.
const projectOverrides = defineConfig({
  overrides: [
    {
      // Astro usa PascalCase para componentes por convención oficial.
      files: ["**/*.astro"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
  ],
});
export default defineConfig({
  extends: [core, astro, vitest, antiSlop, jsPlugins, projectOverrides],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    ".agents/**",
    ".codex/**",
    "src/assets/scrapings-content/**",
    // Los specs e2e usan la convención .spec de Playwright y sus imports:
    // las reglas vitest/* del preset (p. ej. consistent-test-filename)
    // no admiten excepción por archivo. Se validan con Playwright + types.
    "tests/e2e/**",
  ],
  jsPlugins: jsPlugins.jsPlugins,
});
