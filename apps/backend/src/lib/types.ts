import type { Env } from "@/env";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Bindings: Env;
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;
