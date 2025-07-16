import { defineConfig } from "vite";

/* Plugins */
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin as html } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  return {
    base: "./",
    server: {
      port: 3000,
      open: true,
    },
    build: {
      assetsInlineLimit: 0, // forces file URL
      outDir: "build",
    },
    plugins: [react(), html({ minify: true }), svgr(), tsconfigPaths()],
  };
});
