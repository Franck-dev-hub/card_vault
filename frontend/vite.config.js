/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    allowedHosts: ["frontend", "localhost", "card-vault.fr", "card-vault.test"],
    hmr: {
      clientPort: 80,
    },
  },
  plugins: [
    react(),
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url ?? "/";
          if (
            !url.startsWith("/@") &&
                        !url.startsWith("/api") &&
                        !url.includes(".")
          ) {
            req.url = "/index.html";
          }
          next();
        });
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});