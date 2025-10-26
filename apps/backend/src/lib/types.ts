import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { Env } from "@/env";

export interface AppBindings {
  Bindings: Env;
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;
