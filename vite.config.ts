import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    react({
      // Only .tsx files
      include: "**/*.tsx",
    }),
    tsconfigPaths(), // resolve imports using TypeScript's path mapping.
    svgr(), //  transform SVGs into React components
  ],
});
