import { resolve } from "node:path";
import { defineConfig } from "vite";

/* Plugins */
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  base: "./",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    assetsInlineLimit: 0, // forces file URL
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        /* the unlisted style tile, served at /_style/ */
        style: resolve(import.meta.dirname, "_style/index.html"),
      },
    },
  },
  plugins: [react(), svgr(), tsconfigPaths()],
});
