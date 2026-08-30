import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Reglas base de TypeScript
  ...tseslint.configs.recommended,

  // Reglas recomendadas para Astro
  ...eslintPluginAstro.configs.recommended,

  // SIEMPRE al final: desactiva reglas de estilo que choquen con Prettier
  eslintConfigPrettier,

  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },

  {
    rules: {
      // tus reglas personalizadas aquí
    },
  },
];
