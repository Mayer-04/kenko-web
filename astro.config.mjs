// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/manrope-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Figtree",
      cssVariable: "--font-figtree",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/figtree/figtree-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
  ],
});
