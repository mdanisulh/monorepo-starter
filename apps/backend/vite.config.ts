import path from "node:path";
import build from "@hono/vite-build/bun";
import devServer from "@hono/vite-dev-server";
import bunAdapter from "@hono/vite-dev-server/bun";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    devServer({
      entry: "src/app.ts",
      adapter: bunAdapter(),
    }),
    build({
      entry: "src/app.ts",
    }),
  ],
});
