/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: [
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
      "tests/integration/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/.astro/**"],

    // Necesario para testear componentes de React (necesitan un DOM simulado)
    environment: "jsdom",

    // Habilita describe/it/expect globales
    globals: true,

    // Se ejecuta antes de cada archivo de test
    setupFiles: ["./vitest.setup.ts"],

    // Optimización: bundlea librerías con muchos imports (útil si usas
    // librerías de UI pesadas). Opcional, pero ayuda al rendimiento.
    deps: {
      optimizer: {
        client: {
          enabled: true,
        },
      },
    },
  },
});
