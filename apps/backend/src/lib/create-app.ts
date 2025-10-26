import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { parseEnv } from "@/env";
import type { AppBindings, AppOpenAPI } from "@/lib/types";
import { logger } from "@/middlewares/logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (res, c) => {
      if (!res.success) {
        return c.json(
          {
            success: false,
            error: res.error,
          },
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
    },
  });
}

export default function createApp() {
  return createRouter()
    .use((c, next) => {
      c.env = parseEnv({ ...process.env, ...c.env });
      return next();
    })
    .use(requestId())
    .use(logger())
    .notFound((c) =>
      c.json(
        { message: `${ReasonPhrases.NOT_FOUND} - ${c.req.path}` },
        StatusCodes.NOT_FOUND,
      ),
    )
    .onError((err, c) => {
      c.var.logger.error(err);
      return c.json(
        {
          message: err.message,
          stack: c.env.NODE_ENV === "production" ? undefined : err.stack,
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }) as AppOpenAPI;
}
