/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",

    exclude: ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/.astro/**"],

    // Habilita describe/it/expect globales
    globals: true,

    include: [
      "tests/unit/**/*.{test,spec}.ts",
      "tests/integration/**/*.{test,spec}.ts",
    ],

    // Se ejecuta antes de cada archivo de test
    setupFiles: ["./vitest.setup.ts"],
  },
});
