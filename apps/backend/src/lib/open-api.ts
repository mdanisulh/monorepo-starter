import type { AppOpenAPI } from "@/lib/types";
import { apiReference } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json";

export default function openAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.1.1",
    tags: [
      {
        name: "System",
        description: "Core system endpoints",
      },
      {
        name: "Monitoring",
        description: "Health and status endpoints",
      },
      {
        name: "Debug",
        description: "Development and debugging tools",
      },
      {
        name: "Testing",
        description: "Testing utilities",
      },
    ],
    "x-tagGroups": [
      {
        name: "Utilities",
        tags: ["System", "Monitoring", "Debug", "Testing"],
      },
    ],
    servers: [
      {
        url: "http://localhost:5173",
        description: "Development server",
      },
      // {
      //   url: "https://api.example.com",
      //   description: "Production server",
      // },
    ],
    info: {
      version: packageJSON.version,
      title: "API Service",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
