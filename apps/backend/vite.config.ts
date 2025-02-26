import build from "@hono/vite-build/node";
import devServer from "@hono/vite-dev-server";
import bunAdapter from "@hono/vite-dev-server/bun";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts",
      adapter: bunAdapter(),
    }),
    build({
      entry: "src/index.ts",
      port: 3000,
    }),
  ],
});
