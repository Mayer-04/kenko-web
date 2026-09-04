import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-manrope",
      fallbacks: ["sans-serif"],
      name: "Manrope",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/manrope-latin-wght-normal.woff2"],
            style: "normal",
            weight: "100 900",
          },
        ],
      },
      provider: fontProviders.local(),
    },
    {
      cssVariable: "--font-figtree",
      fallbacks: ["sans-serif"],
      name: "Figtree",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/figtree/figtree-latin-wght-normal.woff2"],
            style: "normal",
            weight: "100 900",
          },
        ],
      },
      provider: fontProviders.local(),
    },
  ],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
