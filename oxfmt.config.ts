import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    ".agents/**",
    ".codex/**",
    "src/assets/scrapings-content/**",
  ],
  sortImports: {
    ignoreCase: true,
    internalPattern: ["@components/", "@layouts/", "@assets/", "~/", "@/", "#"],
    newlinesBetween: true,
    order: "asc",
  },
  sortTailwindcss: {
    functions: ["clsx", "cva", "tw", "twMerge", "cn", "twJoin", "tv"],
    stylesheet: "./src/styles/global.css",
  },
});
