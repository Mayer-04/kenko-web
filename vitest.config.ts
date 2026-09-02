/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: [
      "tests/unit/**/*.{test,spec}.ts",
      "tests/integration/**/*.{test,spec}.ts",
    ],
    exclude: ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/.astro/**"],

    environment: "jsdom",

    // Habilita describe/it/expect globales
    globals: true,

    // Se ejecuta antes de cada archivo de test
    setupFiles: ["./vitest.setup.ts"],
  },
});
